import { useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    View
} from 'react-native';

import { Button, Text } from '@/components/atoms';
import { useUploadImage } from '@/components/hooks/useUploadImage';

const ScanMeal = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { pickAndUploadImage } = useUploadImage();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white px-5">
        <Text variant="heading" weight="bold" className="mb-4 text-center">
          Camera Permission Required
        </Text>
        <Text variant="body" color="secondary" className="mb-6 text-center">
          We need camera access to scan your meals and analyze nutrition
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleAnalyze = async () => {
    if (!capturedImage) return;

    setAnalyzing(true);
    try {
      const result = await pickAndUploadImage();
      
      if (result?.calories) {
        Alert.alert(
          'Analysis Complete',
          `Estimated: ${result.calories} calories`,
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Add to Diary',
              onPress: () => {
                // TODO: Add to diary
                router.back();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', 'Could not analyze the image');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to analyze meal');
    } finally {
      setAnalyzing(false);
    }
  };

  if (capturedImage) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1">
          <Image
            source={{ uri: capturedImage }}
            className="h-full w-full"
            resizeMode="contain"
          />
        </View>

        <View className="absolute bottom-0 left-0 right-0 bg-white/95 p-5">
          <Button
            title={analyzing ? 'Analyzing...' : 'Analyze Meal'}
            onPress={handleAnalyze}
            disabled={analyzing}
            className="mb-3"
          />
          <View className="flex-row space-x-3">
            <Button
              title="Retake"
              onPress={() => setCapturedImage(null)}
              variant="outline"
              className="flex-1"
            />
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
              className="flex-1"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 items-center justify-center">
        <Text variant="heading" weight="bold" className="mb-4 text-white">
          Scan Your Meal
        </Text>
        <Text variant="body" className="mb-8 text-center text-white/80">
          Take a photo or choose from gallery
        </Text>

        <View className="w-full space-y-4 px-5">
          <Button
            title="Take Photo"
            onPress={handleTakePhoto}
            className="w-full"
          />
          <Button
            title="Choose from Gallery"
            onPress={handlePickFromGallery}
            variant="outline"
            className="w-full"
          />
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
            className="w-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScanMeal;
