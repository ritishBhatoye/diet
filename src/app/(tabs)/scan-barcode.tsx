import type { BarcodeScanningResult } from 'expo-camera';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';

import { Button, Text } from '@/components/atoms';

const ScanBarcode = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);

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
          We need camera access to scan product barcodes
        </Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </SafeAreaView>
    );
  }

  const handleBarCodeScanned = async ({ type, data }: BarcodeScanningResult) => {
    if (scanned) return;
    
    setScanned(true);
    setLoading(true);

    try {
      // Fetch from OpenFoodFacts API
      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const result = await response.json();

      if (result.status === 1 && result.product) {
        const product = result.product;
        const nutriments = product.nutriments || {};

        Alert.alert(
          product.product_name || 'Product Found',
          `Calories: ${nutriments['energy-kcal_100g'] || 'N/A'} kcal/100g\n` +
          `Protein: ${nutriments.proteins_100g || 'N/A'}g/100g\n` +
          `Carbs: ${nutriments.carbohydrates_100g || 'N/A'}g/100g\n` +
          `Fat: ${nutriments.fat_100g || 'N/A'}g/100g`,
          [
            {
              text: 'Scan Again',
              onPress: () => setScanned(false),
            },
            {
              text: 'Add to Diary',
              onPress: () => {
                // TODO: Add to diary with product data
                router.back();
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Product Not Found',
          'This product is not in our database. Try manual entry.',
          [
            { text: 'Scan Again', onPress: () => setScanned(false) },
            { text: 'Cancel', onPress: () => router.back() },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product information', [
        { text: 'Try Again', onPress: () => setScanned(false) },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <CameraView
        className="flex-1"
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e', 'qr'],
        }}
      >
        <View className="flex-1 items-center justify-center">
          {/* Scanning Frame */}
          <View className="h-64 w-64 rounded-2xl border-4 border-white/50" />
          
          <View className="absolute bottom-20 left-0 right-0 items-center">
            <View className="rounded-full bg-black/70 px-6 py-3">
              <Text variant="body" className="text-center text-white">
                {loading ? 'Looking up product...' : 'Point camera at barcode'}
              </Text>
            </View>
          </View>
        </View>
      </CameraView>

      <View className="absolute left-5 right-5 top-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="self-start rounded-full bg-black/70 p-3"
        >
          <Text variant="body" className="text-white">
            ✕ Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScanBarcode;
