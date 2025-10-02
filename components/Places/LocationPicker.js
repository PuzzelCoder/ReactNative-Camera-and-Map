import { StyleSheet, Alert, View, Image, Text } from "react-native";
import OutLinedButton from "../UI/OutlinedButton";
import { Colors } from "../constant/colors";
import { getMapPreview } from "../../utils/location";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { useState } from "react";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionStatus, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permisions",
        "You need to grant Location Permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(
      "Location:",
      location.coords.latitude,
      location.coords.longitude
    );
    setPickedLocation({
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {}

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.long) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      {pickedLocation && (
        <Text>
          Lat: {pickedLocation.lat} and Long: {pickedLocation.long}
        </Text>
      )}
      <View style={styles.action}>
        <OutLinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutLinedButton>
        <OutLinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutLinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    aspectRatio: 1.75,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
