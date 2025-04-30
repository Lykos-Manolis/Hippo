import React from "react";
import { StyleSheet, Linking, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { EXPO_PUBLIC_GOOGLE_MAPS_API_KEY } from "@env";

interface LocationMapProps {
  location: string;
}

export default function LocationMap({ location }: LocationMapProps) {
  // Use the Geocoding API to convert address to coordinates
  const mapHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          body, html, #map {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
              zoom: 15,
              disableDefaultUI: true,
              styles: [
                {
                  "featureType": "administrative",
                  "elementType": "geometry",
                  "stylers": [{"visibility": "off"}]
                },
                {
                  "featureType": "poi",
                  "stylers": [{"visibility": "simplified"}]
                },
                {
                  "featureType": "road",
                  "elementType": "labels.icon",
                  "stylers": [{"visibility": "off"}]
                },
                {
                  "featureType": "transit",
                  "stylers": [{"visibility": "off"}]
                }
              ]
            });
            
            // Create geocoder to convert address to coordinates
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'address': "${location}" }, function(results, status) {
              if (status === 'OK') {
                const location = results[0].geometry.location;
                map.setCenter(location);
                
                const marker = new google.maps.Marker({
                  position: location,
                  map: map,
                  animation: google.maps.Animation.DROP
                });
              } else {
                console.error('Geocode was not successful for the following reason: ' + status);
              }
            });
          }
        </script>
        <script src="https://maps.googleapis.com/maps/api/js?key=${EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap" async defer></script>
      </body>
    </html>
  `;

  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(location);
    const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    Linking.openURL(url);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Location
      </ThemedText>

      <ThemedView style={styles.mapContainer}>
        <WebView
          style={styles.map}
          originWhitelist={["*"]}
          source={{ html: mapHTML }}
          scrollEnabled={false}
          javaScriptEnabled={true}
        />
      </ThemedView>

      <ThemedView style={styles.addressContainer}>
        <ThemedText style={styles.address}>{location}</ThemedText>
        <TouchableOpacity style={styles.directionsButton} onPress={openInMaps}>
          <ThemedText style={styles.directionsText}>Get Directions</ThemedText>
          <FontAwesome name="location-arrow" size={14} color="#007aff" />
        </TouchableOpacity>
      </ThemedView>
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
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  address: {
    flex: 1,
    fontSize: 14,
    opacity: 0.8,
  },
  directionsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
  },
  directionsText: {
    fontSize: 14,
    color: "#007aff",
    marginRight: 6,
  },
});
