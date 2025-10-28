import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <View style={styles.logoInner} />
        </View>
        <Text style={styles.headerText}>CP0</Text>
      </View>

      {/* Login Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordRow}>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              {showPassword ? (
                <Feather name="eye-off" size={20} color="#888" />
              ) : (
                <Feather name="eye" size={20} color="#888" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('MasterPassword')}>
          <Text style={styles.loginButtonText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupText}>Don't have an account?</Text>
        </TouchableOpacity>
      </View>

      {/* Biometric Login */}
      <View style={styles.biometricRow}>
        <MaterialCommunityIcons name="fingerprint" size={24} color="#666" />
        <Text style={styles.biometricText}>Touch to sign in</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, marginTop: 16 },
  logoBox: { width: 32, height: 32, backgroundColor: '#222', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  logoInner: { width: 16, height: 16, backgroundColor: '#fff', borderRadius: 4 },
  headerText: { color: '#666', fontSize: 18 },
  form: { flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#444', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fafafa' },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeButton: { position: 'absolute', right: 12 },
  loginButton: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center', marginTop: 16 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signupButton: { alignItems: 'center', marginTop: 12 },
  signupText: { color: '#666', fontSize: 14 },
  biometricRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 32 },
  biometricText: { color: '#666', marginLeft: 8 },
});
