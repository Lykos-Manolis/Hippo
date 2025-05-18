import { Image, StyleSheet, View, Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

export type RestaurantProps = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  onPress?: () => void;
};

export function RestaurantCard({
  name,
  description,
  imageUrl,
  location,
  onPress,
}: RestaurantProps) {
  return (
    <Pressable onPress={onPress}>
      <ThemedView
        style={styles.container}
        lightColor="#ffffff"
        darkColor="#1c1c1e"
      >
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <ThemedText type="subtitle" style={styles.name}>
            {name}
          </ThemedText>
          <ThemedText style={styles.description}>{description}</ThemedText>
          <ThemedText style={styles.location}>{location}</ThemedText>
        </View>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  content: {
    padding: 16,
  },
  name: {
    marginBottom: 8,
  },
  description: {
    opacity: 0.7,
    marginBottom: 8,
  },
  location: {
    opacity: 0.7,
    fontSize: 12,
  },
});
