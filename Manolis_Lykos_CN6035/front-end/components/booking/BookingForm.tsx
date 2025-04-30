import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import BookingCalendar from "./BookingCalendar";
import PeopleSelector from "./PeopleSelector";
import { FontAwesome } from "@expo/vector-icons";
import { createReservation } from "@/services/userService";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

// Add time selection options
const TIME_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
];

// Convert 12h time slots to 24h format for API
const TIME_DISPLAY = [
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
];

interface BookingFormProps {
  restaurantName: string;
  restaurantId: number;
  user_id: number;
}

export default function BookingForm({
  restaurantName,
  restaurantId,
  user_id,
}: BookingFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);
  const [people, setPeople] = useState<number>(2);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePeopleSelected = (count: number) => {
    setPeople(count);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Format date for API (YYYY/MM/DD)
      const formattedDate = format(selectedDate, "yyyy/MM/dd");

      // Get time for API (HH:MM)
      const apiTime = TIME_SLOTS[selectedTimeIndex];

      // Create reservation parameters
      const reservationParams = {
        restaurant_id: restaurantId,
        user_id: user_id,
        date: formattedDate,
        time: apiTime,
        people_count: people,
      };

      // Make the API call to create reservation
      await createReservation(reservationParams);

      // Show success message
      Alert.alert(
        "Booking Confirmed",
        `Your reservation at ${restaurantName} is confirmed for ${format(
          selectedDate,
          "EEEE, MMMM d, yyyy"
        )} at ${TIME_DISPLAY[selectedTimeIndex]} for ${people} people.`,
        [
          {
            text: "OK",
            style: "cancel",
          },
        ]
      );
    } catch (error) {
      // Show error message
      Alert.alert(
        "Booking Failed",
        "We couldn't complete your reservation. Please try again later.",
        [{ text: "OK" }]
      );
      console.error("Error creating reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Book a Table
      </ThemedText>

      <BookingCalendar onDateSelected={handleDateSelected} />

      <ThemedView style={styles.timeSelector}>
        <ThemedText type="subtitle" style={styles.timeTitle}>
          Select Time
        </ThemedText>
        <ThemedView style={styles.timeSlots}>
          {TIME_DISPLAY.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTimeIndex === index ? styles.selectedTimeSlot : null,
              ]}
              onPress={() => setSelectedTimeIndex(index)}
            >
              <ThemedText
                style={[
                  styles.timeText,
                  selectedTimeIndex === index ? styles.selectedTimeText : null,
                ]}
              >
                {time}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <PeopleSelector onPeopleSelected={handlePeopleSelected} />

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <ThemedText style={styles.submitButtonText}>
              Complete Reservation
            </ThemedText>
            <FontAwesome name="check-circle" size={18} color="#fff" />
          </>
        )}
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  header: {
    marginBottom: 20,
  },
  timeSelector: {
    marginVertical: 16,
  },
  timeTitle: {
    marginBottom: 12,
  },
  timeSlots: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  timeSlot: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    margin: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  selectedTimeSlot: {
    backgroundColor: "#007aff",
  },
  timeText: {
    fontSize: 14,
  },
  selectedTimeText: {
    color: "#ffffff",
    fontWeight: "500",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007aff",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
    shadowColor: "#007aff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
});
