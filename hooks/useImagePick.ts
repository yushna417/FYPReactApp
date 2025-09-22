import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';


const requestPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'Please allow media access to upload images.'
    );
    return false;
  }
  return true;
};

export const pickFromGallery = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) return;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, // Updated from MediaTypeOptions
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  
};

export const takePhoto = async () => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required', 
      'Please allow camera access to take photos.'
    );
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  
};