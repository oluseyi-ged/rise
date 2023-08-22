import {Header, SizedBox} from '@components';
import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styles from './styles';

export const Terms = ({}: any) => {
  return (
    <SafeAreaView style={styles.pageWrap}>
      <Header label="Terms of Use" />
      <SizedBox height={37} />
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          Welcome to Moola! Our telemedicine app is designed to provide users
          with convenient access to healthcare services from licensed healthcare
          providers.
        </Text>
        <SizedBox height={20} />
        <Text style={styles.text}>
          By using Moola, you agree to the following terms:
        </Text>
        <SizedBox height={20} />
        <Text style={styles.text}>
          1. Medical advice disclaimer: Moola is not a substitute for
          professional medical advice, diagnosis, or treatment. Always seek the
          advice of your healthcare provider with any questions you may have
          regarding a medical condition.{'\n'} 2. Eligibility: You must be at
          least 18 years old to use Moola. If you are under 18 years old, you
          may only use the app with the consent of a parent or legal guardian.
          {'\n'}
          3. User information: Moola collects certain information about users,
          including personal information and medical history. This information
          is used to provide healthcare services and improve the app experience.
          {'\n'}
          4. User responsibilities: You are responsible for providing accurate
          and complete information about your medical history and current
          symptoms. You are also responsible for using Moola in a safe and
          appropriate manner.{'\n'}
          5. Privacy: Moola is committed to protecting your privacy. We do not
          share your personal information with third parties without your
          consent, except as required by law.{'\n'}
          6. Payment: Moola may charge fees for certain services. You are
          responsible for paying any fees associated with your use of the app.
          {'\n'}
          7. Limitation of liability: Moola is not liable for any damages
          arising from your use of the app or your reliance on any information
          provided through the app.{'\n'}
          8. Changes to terms of use: Moola may update these terms of use from
          time to time. Your continued use of the app after any changes to these
          terms constitutes your acceptance of the revised terms.
        </Text>
        <SizedBox height={20} />
        <Text style={styles.text}>
          Thank you for choosing Moola. We are dedicated to providing you with
          high-quality healthcare services through our telemedicine app.
        </Text>
      </ScrollView>
      <SizedBox height={30} />
    </SafeAreaView>
  );
};
