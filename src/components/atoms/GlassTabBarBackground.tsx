import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const GlassTabBarBackground = () => (
  <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
);

export default GlassTabBarBackground;
