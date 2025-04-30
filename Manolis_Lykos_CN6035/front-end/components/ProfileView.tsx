import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import {
  getUserProfile,
  cancelReservation,
  updateReservation,
  UserProfile,
  UpdateReservationParams,
} from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";

export default function ProfileView() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [updateParams, setUpdateParams] = useState<UpdateReservationParams>({
    user_id: 0,
    restaurant_id: 0,
    date: "",
    time: "",
    people_count: 1,
  });
  const { logout } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userProfile = await getUserProfile();
      setProfile(userProfile);
      setError(null);
    } catch (err) {
      setError("Failed to load profile. Please try again.");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  const handleCancelReservation = async (reservationId: number) => {
    try {
      setLoading(true);
      await cancelReservation(reservationId);
      await fetchProfile();
      Alert.alert("Success", "Reservation canceled successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to cancel reservation");
      console.error("Error canceling reservation:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReservation = async () => {
    if (!selectedReservation) return;

    try {
      setLoading(true);

      // Ensure date and time are in the correct format
      const updatedParams = {
        ...updateParams,
        date: updateParams.date.includes("T")
          ? updateParams.date.split("T")[0].replace(/-/g, "/")
          : updateParams.date,
        time: updateParams.time.includes(":00")
          ? updateParams.time
          : updateParams.time.length <= 5
          ? updateParams.time
          : updateParams.time.substring(0, 5),
      };

      await updateReservation(
        selectedReservation.reservation_id,
        updatedParams
      );
      await fetchProfile();
      setIsModalVisible(false);
      Alert.alert("Success", "Reservation updated successfully");
    } catch (err) {
      Alert.alert("Error", "Failed to update reservation");
      console.error("Error updating reservation:", err);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (reservation: any) => {
    setSelectedReservation(reservation);
    setUpdateParams({
      user_id: reservation.user_id,
      restaurant_id: reservation.restaurant_id,
      date: reservation.date,
      time: reservation.time,
      people_count: reservation.people_count,
    });
    setIsModalVisible(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "yyyy/MM/dd");
    } catch (e) {
      return dateString;
    }
  };

  const renderReservationCard = (reservation: any, isActive: boolean) => (
    <ThemedView key={reservation.reservation_id} style={styles.reservationCard}>
      <Image
        source={{ uri: reservation.imageUrl }}
        style={styles.restaurantImage}
      />
      <ThemedView style={styles.cardContent}>
        <ThemedText type="defaultSemiBold" style={styles.restaurantName}>
          {reservation.name}
        </ThemedText>
        <ThemedText style={styles.reservationDetail}>
          {formatDate(reservation.date)} at {reservation.time}
        </ThemedText>
        <ThemedText style={styles.reservationDetail}>
          {reservation.people_count}{" "}
          {reservation.people_count === 1 ? "person" : "people"}
        </ThemedText>
        <ThemedText style={styles.reservationDetail} numberOfLines={2}>
          {reservation.location}
        </ThemedText>

        {isActive && (
          <ThemedView style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, styles.editButton]}
              onPress={() => openUpdateModal(reservation)}
            >
              <ThemedText style={styles.buttonText}>Edit</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() =>
                handleCancelReservation(reservation.reservation_id)
              }
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );

  return (
    <>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="person.fill"
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">My Profile</ThemedText>
        </ThemedView>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : error ? (
          <ThemedText style={styles.error}>{error}</ThemedText>
        ) : (
          <>
            <ThemedView style={styles.profileInfo}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Name:
              </ThemedText>
              <ThemedText>{profile?.name || "Not available"}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.profileInfo}>
              <ThemedText type="defaultSemiBold" style={styles.label}>
                Email:
              </ThemedText>
              <ThemedText>{profile?.email || "Not available"}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Active Reservations
              </ThemedText>
              {profile?.activeReservations &&
              profile.activeReservations.length > 0 ? (
                profile.activeReservations.map((reservation) =>
                  renderReservationCard(reservation, true)
                )
              ) : (
                <ThemedText style={styles.emptyText}>
                  No active reservations
                </ThemedText>
              )}
            </ThemedView>

            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Reservation History
              </ThemedText>
              {profile?.reservationHistory &&
              profile.reservationHistory.length > 0 ? (
                profile.reservationHistory.map((reservation) =>
                  renderReservationCard(reservation, false)
                )
              ) : (
                <ThemedText style={styles.emptyText}>
                  No reservation history
                </ThemedText>
              )}
            </ThemedView>

            <Collapsible title="Account Settings">
              <ThemedText
                type="link"
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                Log Out
              </ThemedText>
            </Collapsible>
          </>
        )}
      </ParallaxScrollView>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
          >
            <ThemedView style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollContent}>
                <ThemedText type="subtitle" style={styles.modalTitle}>
                  Update Reservation
                </ThemedText>

                <ThemedText style={styles.inputLabel}>
                  Date (YYYY/MM/DD)
                </ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={updateParams.date.split("T")[0].replace(/-/g, "/")}
                  onChangeText={(text) =>
                    setUpdateParams({ ...updateParams, date: text })
                  }
                  placeholder="YYYY/MM/DD"
                />

                <ThemedText style={styles.inputLabel}>Time (HH:MM)</ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={updateParams.time.substring(0, 5)}
                  onChangeText={(text) =>
                    setUpdateParams({ ...updateParams, time: text })
                  }
                  placeholder="HH:MM"
                />

                <ThemedText style={styles.inputLabel}>
                  Number of People
                </ThemedText>
                <TextInput
                  style={styles.textInput}
                  value={updateParams.people_count.toString()}
                  onChangeText={(text) =>
                    setUpdateParams({
                      ...updateParams,
                      people_count: parseInt(text) || 0,
                    })
                  }
                  keyboardType="numeric"
                />

                <ThemedView style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelModalButton]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <ThemedText style={styles.cancelButtonText}>
                      Cancel
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.saveButton]}
                    onPress={handleUpdateReservation}
                  >
                    <ThemedText style={styles.saveButtonText}>Save</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ScrollView>
            </ThemedView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  profileInfo: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(150, 150, 150, 0.1)",
    borderRadius: 8,
  },
  label: {
    marginBottom: 4,
  },
  loading: {
    marginTop: 40,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  logoutButton: {
    color: "#ff6347",
    alignSelf: "center",
    paddingVertical: 8,
  },
  section: {
    marginTop: 24,
    marginBottom: 8,
  },
  sectionTitle: {
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  reservationCard: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  restaurantImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    marginBottom: 8,
  },
  reservationDetail: {
    marginBottom: 4,
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: "#4e9af1",
  },
  cancelButton: {
    backgroundColor: "#ff6347",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.6,
    padding: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
    fontWeight: "600",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "gray",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelModalButton: {
    backgroundColor: "#ff6347",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
});
