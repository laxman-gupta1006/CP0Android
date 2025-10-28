import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface SettingsScreenProps {
  navigation: any;
  onLogout?: () => void;
  onChangeMasterPassword?: () => void;
  onExportData?: () => void;
  onTwoFactorAuth?: () => void;
  onAutoBackup?: () => void;
  onHelpSupport?: () => void;
  onAbout?: () => void;
}

export function SettingsScreen({
  navigation,
  onLogout,
  onChangeMasterPassword,
  onExportData,
  onTwoFactorAuth,
  onAutoBackup,
  onHelpSupport,
  onAbout
}: SettingsScreenProps) {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [notifications, setNotifications] = useState(false);

  const defaultHandler = (screenName: string) => () => {
    navigation.navigate(screenName);
  };

  const handleLogout = onLogout || (() => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", style: "destructive", onPress: () => navigation.navigate('Login') }
      ]
    );
  });
  const handleChangeMasterPassword = onChangeMasterPassword || defaultHandler("ChangeMasterPassword");
  const handleExportData = onExportData || defaultHandler("ExportData");
  const handleTwoFactorAuth = onTwoFactorAuth || defaultHandler("TwoFactorAuth");
  const handleAutoBackup = onAutoBackup || defaultHandler("AutoBackup");
  const handleHelpSupport = onHelpSupport || defaultHandler("HelpSupport");
  const handleAbout = onAbout || defaultHandler("About");  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightElement
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={styles.settingItem}
      disabled={!onPress}
    >
      {icon}
      <View style={styles.settingItemContent}>
        <Text style={styles.settingItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || (onPress && <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />)}
    </TouchableOpacity>
  );

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <SettingSection title="Account">
          <SettingItem
            icon={<Ionicons name="key-outline" size={20} color="#6B7280" />}
            title="Change Master Password"
            subtitle="Update your vault master password"
            onPress={handleChangeMasterPassword}
          />
          <SettingItem
            icon={<Ionicons name="download-outline" size={20} color="#6B7280" />}
            title="Export Data"
            subtitle="Download your vault data"
            onPress={handleExportData}
          />
        </SettingSection>

        {/* Security Section */}
        <SettingSection title="Security">
          <SettingItem
            icon={<Ionicons name="finger-print-outline" size={20} color="#6B7280" />}
            title="Biometric Authentication"
            subtitle="Use fingerprint to unlock"
            rightElement={
              <Switch
                value={biometricEnabled}
                onValueChange={setBiometricEnabled}
                trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <SettingItem
            icon={<Ionicons name="shield-outline" size={20} color="#6B7280" />}
            title="Auto-Lock"
            subtitle="Lock vault when inactive"
            rightElement={
              <Switch
                value={autoLock}
                onValueChange={setAutoLock}
                trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <SettingItem
            icon={<Ionicons name="shield-checkmark-outline" size={20} color="#6B7280" />}
            title="Two-Factor Authentication"
            subtitle="Add extra security layer"
            onPress={handleTwoFactorAuth}
          />
        </SettingSection>

        {/* Preferences Section */}
        <SettingSection title="Preferences">
          <SettingItem
            icon={<Ionicons name="notifications-outline" size={20} color="#6B7280" />}
            title="Notifications"
            subtitle="Security alerts and reminders"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <SettingItem
            icon={<Ionicons name="cloud-upload-outline" size={20} color="#6B7280" />}
            title="Auto-Backup"
            subtitle="Automatically backup your data"
            onPress={handleAutoBackup}
          />
        </SettingSection>

        {/* Support Section */}
        <SettingSection title="Support">
          <SettingItem
            icon={<Ionicons name="help-circle-outline" size={20} color="#6B7280" />}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={handleHelpSupport}
          />
          <SettingItem
            icon={<Ionicons name="information-circle-outline" size={20} color="#6B7280" />}
            title="About CP0 Vault"
            subtitle="Version 1.0.0"
            onPress={handleAbout}
          />
        </SettingSection>
      </ScrollView>

      {/* Logout */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={20} color="#DC2626" />
          <Text style={styles.logoutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionHeader: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  settingItemContent: {
    flex: 1,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  logoutContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    gap: 8,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});