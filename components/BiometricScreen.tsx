import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function BiometricScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biometric Authentication</Text>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconBox}>
          <Feather name="lock" size={64} color="#888" />
        </View>
        <Text style={styles.title}>Confirm Biometric</Text>
        <Text style={styles.desc}>Use your fingerprint to unlock the vault quickly and securely</Text>
        <TouchableOpacity style={styles.useBtn} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.useBtnText}>Use Biometric</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.skipBtnText}>Skip for Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  iconBox: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#f3f3f3', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#666', textAlign: 'center', marginBottom: 24 },
  useBtn: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 12, width: '100%' },
  useBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  skipBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 16, alignItems: 'center', width: '100%' },
  skipBtnText: { color: '#222', fontSize: 16 },
});
