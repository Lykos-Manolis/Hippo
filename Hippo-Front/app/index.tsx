import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  // If not loading and authenticated, redirect to tabs
  if (!isLoading && isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // If not loading and not authenticated, redirect to login
  if (!isLoading && !isAuthenticated) {
    return <Redirect href="/login" />;
  }

  // Show loading indicator while checking authentication status
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1E90FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
