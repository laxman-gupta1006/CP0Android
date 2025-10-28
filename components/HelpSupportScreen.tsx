import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

interface HelpSupportScreenProps {
  navigation: any;
}

export function HelpSupportScreen({ navigation }: HelpSupportScreenProps) {
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'resources'>('faq');
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: ""
  });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How do I import passwords from another password manager?",
      answer: "Go to Settings > Import Data and follow the step-by-step guide to import from popular password managers like LastPass, 1Password, or Chrome."
    },
    {
      question: "What should I do if I forget my master password?",
      answer: "Unfortunately, we cannot recover your master password due to our zero-knowledge security model. You'll need to reset your account, which will delete all stored data."
    },
    {
      question: "How secure is CPD Vault?",
      answer: "CPD Vault uses AES-256 encryption, PBKDF2 key derivation, and zero-knowledge architecture. Your data is encrypted before it leaves your device."
    },
    {
      question: "Can I share passwords with team members?",
      answer: "Yes! Create shared vaults to securely share passwords with trusted team members or family. Each person maintains their own master password."
    },
    {
      question: "How do I enable biometric unlock?",
      answer: "Go to Settings > Security > Biometric Authentication and toggle it on. Your device must support fingerprint or face recognition."
    },
    {
      question: "Why am I being asked to update weak passwords?",
      answer: "Our security dashboard identifies weak, reused, or compromised passwords. Regular updates help maintain strong security for all your accounts."
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = () => {
    Alert.alert(
      "Message Sent",
      "Thank you for contacting us! We'll get back to you within 24 hours.",
      [{ text: "OK" }]
    );
    setContactForm({ subject: "", message: "", email: "" });
  };

  const ContactOption = ({ icon, title, subtitle, action }: {
    icon: any;
    title: string;
    subtitle: string;
    action: () => void;
  }) => (
    <TouchableOpacity
      onPress={action}
      style={styles.contactOption}
    >
      {icon}
      <View style={styles.contactOptionContent}>
        <Text style={styles.contactOptionTitle}>{title}</Text>
        <Text style={styles.contactOptionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#6B7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('faq')}
          style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('contact')}
          style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('resources')}
          style={[styles.tab, activeTab === 'resources' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'resources' && styles.activeTabText]}>Resources</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'faq' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search FAQ..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.faqContainer}>
              {filteredFAQ.length > 0 ? (
                filteredFAQ.map((item, index) => (
                  <View key={index} style={styles.faqItem}>
                    <TouchableOpacity
                      onPress={() => toggleFAQ(index)}
                      style={styles.faqHeader}
                    >
                      <Ionicons name="help-circle" size={20} color="#2563EB" />
                      <Text style={styles.faqQuestion}>{item.question}</Text>
                      <Ionicons
                        name={expandedFAQ === index ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#9CA3AF"
                      />
                    </TouchableOpacity>
                    {expandedFAQ === index && (
                      <Text style={styles.faqAnswer}>{item.answer}</Text>
                    )}
                  </View>
                ))
              ) : (
                <Text style={styles.noResults}>No FAQ items match your search.</Text>
              )}
            </View>
          </View>
        )}

        {activeTab === 'contact' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Support</Text>
            <Text style={styles.sectionSubtitle}>
              Choose how you'd like to get in touch with our support team.
            </Text>

            {/* Contact Options */}
            <View style={styles.contactOptions}>
              <ContactOption
                icon={<MaterialIcons name="email" size={24} color="#2563EB" />}
                title="Email Support"
                subtitle="Get help via email • Response within 24 hours"
                action={() => setActiveTab('contact')}
              />

              <ContactOption
                icon={<Ionicons name="chatbubble" size={24} color="#2563EB" />}
                title="Live Chat"
                subtitle="Chat with support • Available 9 AM - 5 PM EST"
                action={() => Alert.alert("Live Chat", "Live chat would open here")}
              />

              <ContactOption
                icon={<Ionicons name="call" size={24} color="#2563EB" />}
                title="Phone Support"
                subtitle="Call us directly • Premium users only"
                action={() => Alert.alert("Phone Support", "Phone support: +1-800-CPD-VAULT")}
              />
            </View>

            {/* Contact Form */}
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Send us a message</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Your Email</Text>
                <TextInput
                  style={styles.input}
                  value={contactForm.email}
                  onChangeText={(text) => setContactForm({...contactForm, email: text})}
                  placeholder="your@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={contactForm.subject}
                  onChangeText={(text) => setContactForm({...contactForm, subject: text})}
                  placeholder="Brief description of your issue"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Message</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={contactForm.message}
                  onChangeText={(text) => setContactForm({...contactForm, message: text})}
                  placeholder="Please describe your issue in detail..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                onPress={handleContactSubmit}
                disabled={!contactForm.email || !contactForm.subject || !contactForm.message}
                style={[
                  styles.submitButton,
                  (!contactForm.email || !contactForm.subject || !contactForm.message) && styles.submitButtonDisabled
                ]}
              >
                <Text style={styles.submitButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'resources' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resources</Text>
            <Text style={styles.sectionSubtitle}>
              Learn more about CPD Vault and password security best practices.
            </Text>

            <View style={styles.contactOptions}>
              <ContactOption
                icon={<Ionicons name="book" size={24} color="#2563EB" />}
                title="User Guide"
                subtitle="Complete guide to using CPD Vault"
                action={() => Alert.alert("User Guide", "User guide would open here")}
              />

              <ContactOption
                icon={<Ionicons name="globe" size={24} color="#2563EB" />}
                title="Security Best Practices"
                subtitle="Learn how to stay secure online"
                action={() => Alert.alert("Security Guide", "Security guide would open here")}
              />

              <ContactOption
                icon={<Ionicons name="videocam" size={24} color="#2563EB" />}
                title="Video Tutorials"
                subtitle="Step-by-step video guides"
                action={() => Alert.alert("Video Tutorials", "Video tutorials would open here")}
              />

              <ContactOption
                icon={<Ionicons name="people" size={24} color="#2563EB" />}
                title="Community Forum"
                subtitle="Connect with other users"
                action={() => Alert.alert("Community Forum", "Community forum would open here")}
              />

              <ContactOption
                icon={<Ionicons name="code" size={24} color="#2563EB" />}
                title="API Documentation"
                subtitle="For developers integrating with CPD Vault"
                action={() => Alert.alert("API Docs", "API docs would open here")}
              />
            </View>

            {/* Emergency Contacts */}
            <View style={styles.emergencyContainer}>
              <Text style={styles.emergencyTitle}>Emergency Support</Text>
              <Text style={styles.emergencyText}>
                If you believe your account has been compromised:
              </Text>
              <View style={styles.emergencyList}>
                <Text style={styles.emergencyItem}>• Change your master password immediately</Text>
                <Text style={styles.emergencyItem}>• Contact support at emergency@cpdvault.com</Text>
                <Text style={styles.emergencyItem}>• Enable two-factor authentication</Text>
                <Text style={styles.emergencyItem}>• Review your recent vault activity</Text>
              </View>
            </View>

            {/* Status Page */}
            <View style={styles.statusContainer}>
              <View style={styles.statusHeader}>
                <View style={styles.statusIndicator} />
                <Text style={styles.statusTitle}>System Status</Text>
              </View>
              <Text style={styles.statusText}>
                All systems operational • Last updated: 2 minutes ago
              </Text>
              <TouchableOpacity>
                <Text style={styles.statusLink}>View detailed status →</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
    gap: 12,
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
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  faqContainer: {
    gap: 16,
  },
  faqItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 12,
    marginRight: 12,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  noResults: {
    textAlign: 'center',
    paddingVertical: 32,
    fontSize: 16,
    color: '#9CA3AF',
  },
  contactOptions: {
    gap: 12,
    marginBottom: 32,
  },
  contactOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  contactOptionContent: {
    flex: 1,
  },
  contactOptionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  contactOptionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  formContainer: {
    gap: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emergencyContainer: {
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    marginTop: 24,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DC2626',
    marginBottom: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#B91C1C',
    marginBottom: 12,
  },
  emergencyList: {
    gap: 4,
  },
  emergencyItem: {
    fontSize: 14,
    color: '#B91C1C',
  },
  statusContainer: {
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 8,
    marginTop: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#16A34A',
    borderRadius: 4,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534',
  },
  statusText: {
    fontSize: 14,
    color: '#166534',
    marginBottom: 8,
  },
  statusLink: {
    fontSize: 14,
    color: '#16A34A',
    textDecorationLine: 'underline',
  },
});