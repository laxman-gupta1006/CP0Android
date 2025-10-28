// React Native version of AutoBackupScreen with dummy data
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function AutoBackupScreen({ navigation }: any) {
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('daily');
  const [encryptBackups, setEncryptBackups] = useState(true);
  const [lastBackup] = useState('2 hours ago');
  const [nextBackup] = useState('in 22 hours');
  const BackupHistory = [
    { date: 'Today, 2:00 PM', status: 'Success', size: '2.1 MB' },
    { date: 'Yesterday, 2:00 PM', status: 'Success', size: '2.0 MB' },
    { date: 'Dec 2, 2:00 PM', status: 'Success', size: '1.9 MB' },
    { date: 'Dec 1, 2:00 PM', status: 'Failed', size: '-' },
    { date: 'Nov 30, 2:00 PM', status: 'Success', size: '1.8 MB' },
  ];
  const handleManualBackup = () => {
    alert('Manual backup started! This may take a few moments.');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#444" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Auto-Backup</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.statusDesc}>{autoBackupEnabled ? 'Your vault is automatically backed up to secure cloud storage.' : 'Enable auto-backup to protect your data automatically.'}</Text>
        {autoBackupEnabled && (
          <View style={styles.backupRow}>
            <View style={styles.backupBox}><Text>Last Backup</Text><Text>{lastBackup}</Text></View>
            <View style={styles.backupBox}><Text>Next Backup</Text><Text>{nextBackup}</Text></View>
          </View>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Auto-Backup</Text>
        <Switch value={autoBackupEnabled} onValueChange={setAutoBackupEnabled} />
        {autoBackupEnabled && (
          <>
            <Text style={styles.label}>Backup Frequency</Text>
            <View style={styles.typeRow}>
              {['hourly', 'daily', 'weekly', 'monthly'].map(type => (
                <TouchableOpacity key={type} onPress={() => setBackupFrequency(type)} style={[styles.typeBtn, backupFrequency === type && styles.typeBtnActive]}>
                  <Text style={backupFrequency === type ? styles.typeBtnTextActive : styles.typeBtnText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Encrypt Backups</Text>
            <Switch value={encryptBackups} onValueChange={setEncryptBackups} />
          </>
        )}
        <TouchableOpacity style={styles.manualBtn} onPress={handleManualBackup}>
          <Text style={styles.manualBtnText}>Create Backup Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Recent Backups</Text>
        {BackupHistory.map((backup, index) => (
          <View key={index} style={styles.backupHistoryRow}>
            <Text>{backup.date}</Text>
            <Text>{backup.status}</Text>
            <Text>{backup.size}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#eee' },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  section: { padding: 16 },
  statusTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  statusDesc: { color: '#666', marginBottom: 8 },
  backupRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  backupBox: { backgroundColor: '#f0fff4', borderRadius: 8, padding: 8, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  label: { fontWeight: 'bold', marginTop: 12 },
  typeRow: { flexDirection: 'row', marginVertical: 8 },
  typeBtn: { padding: 8, borderRadius: 8, backgroundColor: '#eee', marginRight: 8 },
  typeBtnActive: { backgroundColor: '#222' },
  typeBtnText: { color: '#222' },
  typeBtnTextActive: { color: '#fff' },
  manualBtn: { backgroundColor: '#222', borderRadius: 8, padding: 12, alignItems: 'center', marginTop: 12 },
  manualBtnText: { color: '#fff', fontSize: 16 },
  backupHistoryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, borderBottomWidth: 1, borderColor: '#eee' },
});
