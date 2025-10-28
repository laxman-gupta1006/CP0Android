

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { VaultScreen } from './components/VaultScreen';
import { AboutScreen } from './components/AboutScreen';
import { AddItemScreen } from './components/AddItemScreen';
import { AutoBackupScreen } from './components/AutoBackupScreen';
import { BiometricScreen } from './components/BiometricScreen';
import { ChangeMasterPasswordScreen } from './components/ChangeMasterPasswordScreen';
import { ExportDataScreen } from './components/ExportDataScreen';
import { HelpSupportScreen } from './components/HelpSupportScreen';
import { IPhoneFrame } from './components/IPhoneFrame';
import { ItemDetailsScreen } from './components/ItemDetailsScreen';
import { MasterPasswordScreen } from './components/MasterPasswordScreen';
import { PasswordGeneratorScreen } from './components/PasswordGeneratorScreen';
import { SecurityDashboard } from './components/SecurityDashboard';
import { SettingsScreen } from './components/SettingsScreen';
import { TwoFactorAuthScreen } from './components/TwoFactorAuthScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MasterPassword: undefined;
  Biometric: undefined;
  Vault: undefined;
  AddItem: { item?: any; isEditMode?: boolean };
  PasswordGenerator: { returnScreen?: string };
  SecurityDashboard: undefined;
  Settings: undefined;
  ItemDetails: { item: any };
  ChangeMasterPassword: undefined;
  ExportData: undefined;
  TwoFactorAuth: undefined;
  AutoBackup: undefined;
  HelpSupport: undefined;
  About: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MasterPassword" component={MasterPasswordScreen} />
        <Stack.Screen name="Biometric" component={BiometricScreen} />
        <Stack.Screen name="Vault" component={VaultScreen} />
        <Stack.Screen name="AddItem" component={AddItemScreen} />
        <Stack.Screen name="PasswordGenerator" component={PasswordGeneratorScreen} />
        <Stack.Screen name="SecurityDashboard" component={SecurityDashboard} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} />
        <Stack.Screen name="ChangeMasterPassword" component={ChangeMasterPasswordScreen} />
        <Stack.Screen name="ExportData" component={ExportDataScreen} />
        <Stack.Screen name="TwoFactorAuth" component={TwoFactorAuthScreen} />
        <Stack.Screen name="AutoBackup" component={AutoBackupScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
