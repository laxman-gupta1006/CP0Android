import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ImageWithFallbackProps {
  source: any;
  style?: any;
  fallbackStyle?: any;
  [key: string]: any;
}

export function ImageWithFallback({
  source,
  style,
  fallbackStyle,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  if (didError) {
    return (
      <View style={[styles.fallbackContainer, style, fallbackStyle]}>
        <Ionicons name="image-outline" size={24} color="#9CA3AF" />
      </View>
    );
  }

  return (
    <Image
      source={source}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
});