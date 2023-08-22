import {Header, SizedBox} from '@components';
import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import styles from './styles';

export const PrivacyPolicy = ({}: any) => {
  return (
    <SafeAreaView style={styles.pageWrap}>
      <Header label="Privacy Policy" />
      <SizedBox height={37} />
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          Thank you for using Moola, our telemedicine app. Your privacy is
          important to us, and we are committed to protecting your personal
          information.
        </Text>
        <SizedBox height={20} />
        <Text style={styles.text}>
          Here is a summary of our privacy policy:
        </Text>
        <SizedBox height={20} />
        <Text style={styles.text}>
          - We collect and store your personal information only for the purpose
          of providing telemedicine services to you.{'\n'} - We will not share
          your personal information with any third parties without your explicit
          consent, except as required by law.{'\n'} - We use industry-standard
          security measures to protect your personal information from
          unauthorized access or disclosure.{'\n'}- We may collect certain
          non-personal information, such as device information and usage data,
          for the purpose of improving our app and services.{'\n'}- You have the
          right to access, modify, or delete your personal information at any
          time.
        </Text>
      </ScrollView>
      <SizedBox height={30} />
    </SafeAreaView>
  );
};
