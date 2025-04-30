import { useState, useEffect } from "react";
import { Image, StyleSheet, View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Restaurant } from "@/data/restaurants";
import BookingForm from "@/components/booking/BookingForm";
import LocationMap from "@/components/booking/LocationMap";
import { getRestaurantById } from "@/services/restaurantService";
import { getUserId } from "@/services/userService";

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        router.replace("/");
        return;
      }

      try {
        setLoading(true);
        const [restaurantData, userIdData] = await Promise.all([
          getRestaurantById(id as string),
          getUserId(),
        ]);

        setRestaurant(restaurantData);
        setUserId(userIdData);
        setError(null);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText style={styles.loadingText}>
          Loading restaurant details...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error || !restaurant) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          {error || "Restaurant not found"}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerImage={
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }
      headerBackgroundColor={{ dark: "#000000", light: "#ffffff" }}
    >
      <ThemedView style={styles.restaurantInfoContainer}>
        <ThemedText type="title" style={styles.restaurantName}>
          {restaurant.name}
        </ThemedText>
        <ThemedText style={styles.restaurantDescription}>
          {restaurant.description}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.divider} />

      <LocationMap location={restaurant.location} />

      <ThemedView style={styles.divider} />

      <BookingForm
        restaurantName={restaurant.name}
        restaurantId={parseInt(restaurant.restaurant_id)}
        user_id={userId ?? 0}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  restaurantInfoContainer: {
    marginBottom: 16,
  },
  restaurantName: {
    marginBottom: 8,
  },
  restaurantDescription: {
    opacity: 0.8,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 16,
  },
});
