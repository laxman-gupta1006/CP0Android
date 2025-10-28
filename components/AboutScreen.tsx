import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

interface AboutScreenProps {
  onBack: () => void;
}

const teamMembers = [
  { name: 'Sarah Chen', role: 'Lead Security Engineer', avatar: 'SC' },
  { name: 'Marcus Rodriguez', role: 'Product Manager', avatar: 'MR' },
  { name: 'Emma Thompson', role: 'UX Designer', avatar: 'ET' },
  { name: 'David Kim', role: 'Backend Engineer', avatar: 'DK' },
];

const features = [
  'End-to-end encryption with AES-256',
  'Zero-knowledge architecture',
  'Biometric authentication',
  'Cross-platform synchronization',
  'Secure sharing capabilities',
  'Advanced password generator',
  'Security breach monitoring',
  'Two-factor authentication',
];

export function AboutScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About CPD Vault</Text>
      </View>

      {/* App Info */}
      <View style={styles.centeredSection}>
        <View style={styles.iconBox}>
          <MaterialCommunityIcons name="shield-lock" size={32} color="#fff" />
        </View>
        <Text style={styles.appTitle}>CPD Vault</Text>
        <Text style={styles.appVersion}>Version 1.0.0</Text>
        <Text style={styles.appDesc}>
          A secure, user-friendly password manager built with privacy and security at its core. Your digital life, protected by military-grade encryption.
        </Text>
      </View>

      {/* Mission */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome name="heart" size={20} color="#e53e3e" />
          <Text style={styles.sectionTitle}>Our Mission</Text>
        </View>
        <Text style={styles.sectionText}>
          We believe everyone deserves digital privacy and security without complexity. CPD Vault makes it simple to protect your most important information while maintaining the highest security standards.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <FontAwesome name="star" size={20} color="#ecc94b" />
          <Text style={styles.sectionTitle}>Key Features</Text>
        </View>
        {features.map((feature, idx) => (
          <View key={idx} style={styles.featureRow}>
            <View style={styles.featureDot} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Team */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Feather name="users" size={20} color="#3182ce" />
          <Text style={styles.sectionTitle}>Our Team</Text>
        </View>
        <View style={styles.teamGrid}>
          {teamMembers.map((member, idx) => (
            <View key={idx} style={styles.teamMemberBox}>
              <View style={styles.teamAvatar}>
                <Text style={styles.teamAvatarText}>{member.avatar}</Text>
              </View>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Security */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <MaterialCommunityIcons name="shield-check" size={20} color="#38a169" />
          <Text style={styles.sectionTitle}>Security & Privacy</Text>
        </View>
        <View style={styles.securityBoxGreen}>
          <Text style={styles.securityTitleGreen}>Zero-Knowledge Architecture</Text>
          <Text style={styles.securityTextGreen}>We never see your data. Everything is encrypted on your device before syncing.</Text>
        </View>
        <View style={styles.securityBoxBlue}>
          <Text style={styles.securityTitleBlue}>Industry Standards</Text>
          <Text style={styles.securityTextBlue}>SOC 2 Type II certified with regular third-party security audits.</Text>
        </View>
        <View style={styles.securityBoxPurple}>
          <Text style={styles.securityTitlePurple}>Open Source</Text>
          <Text style={styles.securityTextPurple}>Our core cryptography is open source and independently verified.</Text>
        </View>
      </View>

      {/* Links */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Feather name="globe" size={20} color="#5a67d8" />
          <Text style={styles.sectionTitle}>Links & Resources</Text>
        </View>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>Visit our Website</Text>
          <Feather name="external-link" size={16} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>Privacy Policy</Text>
          <Feather name="external-link" size={16} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>Terms of Service</Text>
          <Feather name="external-link" size={16} color="#444" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.linkButton} onPress={() => {}}>
          <Text style={styles.linkText}>Security Whitepaper</Text>
          <Feather name="external-link" size={16} color="#444" />
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal Information</Text>
        <Text style={styles.legalText}>© 2024 CPD Technologies, Inc. All rights reserved.</Text>
        <Text style={styles.legalText}>CPD Vault is a trademark of CPD Technologies, Inc. All other trademarks are the property of their respective owners.</Text>
        <Text style={styles.legalText}>Built with ❤️ in San Francisco, CA</Text>
      </View>

      {/* Version Info */}
      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>Version: 1.0.0 (Build 2024.12.04)</Text>
        <Text style={styles.versionText}>Last Updated: December 4, 2024</Text>
        <Text style={styles.versionText}>Platform: Android/iOS</Text>
        <Text style={styles.versionText}>Encryption: AES-256-GCM</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  centeredSection: { alignItems: 'center', marginVertical: 24 },
  iconBox: { width: 80, height: 80, backgroundColor: '#222', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  appTitle: { fontSize: 24, fontWeight: 'bold' },
  appVersion: { color: '#888', marginBottom: 8 },
  appDesc: { color: '#666', textAlign: 'center', marginHorizontal: 16 },
  section: { marginVertical: 16, paddingHorizontal: 16 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginLeft: 8 },
  sectionText: { color: '#666', marginBottom: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  featureDot: { width: 6, height: 6, backgroundColor: '#3182ce', borderRadius: 3, marginRight: 8 },
  featureText: { color: '#666', fontSize: 14 },
  teamGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  teamMemberBox: { width: '48%', alignItems: 'center', marginBottom: 12 },
  teamAvatar: { width: 48, height: 48, backgroundColor: '#eee', borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  teamAvatarText: { color: '#666', fontWeight: 'bold' },
  teamName: { fontWeight: '500', fontSize: 14 },
  teamRole: { color: '#888', fontSize: 12 },
  securityBoxGreen: { backgroundColor: '#f0fff4', borderRadius: 8, padding: 8, marginBottom: 6 },
  securityTitleGreen: { color: '#276749', fontWeight: 'bold' },
  securityTextGreen: { color: '#38a169' },
  securityBoxBlue: { backgroundColor: '#ebf8ff', borderRadius: 8, padding: 8, marginBottom: 6 },
  securityTitleBlue: { color: '#2b6cb0', fontWeight: 'bold' },
  securityTextBlue: { color: '#3182ce' },
  securityBoxPurple: { backgroundColor: '#faf5ff', borderRadius: 8, padding: 8, marginBottom: 6 },
  securityTitlePurple: { color: '#6b46c1', fontWeight: 'bold' },
  securityTextPurple: { color: '#805ad5' },
  linkButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f7fafc', padding: 12, borderRadius: 8, marginBottom: 6 },
  linkText: { fontSize: 16, color: '#222' },
  legalText: { color: '#aaa', fontSize: 12, marginBottom: 2 },
  versionInfo: { borderTopWidth: 1, borderColor: '#eee', padding: 12, marginTop: 12 },
  versionText: { color: '#888', fontSize: 12 },
});
