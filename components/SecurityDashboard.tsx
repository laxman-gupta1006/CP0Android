import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

interface SecurityDashboardProps {
  navigation: any;
}

export function SecurityDashboard({ navigation }: SecurityDashboardProps) {
  const securityScore = 75;

  const SecurityItem = ({
    icon,
    title,
    description,
    type,
    buttonText,
    onPress
  }: {
    icon: any;
    title: string;
    description: string;
    type: 'warning' | 'caution' | 'success';
    buttonText: string;
    onPress: () => void;
  }) => {
    const getColors = () => {
      switch (type) {
        case 'warning':
          return {
            background: '#FEF2F2',
            border: '#FECACA',
            text: '#DC2626',
            buttonBorder: '#FECACA',
          };
        case 'caution':
          return {
            background: '#FFFBEB',
            border: '#FDE68A',
            text: '#D97706',
            buttonBorder: '#FDE68A',
          };
        case 'success':
          return {
            background: '#F0FDF4',
            border: '#BBF7D0',
            text: '#16A34A',
            buttonBorder: '#BBF7D0',
          };
      }
    };

    const colors = getColors();

    return (
      <View style={[styles.securityItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
        {icon}
        <View style={styles.securityItemContent}>
          <Text style={[styles.securityItemTitle, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.securityItemDescription, { color: colors.text }]}>{description}</Text>
        </View>
        <TouchableOpacity
          onPress={onPress}
          style={[styles.securityItemButton, { borderColor: colors.buttonBorder }]}
        >
          <Text style={[styles.securityItemButtonText, { color: colors.text }]}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const StatCard = ({ value, label }: { value: string; label: string }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Security Dashboard</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Security Score */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreValue}>{securityScore}</Text>
          </View>
          <Text style={styles.scoreTitle}>Security Score</Text>
          <Text style={styles.scoreSubtitle}>Good - Keep improving</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${securityScore}%` }]} />
          </View>
        </View>

        {/* Security Items */}
        <View style={styles.securityItems}>
          <SecurityItem
            icon={<MaterialIcons name="warning" size={20} color="#DC2626" />}
            title="Weak Passwords"
            description="3 items need stronger passwords"
            type="warning"
            buttonText="Fix"
            onPress={() => {/* Handle fix weak passwords */}}
          />

          <SecurityItem
            icon={<Ionicons name="time-outline" size={20} color="#D97706" />}
            title="Old Passwords"
            description="2 passwords over 1 year old"
            type="caution"
            buttonText="Update"
            onPress={() => {/* Handle update old passwords */}}
          />

          <SecurityItem
            icon={<Ionicons name="checkmark-circle" size={20} color="#16A34A" />}
            title="Two-Factor Authentication"
            description="Enabled for 8 accounts"
            type="success"
            buttonText="Good"
            onPress={() => {/* Handle view 2FA */}}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard value="12" label="Total Items" />
          <StatCard value="8" label="Secure Items" />
          <StatCard value="3" label="Need Attention" />
          <StatCard value="2" label="Data Breaches" />
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="shield-checkmark" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Run Security Check</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>View Breach Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scoreSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  scoreCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#16A34A',
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  scoreSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#16A34A',
    borderRadius: 4,
  },
  securityItems: {
    gap: 16,
    marginBottom: 32,
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    gap: 12,
  },
  securityItemContent: {
    flex: 1,
  },
  securityItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  securityItemDescription: {
    fontSize: 14,
  },
  securityItemButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 6,
  },
  securityItemButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    minWidth: '40%',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});