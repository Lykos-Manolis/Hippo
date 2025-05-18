import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FontAwesome } from "@expo/vector-icons";

interface PeopleSelectorProps {
  onPeopleSelected: (people: number) => void;
}

export default function PeopleSelector({
  onPeopleSelected,
}: PeopleSelectorProps) {
  const [people, setPeople] = useState(2);
  const maxPeople = 10;
  const minPeople = 1;

  const handleDecrease = () => {
    if (people > minPeople) {
      const newValue = people - 1;
      setPeople(newValue);
      onPeopleSelected(newValue);
    }
  };

  const handleIncrease = () => {
    if (people < maxPeople) {
      const newValue = people + 1;
      setPeople(newValue);
      onPeopleSelected(newValue);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Number of People
      </ThemedText>

      <View style={styles.selector}>
        <TouchableOpacity
          style={[
            styles.button,
            people <= minPeople ? styles.buttonDisabled : null,
          ]}
          onPress={handleDecrease}
          disabled={people <= minPeople}
        >
          <FontAwesome
            name="minus"
            size={14}
            color={people <= minPeople ? "#999" : "#007aff"}
          />
        </TouchableOpacity>

        <ThemedView style={styles.valueContainer}>
          <ThemedText style={styles.value}>{people}</ThemedText>
        </ThemedView>

        <TouchableOpacity
          style={[
            styles.button,
            people >= maxPeople ? styles.buttonDisabled : null,
          ]}
          onPress={handleIncrease}
          disabled={people >= maxPeople}
        >
          <FontAwesome
            name="plus"
            size={14}
            color={people >= maxPeople ? "#999" : "#007aff"}
          />
        </TouchableOpacity>
      </View>
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
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  valueContainer: {
    marginHorizontal: 16,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
