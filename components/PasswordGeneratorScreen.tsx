import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Clipboard } from 'react-native';

interface PasswordGeneratorScreenProps {
  navigation: any;
  onUsePassword?: (password: string) => void;
}

export function PasswordGeneratorScreen({ navigation, route }: any) {
  const returnScreen = route?.params?.returnScreen;
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") charset = lowercase; // fallback

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyPassword = async () => {
    await Clipboard.setString(password);
    Alert.alert("Copied", "Password copied to clipboard");
  };

  const getStrengthScore = () => {
    let score = 0;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (length >= 12) score++;
    return score;
  };

  const getStrengthInfo = () => {
    const score = getStrengthScore();
    if (score <= 2) return { label: "Weak", color: "#DC2626" };
    if (score <= 3) return { label: "Fair", color: "#D97706" };
    if (score <= 4) return { label: "Good", color: "#2563EB" };
    return { label: "Strong", color: "#16A34A" };
  };

  const strength = getStrengthInfo();

  const adjustLength = (delta: number) => {
    const newLength = Math.max(4, Math.min(50, length + delta));
    setLength(newLength);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Password Generator</Text>
      </View>

      {/* Generator */}
      <View style={styles.content}>
        {/* Generated Password */}
        <View style={styles.passwordSection}>
          <Text style={styles.label}>Generated Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              editable={false}
              selectTextOnFocus={true}
            />
            <View style={styles.passwordActions}>
              <TouchableOpacity onPress={copyPassword} style={styles.actionButton}>
                <Ionicons name="copy-outline" size={20} color="#6B7280" />
              </TouchableOpacity>
              <TouchableOpacity onPress={generatePassword} style={styles.actionButton}>
                <Ionicons name="refresh" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.strengthText, { color: strength.color }]}>
            Strength: {strength.label}
          </Text>
        </View>

        {/* Length */}
        <View style={styles.lengthSection}>
          <View style={styles.lengthHeader}>
            <Text style={styles.label}>Length</Text>
            <Text style={styles.lengthValue}>{length} characters</Text>
          </View>
          <View style={styles.lengthControls}>
            <TouchableOpacity
              onPress={() => adjustLength(-1)}
              style={styles.lengthButton}
              disabled={length <= 4}
            >
              <Ionicons name="remove" size={20} color={length <= 4 ? "#9CA3AF" : "#6B7280"} />
            </TouchableOpacity>
            <View style={styles.lengthBar}>
              <View
                style={[
                  styles.lengthFill,
                  { width: `${((length - 4) / (50 - 4)) * 100}%` }
                ]}
              />
            </View>
            <TouchableOpacity
              onPress={() => adjustLength(1)}
              style={styles.lengthButton}
              disabled={length >= 50}
            >
              <Ionicons name="add" size={20} color={length >= 50 ? "#9CA3AF" : "#6B7280"} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options */}
        <View style={styles.optionsSection}>
          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Uppercase (A-Z)</Text>
            <Switch
              value={includeUppercase}
              onValueChange={setIncludeUppercase}
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Lowercase (a-z)</Text>
            <Switch
              value={includeLowercase}
              onValueChange={setIncludeLowercase}
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Numbers (0-9)</Text>
            <Switch
              value={includeNumbers}
              onValueChange={setIncludeNumbers}
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.optionRow}>
            <Text style={styles.optionLabel}>Symbols (!@#$%)</Text>
            <Switch
              value={includeSymbols}
              onValueChange={setIncludeSymbols}
              trackColor={{ false: "#D1D5DB", true: "#2563EB" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => {
            // Navigate back to the return screen with the generated password
            navigation.navigate(returnScreen || 'Vault', { generatedPassword: password });
          }}
          style={styles.useButton}
        >
          <Text style={styles.useButtonText}>Use This Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={copyPassword}
          style={styles.copyButton}
        >
          <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
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
  passwordSection: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#111827',
  },
  passwordActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 12,
  },
  strengthText: {
    fontSize: 14,
    marginTop: 8,
  },
  lengthSection: {
    marginBottom: 32,
  },
  lengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  lengthValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  lengthControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  lengthButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lengthBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  lengthFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  optionsSection: {
    gap: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 16,
    color: '#374151',
  },
  actionsContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  useButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  useButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  copyButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});