import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import TypeBBackground from '../../../components/BackgroundCard/TypeBBackground/TypeBBackground';
import CustomGradientButton from '../../../components/CustomGradientButton/CustomGradientButton';

const UserComplaint = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TypeBBackground>
            <View style={styles.container}>
              {/* Header */}
              <Text style={styles.headerText}>Submit Your Complaint</Text>
              <View style={styles.divider} />

              {/* Complaint Input */}
              <TextInput
                placeholder="Write your complaint here..."
                placeholderTextColor="#888"
                style={styles.input}
                multiline
              />

              {/* Submit Button */}
              <View style={styles.buttonContainer}>
                <CustomGradientButton
                  width={150}
                  borderRadius={8}
                  title="Submit"
                  onPress={() => alert('Complaint submitted successfully!')}
                />
              </View>
            </View>
          </TypeBBackground>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UserComplaint;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,

  },
  headerText: {
    fontFamily: 'Poppins-SemiBold', // Modern font for headers
    fontSize: 20,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#F7941E', // Accent color for the divider
    marginVertical: 15,
    width: '100%',
    alignSelf: 'center',
  },
  input: {
    height: 150,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlignVertical: 'top', 
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});