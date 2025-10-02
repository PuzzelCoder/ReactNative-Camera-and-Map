import { Alert, Image, View, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../constant/colors";
import OutLinedButton from "../UI/OutlinedButton";

export function ImagePicker() {
  const [cameraPermissionStatus, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permisions",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    // console.log("Image", asset);
    console.log("Image assets", image.assets[0].uri);
    setPickedImage(image.assets[0].uri);
  }
  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutLinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutLinedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
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
});
