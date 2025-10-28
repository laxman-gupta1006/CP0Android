import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet, Clipboard, Linking } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface VaultItem {
  id: string;
  name: string;
  type: 'website' | 'card' | 'note' | 'identity';
  // Website fields
  username?: string;
  password?: string;
  website?: string;
  // Card fields
  cardHolderName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  // Identity fields
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  // Common fields
  notes?: string;
  lastUsed: string;
  createdDate: string;
}

interface ItemDetailsScreenProps {
  item?: VaultItem;
  navigation: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ItemDetailsScreen({ item, navigation, onEdit, onDelete }: ItemDetailsScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  // Default item for demo purposes
  const defaultItem: VaultItem = {
    id: '1',
    name: 'Sample Item',
    type: 'website',
    username: 'user@example.com',
    password: 'password123',
    website: 'example.com',
    notes: 'Sample notes',
    lastUsed: '2024-01-15',
    createdDate: '2024-01-01'
  };

  const currentItem = item || defaultItem;
  const handleEdit = onEdit || (() => navigation.navigate('AddItem', { item: currentItem, isEditMode: true }));
  const handleDelete = onDelete || (() => navigation.navigate('Vault'));

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    Alert.alert("Copied", "Text copied to clipboard");
  };

  const openWebsite = () => {
    if (currentItem.website) {
      const url = currentItem.website.startsWith('http') ? currentItem.website : `https://${currentItem.website}`;
      Linking.openURL(url);
    }
  };

  const handleDeleteConfirm = () => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: handleDelete }
      ]
    );
  };

  const FieldRow = ({ label, value, onCopy }: { label: string; value: string; onCopy?: () => void }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldRow}>
        <TextInput
          style={styles.fieldInput}
          value={value}
          editable={false}
          multiline={label === 'Content' || label === 'Notes'}
        />
        {onCopy && (
          <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const SecureFieldRow = ({
    label,
    value,
    show,
    onToggle,
    onCopy
  }: {
    label: string;
    value: string;
    show: boolean;
    onToggle: () => void;
    onCopy?: () => void;
  }) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.fieldRow}>
        <TextInput
          style={styles.fieldInput}
          value={value}
          editable={false}
          secureTextEntry={!show}
        />
        <TouchableOpacity onPress={onToggle} style={styles.visibilityButton}>
          <Ionicons
            name={show ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {onCopy && (
          <TouchableOpacity onPress={onCopy} style={styles.copyButton}>
            <Ionicons name="copy-outline" size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{currentItem.name}</Text>
          <Text style={styles.headerSubtitle}>{currentItem.type.charAt(0).toUpperCase() + currentItem.type.slice(1)}</Text>
        </View>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentItem.type === 'website' && (
          <View style={styles.section}>
            {currentItem.website && (
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>Website</Text>
                <View style={styles.fieldRow}>
                  <TextInput
                    style={styles.fieldInput}
                    value={currentItem.website}
                    editable={false}
                  />
                  <TouchableOpacity onPress={openWebsite} style={styles.iconButton}>
                    <Ionicons name="globe-outline" size={20} color="#2563EB" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => copyToClipboard(currentItem.website!)} style={styles.copyButton}>
                    <Ionicons name="copy-outline" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {currentItem.username && (
              <FieldRow
                label="Username/Email"
                value={currentItem.username}
                onCopy={() => copyToClipboard(currentItem.username!)}
              />
            )}

            {currentItem.password && (
              <SecureFieldRow
                label="Password"
                value={currentItem.password}
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                onCopy={() => copyToClipboard(currentItem.password!)}
              />
            )}
          </View>
        )}

        {currentItem.type === 'card' && (
          <View style={styles.section}>
            {currentItem.cardHolderName && (
              <FieldRow
                label="Card Holder Name"
                value={currentItem.cardHolderName}
                onCopy={() => copyToClipboard(currentItem.cardHolderName!)}
              />
            )}

            {currentItem.cardNumber && (
              <FieldRow
                label="Card Number"
                value={currentItem.cardNumber}
                onCopy={() => copyToClipboard(currentItem.cardNumber!)}
              />
            )}

            <View style={styles.rowContainer}>
              {currentItem.expiryDate && (
                <View style={styles.halfField}>
                  <FieldRow
                    label="Expiry Date"
                    value={currentItem.expiryDate}
                    onCopy={() => copyToClipboard(currentItem.expiryDate!)}
                  />
                </View>
              )}

              {currentItem.cvv && (
                <View style={styles.halfField}>
                  <SecureFieldRow
                    label="CVV"
                    value={currentItem.cvv}
                    show={showCvv}
                    onToggle={() => setShowCvv(!showCvv)}
                    onCopy={() => copyToClipboard(currentItem.cvv!)}
                  />
                </View>
              )}
            </View>
          </View>
        )}

        {currentItem.type === 'identity' && (
          <View style={styles.section}>
            {(currentItem.firstName || currentItem.lastName) && (
              <FieldRow
                label="Full Name"
                value={`${currentItem.firstName || ''} ${currentItem.lastName || ''}`.trim()}
                onCopy={() => copyToClipboard(`${currentItem.firstName || ''} ${currentItem.lastName || ''}`.trim())}
              />
            )}

            {currentItem.email && (
              <FieldRow
                label="Email"
                value={currentItem.email}
                onCopy={() => copyToClipboard(currentItem.email!)}
              />
            )}

            {currentItem.phone && (
              <FieldRow
                label="Phone"
                value={currentItem.phone}
                onCopy={() => copyToClipboard(currentItem.phone!)}
              />
            )}

            {currentItem.address && (
              <FieldRow
                label="Address"
                value={`${currentItem.address}${currentItem.city ? ', ' + currentItem.city : ''}${currentItem.country ? ', ' + currentItem.country : ''}`}
                onCopy={() => copyToClipboard(`${currentItem.address}${currentItem.city ? ', ' + currentItem.city : ''}${currentItem.country ? ', ' + currentItem.country : ''}`)}
              />
            )}
          </View>
        )}

        {currentItem.type === 'note' && currentItem.notes && (
          <View style={styles.section}>
            <FieldRow
              label="Content"
              value={currentItem.notes}
              onCopy={() => copyToClipboard(currentItem.notes!)}
            />
          </View>
        )}

        {currentItem.notes && currentItem.type !== 'note' && (
          <View style={styles.section}>
            <FieldRow
              label="Notes"
              value={currentItem.notes}
              onCopy={() => copyToClipboard(currentItem.notes!)}
            />
          </View>
        )}

        {/* Metadata */}
        <View style={styles.metadataContainer}>
          <View style={styles.metadataRow}>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Last Used</Text>
              <Text style={styles.metadataValue}>{currentItem.lastUsed}</Text>
            </View>
            <View style={styles.metadataItem}>
              <Text style={styles.metadataLabel}>Created</Text>
              <Text style={styles.metadataValue}>{currentItem.createdDate}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.editActionButton}>
          <Ionicons name="pencil" size={20} color="#FFFFFF" />
          <Text style={styles.editActionText}>Edit Item</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteConfirm} style={styles.deleteActionButton}>
          <MaterialIcons name="delete-outline" size={20} color="#DC2626" />
          <Text style={styles.deleteActionText}>Delete Item</Text>
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
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  iconButton: {
    padding: 12,
    marginLeft: 8,
  },
  copyButton: {
    padding: 12,
    marginLeft: 8,
  },
  visibilityButton: {
    padding: 12,
    marginLeft: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  halfField: {
    flex: 1,
  },
  metadataContainer: {
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 24,
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metadataItem: {
    flex: 1,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 14,
    color: '#111827',
  },
  actionsContainer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  editActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  editActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
    gap: 8,
  },
  deleteActionText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: '600',
  },
});