// React Native version of AddItemScreen with dummy data and props for API integration
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type VaultItem = {
  id: string;
  name: string;
  type: 'website' | 'card' | 'note' | 'identity';
  username?: string;
  password?: string;
  website?: string;
  cardHolderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  notes?: string;
  lastUsed: string;
  createdDate: string;
};

export function AddItemScreen({ navigation, route }: any) {
  const item = route?.params?.item;
  const isEditMode = route?.params?.isEditMode || false;
  const onGeneratePassword = () => {
    navigation.navigate('PasswordGenerator', { returnScreen: 'AddItem' });
  };
  const [itemType, setItemType] = useState(item?.type || 'website');
  const [name, setName] = useState(item?.name || '');
  const [username, setUsername] = useState(item?.username || '');
  const [password, setPassword] = useState(item?.password || '');
  const [website, setWebsite] = useState(item?.website || '');
  const [cardHolderName, setCardHolderName] = useState(item?.cardHolderName || '');
  const [cardNumber, setCardNumber] = useState(item?.cardNumber || '');
  const [expiryDate, setExpiryDate] = useState(item?.expiryDate || '');
  const [cvv, setCvv] = useState(item?.cvv || '');
  const [firstName, setFirstName] = useState(item?.firstName || '');
  const [lastName, setLastName] = useState(item?.lastName || '');
  const [email, setEmail] = useState(item?.email || '');
  const [phone, setPhone] = useState(item?.phone || '');
  const [address, setAddress] = useState(item?.address || '');
  const [city, setCity] = useState(item?.city || '');
  const [country, setCountry] = useState(item?.country || '');
  const [notes, setNotes] = useState(item?.notes || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  useEffect(() => {
    if (item) {
      setItemType(item.type);
      setName(item.name);
      setUsername(item.username || '');
      setPassword(item.password || '');
      setWebsite(item.website || '');
      setCardHolderName(item.cardHolderName || '');
      setCardNumber(item.cardNumber || '');
      setExpiryDate(item.expiryDate || '');
      setCvv(item.cvv || '');
      setFirstName(item.firstName || '');
      setLastName(item.lastName || '');
      setEmail(item.email || '');
      setPhone(item.phone || '');
      setAddress(item.address || '');
      setCity(item.city || '');
      setCountry(item.country || '');
      setNotes(item.notes || '');
    }
  }, [item]);

  // Dummy save handler
  const handleSave = () => {
    // You can integrate API here later
    navigation.navigate('Vault');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? 'Edit Item' : 'Add New Item'}</Text>
      </View>
      <View style={styles.formSection}>
        <Text style={styles.label}>Item Type</Text>
        {/* Simple type selector for demo */}
        <View style={styles.typeRow}>
          {['website', 'card', 'note', 'identity'].map(type => (
            <TouchableOpacity key={type} onPress={() => setItemType(type)} style={[styles.typeBtn, itemType === type && styles.typeBtnActive]}>
              <Text style={itemType === type ? styles.typeBtnTextActive : styles.typeBtnText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter item name" />
        {itemType === 'website' && (
          <>
            <Text style={styles.label}>Website</Text>
            <TextInput style={styles.input} value={website} onChangeText={setWebsite} placeholder="https://example.com" />
            <Text style={styles.label}>Username/Email</Text>
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter username or email" />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordRow}>
              <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#888" />
              </TouchableOpacity>
              <TouchableOpacity onPress={onGeneratePassword} style={styles.eyeBtn}>
                <Feather name="refresh-cw" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          </>
        )}
        {itemType === 'card' && (
          <>
            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput style={styles.input} value={cardHolderName} onChangeText={setCardHolderName} placeholder="John Doe" />
            <Text style={styles.label}>Card Number</Text>
            <TextInput style={styles.input} value={cardNumber} onChangeText={setCardNumber} placeholder="1234 5678 9012 3456" />
            <View style={styles.cardRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Expiry Date</Text>
                <TextInput style={styles.input} value={expiryDate} onChangeText={setExpiryDate} placeholder="MM/YY" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>CVV</Text>
                <View style={styles.passwordRow}>
                  <TextInput style={styles.input} value={cvv} onChangeText={setCvv} placeholder="123" secureTextEntry={!showCvv} />
                  <TouchableOpacity onPress={() => setShowCvv(!showCvv)} style={styles.eyeBtn}>
                    <Feather name={showCvv ? 'eye-off' : 'eye'} size={20} color="#888" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
        {itemType === 'identity' && (
          <>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="John" />
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Doe" />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="john@example.com" />
            <Text style={styles.label}>Phone</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+1 (555) 123-4567" />
            <Text style={styles.label}>Address</Text>
            <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="123 Main Street" />
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="New York" />
            <Text style={styles.label}>Country</Text>
            <TextInput style={styles.input} value={country} onChangeText={setCountry} placeholder="United States" />
          </>
        )}
        {itemType === 'note' && (
          <>
            <Text style={styles.label}>Content</Text>
            <TextInput style={[styles.input, { height: 80 }]} value={notes} onChangeText={setNotes} placeholder="Enter your secure note content..." multiline />
          </>
        )}
        <Text style={styles.label}>Notes (Optional)</Text>
        <TextInput style={[styles.input, { height: 60 }]} value={notes} onChangeText={setNotes} placeholder="Add any additional notes..." multiline />
      </View>
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={!name}>
          <Text style={styles.saveBtnText}>{isEditMode ? 'Update Item' : 'Save Item'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  formSection: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#fafafa', marginTop: 4 },
  typeRow: { flexDirection: 'row', marginVertical: 8 },
  typeBtn: { padding: 8, borderRadius: 8, backgroundColor: '#eee', marginRight: 8 },
  typeBtnActive: { backgroundColor: '#222' },
  typeBtnText: { color: '#222' },
  typeBtnTextActive: { color: '#fff' },
  passwordRow: { flexDirection: 'row', alignItems: 'center' },
  eyeBtn: { marginLeft: 8 },
  cardRow: { flexDirection: 'row', gap: 8 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: 16 },
  saveBtn: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center', flex: 1, marginRight: 8 },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 16, alignItems: 'center', flex: 1 },
  cancelBtnText: { color: '#222', fontSize: 16 },
});
