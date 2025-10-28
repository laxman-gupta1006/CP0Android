import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

interface VaultItem {
  id: string;
  name: string;
  type: 'website' | 'card' | 'note' | 'identity';
  username?: string;
  website?: string;
  cardHolderName?: string;
  cardNumber?: string;
  firstName?: string;
  lastName?: string;
  lastUsed: string;
}

export function VaultScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const vaultItems: VaultItem[] = [
    {
      id: '1',
      name: 'Facebook',
      type: 'website',
      username: 'john@email.com',
      website: 'facebook.com',
      lastUsed: '2 days ago',
    },
    {
      id: '2',
      name: 'Work Notes',
      type: 'note',
      lastUsed: '1 week ago',
    },
    {
      id: '3',
      name: 'Visa Credit Card',
      type: 'card',
      cardHolderName: 'John Doe',
      cardNumber: '**** **** **** 1234',
      lastUsed: '3 days ago',
    },
    {
      id: '4',
      name: 'GitHub',
      type: 'website',
      username: 'johndoe',
      website: 'github.com',
      lastUsed: '1 day ago',
    },
    {
      id: '5',
      name: 'Personal Identity',
      type: 'identity',
      firstName: 'John',
      lastName: 'Doe',
      lastUsed: '5 days ago',
    },
  ];

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'website':
        return <Feather name="globe" size={20} color="#3182ce" />;
      case 'card':
        return <FontAwesome name="credit-card" size={20} color="#38a169" />;
      case 'note':
        return <Feather name="file-text" size={20} color="#805ad5" />;
      case 'identity':
        return <Feather name="key" size={20} color="#ed8936" />;
      default:
        return <Feather name="globe" size={20} color="#888" />;
    }
  };

  const filteredItems = vaultItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.cardHolderName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${item.firstName || ''} ${item.lastName || ''}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Vault</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('SecurityDashboard')}>
            <Text style={styles.headerBtnText}>Security</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.headerBtnText}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchRow}>
          <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search vault..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      {/* Items List */}
      <ScrollView style={styles.list}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('ItemDetails', { item })}
            style={styles.itemRow}
          >
            <View style={styles.itemIconBox}>{getItemIcon(item.type)}</View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.type === 'website' && (item.username || item.website)}
                {item.type === 'card' && (item.cardHolderName || item.cardNumber)}
                {item.type === 'identity' && `${item.firstName || ''} ${item.lastName || ''}`.trim()}
                {item.type === 'note' && 'Secure note'}
                {!item.username && !item.website && !item.cardHolderName && !item.firstName && !item.lastName && `Secure ${item.type}`}
              </Text>
              <Text style={styles.itemLastUsed}>Last used {item.lastUsed}</Text>
            </View>
            <Feather name="more-vertical" size={16} color="#888" style={styles.itemMoreIcon} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Add Button */}
      <View style={styles.addBtnRow}>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddItem')}>
          <Feather name="plus" size={20} color="#fff" />
          <Text style={styles.addBtnText}>Add New Item</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  headerButtons: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  headerBtn: { backgroundColor: '#f7fafc', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 16, marginRight: 8 },
  headerBtnText: { color: '#222', fontSize: 14 },
  searchRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#eee', borderRadius: 8, padding: 10, fontSize: 16, backgroundColor: '#fafafa' },
  list: { flex: 1, padding: 16 },
  itemRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 12, marginBottom: 10, backgroundColor: '#fff' },
  itemIconBox: { width: 40, height: 40, backgroundColor: '#f7fafc', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: 'bold', fontSize: 16 },
  itemDetails: { color: '#666', fontSize: 14 },
  itemLastUsed: { color: '#aaa', fontSize: 12 },
  itemMoreIcon: { marginLeft: 8 },
  addBtnRow: { padding: 16 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#222', borderRadius: 10, padding: 16 },
  addBtnText: { color: '#fff', fontSize: 16, marginLeft: 8 },
});
