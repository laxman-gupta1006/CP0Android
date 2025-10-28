import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface IPhoneFrameProps {
  children?: ReactNode;
}

export function IPhoneFrame({ children }: IPhoneFrameProps) {
  // In React Native, we don't need the iPhone frame as the app runs natively on mobile devices
  // This component simply renders the children without any frame styling
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});