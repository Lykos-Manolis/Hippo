import React from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
  View,
  ActivityIndicator,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RestaurantCard } from "@/components/RestaurantCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState, useCallback, useEffect } from "react";
import { Restaurant } from "@/data/restaurants";
import { getAllRestaurants } from "@/services/restaurantService";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await getAllRestaurants();
        setRestaurants(data);
        setError(null);
      } catch (err) {
        setError("Failed to load restaurants. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantPress = (restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  const filteredRestaurants = useCallback(() => {
    if (!searchQuery.trim()) return restaurants;

    const query = searchQuery.toLowerCase().trim();
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.location.toLowerCase().includes(query)
    );
  }, [searchQuery, restaurants]);

  if (loading) {
    return (
      <ThemedView
        style={[
          styles.container,
          styles.loadingContainer,
          { paddingTop: insets.top },
        ]}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <ThemedText style={styles.loadingText}>
          Loading restaurants...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={[
          styles.container,
          styles.errorContainer,
          { paddingTop: insets.top },
        ]}
      >
        <ThemedText style={styles.errorText}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={filteredRestaurants()}
        renderItem={({ item }) => (
          <RestaurantCard
            id={item.restaurant_id}
            name={item.name}
            description={item.description}
            imageUrl={item.imageUrl}
            location={item.location}
            onPress={() => handleRestaurantPress(item.restaurant_id)}
          />
        )}
        keyExtractor={(item) => item.restaurant_id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <ThemedText type="title" style={styles.header}>
              Restaurants
            </ThemedText>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or location"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9e9e9e"
              clearButtonMode="while-editing"
            />
          </>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
