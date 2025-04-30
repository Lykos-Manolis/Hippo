import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

// Get current date and next 14 days
const getDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

// Helper to format the date
const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Helper to get day name
const getDayName = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

interface BookingCalendarProps {
  onDateSelected: (date: Date) => void;
}

export default function BookingCalendar({
  onDateSelected,
}: BookingCalendarProps) {
  const dates = getDates();
  const [selectedDate, setSelectedDate] = useState<Date>(dates[0]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelected(date);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Select Date
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {dates.map((date, index) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.dateItem,
                isSelected ? styles.selectedDateItem : null,
              ]}
              onPress={() => handleDateSelect(date)}
            >
              <ThemedText
                style={[
                  styles.dayName,
                  isSelected ? styles.selectedText : null,
                  isToday ? styles.todayText : null,
                ]}
              >
                {getDayName(date)}
              </ThemedText>
              <ThemedText
                style={[
                  styles.date,
                  isSelected ? styles.selectedText : null,
                  isToday ? styles.todayText : null,
                ]}
              >
                {formatDate(date)}
              </ThemedText>
              {isToday && <ThemedView style={styles.todayIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    marginBottom: 12,
  },
  scrollView: {
    flexDirection: "row",
  },
  dateItem: {
    padding: 12,
    marginRight: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
  selectedDateItem: {
    backgroundColor: "#007aff",
  },
  dayName: {
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
  },
  selectedText: {
    color: "#ffffff",
  },
  todayText: {
    fontWeight: "700",
  },
  todayIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
});
