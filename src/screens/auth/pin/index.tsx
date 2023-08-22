/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useSetPersonalPinMutation} from '@services/mutationApi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {FC, useEffect, useState} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import style from './styles';

const {width} = Dimensions.get('window');

export const Pin: FC = ({navigation}: any) => {
  const [pin, setPin] = useState('');

  const [setPersonalPin, {data, isLoading, isSuccess, isError, error, reset}] =
    useSetPersonalPinMutation();

  useEffect(() => {
    if (pin?.length > 3) {
      setPersonalPin({
        pin: String(pin),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  useEffect(() => {
    if (isSuccess) {
      console.log(error, 'move it');
      navigation.navigate('SelfieScreen');
    }
    if (isError) {
      // @ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
  }, [data, error, isError, isSuccess, navigation, reset]);

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <View>
            <SvgIcon
              name="back"
              size={40}
              onPress={() => navigation.goBack()}
              containerStyle={{alignSelf: 'flex-start'}}
            />
            <SizedBox height={8} />
            <View>
              <Text style={style.headerLabel}>Create Personal PIN</Text>
              <Text style={style.headerSub}>
                This pin will be used to login and confirm transactions.
              </Text>
            </View>
          </View>
          <SizedBox height={40} />
          <OTPInputView
            style={{width: '100%', height: 100}}
            pinCount={4}
            autoFocusOnLoad={false}
            codeInputFieldStyle={style.underlineStyleBase}
            secureTextEntry
            onCodeFilled={code => {
              setPin(code);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
