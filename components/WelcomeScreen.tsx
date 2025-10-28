import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

export function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <View style={styles.logoInner} />
        </View>
        <Text style={styles.headerText}>CP0</Text>
      </View>
      {/* Content */}
      <View style={styles.centeredSection}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="shield-lock" size={40} color="#38a169" />
        </View>
        <Text style={styles.title}>Welcome to CP0 Vault</Text>
        <Text style={styles.desc}>Your secure digital vault is ready! Start adding your important items.</Text>
      </View>
      <View style={styles.statusList}>
        <View style={styles.statusRow}>
          <View style={styles.statusIconBox}>
            <Feather name="check" size={16} color="#38a169" />
          </View>
          <Text style={styles.statusText}>Master password created</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusIconBox}>
            <Feather name="check" size={16} color="#38a169" />
          </View>
          <Text style={styles.statusText}>Biometric authentication enabled</Text>
        </View>
        <View style={styles.statusRow}>
          <View style={styles.statusIconBox}>
            <Feather name="check" size={16} color="#38a169" />
          </View>
          <Text style={styles.statusText}>Vault secured and encrypted</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddItem')}>
        <Text style={styles.addBtnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, marginTop: 16 },
  logoBox: { width: 32, height: 32, backgroundColor: '#222', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoInner: { width: 16, height: 16, backgroundColor: '#fff', borderRadius: 4 },
  headerText: { color: '#666', fontSize: 18 },
  centeredSection: { alignItems: 'center', marginBottom: 24 },
  iconBox: { width: 80, height: 80, backgroundColor: '#f0fff4', borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  desc: { color: '#666', textAlign: 'center', marginBottom: 16 },
  statusList: { marginBottom: 24 },
  statusRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7fafc', borderRadius: 8, padding: 12, marginBottom: 8 },
  statusIconBox: { width: 24, height: 24, backgroundColor: '#f0fff4', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  statusText: { color: '#222', fontSize: 16 },
  addBtn: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center' },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
