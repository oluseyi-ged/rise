/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {RF} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {useChangePinMutation} from '@services/mutationApi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from './styles';

export const ResetPin = ({navigation, route}) => {
  const oldPin = route.params.value;
  const [pin, setPin] = useState('');

  const [changePin, {data, isLoading, isSuccess, isError, error, reset}] =
    useChangePinMutation();

  const handleSubmit = () => {
    changePin({
      oldPin: oldPin,
      newPin: pin,
    });
  };
  // Ecobank@BBC_2020

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      flash.success({description: 'Pin changed successfully'});
      navigation.navigate('Security');
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
  }, [data, error, isError, isSuccess, navigation, reset]);

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
          <Text style={[styles.headerLabel, {fontSize: RF(17)}]}>New Pin</Text>
          <SizedBox height={10} />
          <OTPInputView
            style={{width: '80%', height: 100, alignSelf: 'center'}}
            autoFocusOnLoad={false}
            pinCount={4}
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
            handleSubmit();
          }}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};
