import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Clipboard } from 'react-native';

interface TwoFactorAuthScreenProps {
  navigation: any;
}

export function TwoFactorAuthScreen({ navigation }: TwoFactorAuthScreenProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [setupStep, setSetupStep] = useState<'disabled' | 'setup' | 'verify' | 'enabled'>('disabled');
  const [verificationCode, setVerificationCode] = useState("");
  const [secretKey] = useState("JBSWY3DPEHPK3PXP"); // Mock secret key
  const [backupCodes] = useState([
    "123456789",
    "987654321",
    "456789123",
    "789123456",
    "321654987"
  ]);

  const handleEnable = () => {
    setSetupStep('setup');
  };

  const handleSetupComplete = () => {
    setSetupStep('verify');
  };

  const handleVerify = () => {
    if (verificationCode.length === 6) {
      setIsEnabled(true);
      setSetupStep('enabled');
      Alert.alert("Success", "Two-factor authentication has been enabled!");
    } else {
      Alert.alert("Error", "Please enter a valid 6-digit code");
    }
  };

  const handleDisable = () => {
    Alert.alert(
      "Disable 2FA",
      "Are you sure you want to disable two-factor authentication?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Disable",
          style: "destructive",
          onPress: () => {
            setIsEnabled(false);
            setSetupStep('disabled');
            setVerificationCode("");
          }
        }
      ]
    );
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    Alert.alert("Copied", "Text copied to clipboard");
  };

  if (setupStep === 'enabled') {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Two-Factor Authentication</Text>
        </View>

        {/* Success Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.centerContent}>
            <Ionicons name="checkmark-circle" size={64} color="#16A34A" />
            <Text style={styles.successTitle}>2FA Enabled!</Text>
            <Text style={styles.successText}>
              Two-factor authentication has been successfully enabled for your account.
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="shield-checkmark" size={20} color="#16A34A" />
            <Text style={styles.infoText}>
              Your account is now protected with an additional layer of security. You'll need your authenticator app to sign in.
            </Text>
          </View>

          {/* Backup Codes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Backup Codes</Text>
            <Text style={styles.sectionSubtitle}>
              Save these backup codes in a secure location. You can use them to access your account if you lose your phone.
            </Text>
            <View style={styles.backupCodesContainer}>
              {backupCodes.map((code, index) => (
                <View key={index} style={styles.backupCodeItem}>
                  <Text style={styles.backupCodeText}>{code}</Text>
                  <TouchableOpacity onPress={() => copyToClipboard(code)}>
                    <Ionicons name="copy-outline" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>

          {/* Disable Option */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Manage 2FA</Text>
            <TouchableOpacity onPress={handleDisable} style={styles.disableButton}>
              <Text style={styles.disableButtonText}>Disable Two-Factor Authentication</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (setupStep === 'verify') {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSetupStep('setup')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify Setup</Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Enter Verification Code</Text>
            <Text style={styles.sectionSubtitle}>
              Enter the 6-digit code from your authenticator app to complete the setup.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              style={styles.verificationInput}
              value={verificationCode}
              onChangeText={(text) => setVerificationCode(text.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="phone-portrait" size={20} color="#2563EB" />
            <Text style={styles.infoText}>
              Open your authenticator app and enter the code shown for CP0 Vault.
            </Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={handleVerify}
            disabled={verificationCode.length !== 6}
            style={[
              styles.primaryButton,
              verificationCode.length !== 6 && styles.primaryButtonDisabled
            ]}
          >
            <Text style={styles.primaryButtonText}>Verify & Enable 2FA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSetupStep('setup')}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Back to Setup</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (setupStep === 'setup') {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setSetupStep('disabled')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Setup 2FA</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scan QR Code</Text>
            <Text style={styles.sectionSubtitle}>
              Use your authenticator app to scan this QR code and add CP0 Vault to your app.
            </Text>
          </View>

          {/* Mock QR Code */}
          <View style={styles.qrContainer}>
            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={48} color="#9CA3AF" />
              <Text style={styles.qrText}>QR Code</Text>
            </View>
          </View>

          {/* Manual Entry */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Can't scan? Enter manually</Text>
            <View style={styles.secretKeyContainer}>
              <View style={styles.secretKeyContent}>
                <Text style={styles.secretKeyLabel}>Secret Key:</Text>
                <Text style={styles.secretKeyText}>{secretKey}</Text>
              </View>
              <TouchableOpacity onPress={() => copyToClipboard(secretKey)}>
                <Ionicons name="copy-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Popular Apps */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Authenticator Apps</Text>
            <View style={styles.appsList}>
              <View style={styles.appItem}>
                <Ionicons name="phone-portrait" size={16} color="#6B7280" />
                <Text style={styles.appText}>Google Authenticator</Text>
              </View>
              <View style={styles.appItem}>
                <Ionicons name="phone-portrait" size={16} color="#6B7280" />
                <Text style={styles.appText}>Microsoft Authenticator</Text>
              </View>
              <View style={styles.appItem}>
                <Ionicons name="phone-portrait" size={16} color="#6B7280" />
                <Text style={styles.appText}>Authy</Text>
              </View>
              <View style={styles.appItem}>
                <Ionicons name="phone-portrait" size={16} color="#6B7280" />
                <Text style={styles.appText}>1Password</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleSetupComplete} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>I've Added CP0 Vault</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setSetupStep('disabled')}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Default disabled state
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Two-Factor Authentication</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.centerContent}>
          <Ionicons name="shield-outline" size={48} color="#9CA3AF" />
          <Text style={styles.sectionTitle}>Add Extra Security</Text>
          <Text style={styles.sectionSubtitle}>
            Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
          </Text>
        </View>

        {/* Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusContent}>
            <View>
              <Text style={styles.statusTitle}>Two-Factor Authentication</Text>
              <Text style={styles.statusSubtitle}>
                {isEnabled ? "Enabled" : "Disabled"}
              </Text>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={handleEnable}
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Benefits of 2FA:</Text>
          <View style={styles.benefitsList}>
            <Text style={styles.benefitItem}>• Protects your account even if your password is compromised</Text>
            <Text style={styles.benefitItem}>• Prevents unauthorized access to your vault</Text>
            <Text style={styles.benefitItem}>• Required for compliance with security standards</Text>
            <Text style={styles.benefitItem}>• Works with popular authenticator apps</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Ionicons name="information-circle" size={20} color="#2563EB" />
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Note:</Text> You'll need an authenticator app on your phone to use 2FA. We recommend Google Authenticator or Microsoft Authenticator.
          </Text>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={handleEnable} style={styles.primaryButton}>
          <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Enable Two-Factor Authentication</Text>
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
    padding: 24,
  },
  centerContent: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  successText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    gap: 12,
    marginBottom: 24,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  backupCodesContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    gap: 8,
  },
  backupCodeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
  },
  backupCodeText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#111827',
  },
  disableButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
  },
  disableButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  verificationInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  qrPlaceholder: {
    width: 192,
    height: 192,
    backgroundColor: '#F9FAFB',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
  secretKeyContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  secretKeyContent: {
    flex: 1,
  },
  secretKeyLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  secretKeyText: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#111827',
  },
  appsList: {
    gap: 8,
  },
  appItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appText: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  statusContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  benefitsList: {
    gap: 8,
    marginTop: 12,
  },
  benefitItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '600',
  },
  actionsContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});