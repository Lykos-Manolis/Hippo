import React from "react";
import { View, StyleSheet } from "react-native";
import ProfileView from "@/components/ProfileView";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
