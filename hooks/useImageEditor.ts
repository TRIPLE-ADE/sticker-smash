import { useState, useCallback, useRef } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import domtoimage from 'dom-to-image';

export const useImageEditor = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<string[]>([]);
  const imageRef = useRef<View>(null);

  const openAppSettings = () => {
    Linking.openSettings();
  };
  
  const handleImagePickerResult = useCallback((result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      Alert.alert('No Image Selected', 'Please select an image to proceed.');
    }
  }, []);

  const takePhoto = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take a photo.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: openAppSettings },
        ]
      );
      return;
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
      });
      handleImagePickerResult(result);
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'An error occurred while taking the photo.');
    }
  };

  const pickImage = async () => {
    const { granted } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (!granted) {
      Alert.alert(
        "Permission Denied",
        "Media Library access is required to upload an image.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: openAppSettings },
        ]
      );
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
      });
      handleImagePickerResult(result);
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  const resetApp = () => {
    setSelectedImage(undefined);
    setPickedEmoji([]);
    setShowAppOptions(false);
  };

  const saveImage = async () => {
    if (!imageRef.current) return;

    try {
      if (Platform.OS === 'web') {
        const dataUrl = await domtoimage.toPng(imageRef.current, {
          quality: 1,
        });

        const link = document.createElement('a');
        link.download = 'sticker.png';
        link.href = dataUrl;
        link.click();
      } else {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });
        await MediaLibrary.saveToLibraryAsync(localUri);
      }

      Alert.alert('Success', 'Image saved successfully!');
      resetApp();
    } catch (error) {
      console.error('Error saving image:', error);
      Alert.alert('Error', 'Failed to save the image. Please try again.');
    }
  };

  const addEmoji = useCallback((emoji: string) => {
    setPickedEmoji((prev) => [...prev, emoji]);
  }, []);

  return {
    selectedImage,
    showAppOptions,
    setShowAppOptions,
    pickedEmoji,
    imageRef,
    takePhoto,
    pickImage,
    resetApp,
    saveImage,
    addEmoji,
  };
};

