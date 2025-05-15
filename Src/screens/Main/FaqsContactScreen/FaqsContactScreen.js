import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import CustomButton from '../../../components/CustomButton/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Enable layout animation on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order from the Orders section in the app.',
  },
  {
    question: 'How can I change my delivery address?',
    answer: 'Go to your profile and update the delivery address under settings.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, UPI, and digital wallets.',
  },
];

const FaqsContactScreen = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const toggleFaq = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const handleContactSubmit = () => {
    if (!name.trim() || !message.trim()) {
      alert('Please fill in all fields');
      return;
    }
    alert('Message sent successfully!');
    setName('');
    setMessage('');
  };

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@example.com');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>FAQs</Text>
      {faqs.map((faq, index) => (
        <TouchableOpacity key={index} style={styles.faqItem} onPress={() => toggleFaq(index)}>
          <View style={styles.faqQuestion}>
            <Text style={styles.questionText}>{faq.question}</Text>
            <Icon
              name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#555"
            />
          </View>
          {expandedIndex === index && <Text style={styles.answerText}>{faq.answer}</Text>}
        </TouchableOpacity>
      ))}

      <Text style={styles.header}>Contact Us</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Message"
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleContactSubmit}>
        <CustomButton title="Send Message" backgroundColor="#F49905" width="100%" height="50" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEmailSupport}>
        <Text style={styles.emailLink}>Or email us directly at support@example.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
    color: '#333',
  },
  faqItem: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  answerText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  emailLink: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default FaqsContactScreen;
