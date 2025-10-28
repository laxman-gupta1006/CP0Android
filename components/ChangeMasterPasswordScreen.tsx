import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function ChangeMasterPasswordScreen({ navigation }: any) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(newPassword);
  const passwordsMatch = newPassword === confirmPassword && confirmPassword !== '';
  const isValid = currentPassword && newPassword && confirmPassword && passwordsMatch && passwordStrength >= 3;

  const handleSave = () => {
    if (isValid) {
      setIsChanged(true);
      setTimeout(() => {
        navigation.goBack();
      }, 2000);
    }
  };

  const getStrengthText = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return { text: 'Weak', color: '#e53e3e' };
      case 2:
      case 3:
        return { text: 'Medium', color: '#ecc94b' };
      case 4:
      case 5:
        return { text: 'Strong', color: '#38a169' };
      default:
        return { text: '', color: '#666' };
    }
  };

  const strengthInfo = getStrengthText(passwordStrength);

  if (isChanged) {
    return (
      <View style={styles.centeredContainer}>
        <Feather name="check-circle" size={64} color="#38a169" style={{ marginBottom: 16 }} />
        <Text style={styles.successTitle}>Password Changed!</Text>
        <Text style={styles.successDesc}>Your master password has been updated successfully.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Master Password</Text>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            secureTextEntry={!showCurrentPassword}
          />
          <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.eyeBtn}>
            <Feather name={showCurrentPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry={!showNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.eyeBtn}>
            <Feather name={showNewPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.strengthText, { color: strengthInfo.color }]}>{strengthInfo.text}</Text>
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeBtn}>
            <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
          </TouchableOpacity>
        </View>
        {!passwordsMatch && confirmPassword !== '' && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}
        <TouchableOpacity style={[styles.saveBtn, !isValid && { opacity: 0.5 }]} onPress={handleSave} disabled={!isValid}>
          <Text style={styles.saveBtnText}>Save</Text>
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
  formSection: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fafafa', flex: 1 },
  eyeBtn: { marginLeft: 8 },
  strengthText: { marginTop: 4, marginBottom: 8, fontWeight: 'bold' },
  errorText: { color: '#e53e3e', marginTop: 4 },
  saveBtn: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 24 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  centeredContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  successTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  successDesc: { color: '#666', textAlign: 'center' },
});
