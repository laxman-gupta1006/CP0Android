import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

export function ExportDataScreen({ navigation }: any) {
  const [isExporting, setIsExporting] = useState(false);
  const [isExported, setIsExported] = useState(false);

  const handleExport = () => {
    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setIsExported(true);

      // In a real app, you'd save to device storage or share
      Alert.alert('Export Complete', 'Your vault data has been exported successfully.');

      setTimeout(() => {
        setIsExported(false);
      }, 3000);
    }, 2000);
  };

  if (isExported) {
    return (
      <View style={styles.centeredContainer}>
        <Feather name="check-circle" size={64} color="#38a169" />
        <Text style={styles.successTitle}>Export Complete!</Text>
        <Text style={styles.successDesc}>Your vault data has been exported successfully.</Text>
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
        <Text style={styles.headerTitle}>Export Data</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.desc}>
          Export your vault data to a CSV file. This creates an unencrypted backup of all your stored information.
        </Text>

        <View style={styles.warningBox}>
          <Feather name="alert-triangle" size={20} color="#e53e3e" style={{ marginRight: 8 }} />
          <Text style={styles.warningText}>
            <Text style={styles.warningBold}>Security Warning:</Text> The exported file will contain your passwords and sensitive data in plain text. Store it securely and delete it when no longer needed.
          </Text>
        </View>

        {/* Export Options */}
        <Text style={styles.sectionTitle}>What will be exported:</Text>

        <View style={styles.optionBox}>
          <Feather name="shield" size={20} color="#3182ce" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Login Items</Text>
            <Text style={styles.optionDesc}>Websites, usernames, and passwords</Text>
          </View>
        </View>

        <View style={styles.optionBox}>
          <Feather name="credit-card" size={20} color="#38a169" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Credit Cards</Text>
            <Text style={styles.optionDesc}>Card numbers, expiry dates, and CVV codes</Text>
          </View>
        </View>

        <View style={styles.optionBox}>
          <Feather name="user" size={20} color="#805ad5" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Identity Information</Text>
            <Text style={styles.optionDesc}>Personal details and contact information</Text>
          </View>
        </View>

        <View style={styles.optionBox}>
          <Feather name="file-text" size={20} color="#dd6b20" />
          <View style={styles.optionText}>
            <Text style={styles.optionTitle}>Secure Notes</Text>
            <Text style={styles.optionDesc}>All saved notes and attachments</Text>
          </View>
        </View>

        {/* Export Format */}
        <Text style={styles.sectionTitle}>Export Format:</Text>
        <View style={styles.formatBox}>
          <Feather name="file-text" size={20} color="#3182ce" />
          <View style={styles.formatText}>
            <Text style={styles.formatTitle}>CSV (Comma Separated Values)</Text>
            <Text style={styles.formatDesc}>Compatible with most spreadsheet applications</Text>
          </View>
        </View>

        {/* Security Tips */}
        <Text style={styles.sectionTitle}>Security Best Practices:</Text>
        <View style={styles.tipsList}>
          <Text style={styles.tip}>• Store the exported file in a secure location</Text>
          <Text style={styles.tip}>• Consider encrypting the file with additional software</Text>
          <Text style={styles.tip}>• Delete the file once you're done with it</Text>
          <Text style={styles.tip}>• Never share the exported file through unsecured channels</Text>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.exportBtn, isExporting && { opacity: 0.5 }]}
          onPress={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <Text style={styles.exportBtnText}>Exporting...</Text>
          ) : (
            <View style={styles.exportBtnContent}>
              <Feather name="download" size={20} color="#fff" />
              <Text style={styles.exportBtnText}>Export Data</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cancelBtn, isExporting && { opacity: 0.5 }]}
          onPress={() => navigation.goBack()}
          disabled={isExporting}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
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
  content: { flex: 1, padding: 16 },
  desc: { color: '#666', marginBottom: 16 },
  warningBox: { flexDirection: 'row', backgroundColor: '#fed7d7', borderWidth: 1, borderColor: '#e53e3e', borderRadius: 8, padding: 12, marginBottom: 24 },
  warningText: { color: '#c53030', fontSize: 14, flex: 1 },
  warningBold: { fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  optionBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7fafc', padding: 12, borderRadius: 8, marginBottom: 8 },
  optionText: { marginLeft: 12, flex: 1 },
  optionTitle: { fontWeight: 'bold' },
  optionDesc: { color: '#666', fontSize: 14 },
  formatBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ebf8ff', borderWidth: 1, borderColor: '#3182ce', borderRadius: 8, padding: 12 },
  formatText: { marginLeft: 12, flex: 1 },
  formatTitle: { fontWeight: 'bold', color: '#2b6cb0' },
  formatDesc: { color: '#3182ce', fontSize: 14 },
  tipsList: { marginTop: 8 },
  tip: { color: '#666', fontSize: 14, marginBottom: 4 },
  actions: { padding: 16, borderTopWidth: 1, borderColor: '#eee' },
  exportBtn: { backgroundColor: '#222', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 8 },
  exportBtnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  exportBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 8 },
  cancelBtn: { backgroundColor: '#eee', borderRadius: 8, padding: 16, alignItems: 'center' },
  cancelBtnText: { color: '#222', fontSize: 16 },
  centeredContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  successTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  successDesc: { color: '#666', textAlign: 'center' },
});
