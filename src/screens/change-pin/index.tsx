/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {RF} from '@helpers';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from './styles';

export const ChangePin = ({navigation}) => {
  const [pin, setPin] = useState('');

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
            <Text style={styles.headerLabel}>Change Pin</Text>
            <Text style={styles.headerSub}>
              Use your pin code to open the app and confirm transactions
            </Text>
          </View>
        </View>
        <SizedBox height={30} />
        <>
          <Text style={[styles.headerLabel, {fontSize: RF(17)}]}>
            Current Pin
          </Text>
          <SizedBox height={10} />
          <OTPInputView
            style={{width: '80%', height: 100, alignSelf: 'center'}}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={styles.underlineStyleBase}
            secureTextEntry
            onCodeFilled={code => {
              setPin(code);
            }}
          />
        </>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button
          title="Confirm"
          onPress={() => {
            navigation.navigate('ResetPin', {value: pin});
          }}
        />
      </View>
    </SafeAreaView>
  );
};
