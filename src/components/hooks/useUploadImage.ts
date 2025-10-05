import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
interface UploadResult {
  calories?: number | null;
  error?: string | null;
  imageUrl?: string | null;
  guessedName?: string | null;
}

// Placeholder for image-to-food-name guessing
async function guessFoodNameFromImage(imageUri: string): Promise<string> {
  // In a real app, call an ML model or API here
  // For now, just log and return a dummy guess
  console.log('Image URI for guessing:', imageUri);
  // Simulate async
  await new Promise(res => setTimeout(res, 500));
  return 'apple'; // Dummy guess
}

export function useUploadImage() {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResult | null>(null);

  const pickAndUploadImage = async (): Promise<UploadResult | null> => {
    setResult(null);
    let finalResult: UploadResult | null = null;
    // Ask user: Camera or Gallery
    let pickerResult: ImagePicker.ImagePickerResult | null = null;
    await new Promise<void>(resolve => {
      Alert.alert('Select Image', 'Choose an option to provide a food image:', [
        {
          text: 'Camera',
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert(
                'Permission required',
                'Camera permission is required to take a photo.'
              );
              resolve();
              return;
            }
            const cameraResult = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            pickerResult = cameraResult;
            resolve();
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            const galleryResult = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            pickerResult = galleryResult;
            resolve();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(),
        },
      ]);
    });
    // Fix: Add type guards to avoid TS errors
    if (
      !pickerResult ||
      (typeof pickerResult === 'object' &&
        'canceled' in pickerResult &&
        (pickerResult as any).canceled)
    )
      return null;
    const imageUri =
      typeof pickerResult === 'object' &&
      'assets' in pickerResult &&
      Array.isArray((pickerResult as any).assets) &&
      (pickerResult as any).assets[0]?.uri
        ? (pickerResult as any).assets[0].uri
        : null;
    if (!imageUri) {
      finalResult = { error: 'No image selected.' };
      setResult(finalResult);
      return finalResult;
    }
    setUploading(true);
    try {
      // Log the image URI to the terminal
      console.log('Selected image URI:', imageUri);
      toast.show('Food scanned successfully!', {
        type: 'success',
        duration: 3000,
        placement: 'top',
      });
      // Guess food name from image (placeholder)
      const guessedName = await guessFoodNameFromImage(imageUri);
      // Use Open Food Facts API as in scan.ts
      const response = await axios.get(
        'https://world.openfoodfacts.org/cgi/search.pl',
        {
          params: {
            search_terms: guessedName,
            search_simple: 1,
            action: 'process',
            json: 1,
          },
        }
      );
      // Try to extract calories from the first product
      const product = response.data.products && response.data.products[0];
      const calories =
        product &&
        (product.nutriments?.['energy-kcal_100g'] ??
          product.nutriments?.energy);
      // Log calories count and guessed name
      console.log('Calories detected for', guessedName, ':', calories);
      if (typeof calories === 'number') {
        finalResult = {
          calories,
          imageUrl: imageUri,
          error: null,
          guessedName,
        };
        setResult(finalResult);
        return finalResult;
      } else if (typeof calories === 'string' && calories.trim() !== '') {
        finalResult = {
          calories: Number(calories),
          imageUrl: imageUri,
          error: null,
          guessedName,
        };
        setResult(finalResult);
        return finalResult;
      } else {
        finalResult = {
          calories: null,
          imageUrl: imageUri,
          error: 'Calories not found for this food.',
          guessedName,
        };
        setResult(finalResult);
        return finalResult;
      }
    } catch (error: unknown) {
      let message = 'Fetch failed';
      if (
        error &&
        typeof error === 'object' &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
      ) {
        message = (error as { message: string }).message;
      }
      finalResult = {
        calories: null,
        imageUrl: imageUri,
        error: message,
        guessedName: null,
      };
      setResult(finalResult);
      return finalResult;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, result, pickAndUploadImage };
}
