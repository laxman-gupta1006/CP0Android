import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MasterPasswordScreenProps {
  navigation: any;
  onContinue?: () => void;
}

export function MasterPasswordScreen({ navigation, onContinue }: MasterPasswordScreenProps) {
  const [masterPassword, setMasterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleContinue = () => {
    if (masterPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (masterPassword.length < 8) {
      Alert.alert("Error", "Master password must be at least 8 characters long");
      return;
    }
    if (onContinue) {
      onContinue();
    } else {
      Alert.alert("Success", "Master password set successfully!");
      navigation.navigate('Biometric');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.logo}>
          <View style={styles.logoInner} />
        </View>
        <Text style={styles.logoText}>CP0</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Master Password</Text>
        <Text style={styles.subtitle}>
          Create a strong master password to secure your vault
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Master Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={masterPassword}
              onChangeText={setMasterPassword}
              placeholder="Enter master password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.visibilityButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Master Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm master password"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.visibilityButton}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Your master password cannot be recovered if forgotten. Make sure to remember it or store it safely.
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleContinue}
          disabled={!masterPassword || masterPassword !== confirmPassword}
          style={[
            styles.continueButton,
            (!masterPassword || masterPassword !== confirmPassword) && styles.continueButtonDisabled
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  backButton: {
    padding: 4,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#374151',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  logoInner: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  logoText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  visibilityButton: {
    padding: 12,
  },
  warningContainer: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 32,
  },
  warningText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});