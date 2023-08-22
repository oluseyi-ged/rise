/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from './styles';

export const Help = ({navigation}) => {
  const options = [
    {
      title: 'Chat With Us',
      icon: 'chat',
    },
    {
      title: 'Email Us',
      icon: 'mail',
    },
    {
      title: 'Call Us',
      icon: 'phone',
    },
  ];

  return (
    <SafeAreaView style={styles.pageWrap}>
      <KeyboardAwareScrollView
        style={styles.scrollWrap}
        keyboardShouldPersistTaps="handled">
        <View>
          <SvgIcon
            name="back"
            size={40}
            onPress={() => navigation.goBack()}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={8} />
          <View>
            <Text style={styles.headerLabel}>Help & Support</Text>
            <Text style={styles.headerSub}>
              Secure your account, from theft or infringement.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />

        <View>
          {options.map((acc, i) => (
            <TouchableOpacity key={i} style={styles.optItem}>
              <View style={styles.optLeft}>
                <SvgIcon name={acc?.icon} size={50} />
                <SizedBox width={12} />
                <View>
                  <Text style={styles.optText}>{acc?.title}</Text>
                </View>
              </View>
              <SvgIcon name="caret-right" size={24} />
            </TouchableOpacity>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
