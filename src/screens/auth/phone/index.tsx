/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {
  useResendOtpPhoneMutation,
  useVerifyOtpPhoneMutation,
} from '@services/mutationApi';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {FC, useEffect, useState} from 'react';
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import style from './styles';

const {width} = Dimensions.get('window');

export const Phone: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(60);
  const [verifyOtpPhone, {data, isLoading, isSuccess, isError, error}] =
    useVerifyOtpPhoneMutation();
  const [
    resendOtpPhone,
    {isSuccess: resendSucc, isError: resendIsErr, error: resendErr},
  ] = useResendOtpPhoneMutation();

  const profile = route?.params?.values;

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    if (otp?.length > 5) {
      verifyOtpPhone({
        otp: String(otp),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  useEffect(() => {
    if (data?.status) {
      navigation.navigate('CreateProfile');
    }
    if (!data?.status) {
      flash.danger({description: data?.message});
    }
  }, [isLoading, isSuccess, isError, data, dispatch, navigation, error]);

  useEffect(() => {
    if (resendSucc) {
      flash.success({description: 'OTP sent successfully'});
    }
    if (resendIsErr && 'data' in resendErr!) {
      console.log(error, 'move it');
      flash.danger({description: resendErr?.data?.message});
    }
  }, [resendSucc, resendIsErr, resendErr, error]);

  function handleBackButton() {
    navigation.navigate('Signup');
    return true;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              <Text style={style.headerLabel}>Verify Phone Number</Text>
              <Text style={style.headerSub}>
                A 6-digit OTP was sent to{' '}
                <Text style={{color: '#000'}}>
                  {profile?.phone
                    ? profile?.phone
                    : 'number connected with BVN'}
                </Text>
                . Input below to continue.
              </Text>
            </View>
          </View>
          <SizedBox height={40} />
          <OTPInputView
            style={{width: '100%', height: 100}}
            pinCount={6}
            autoFocusOnLoad={false}
            codeInputFieldStyle={style.underlineStyleBase}
            secureTextEntry
            onCodeFilled={code => {
              setOtp(code);
            }}
          />
        </View>
        <SizedBox height={24} />

        <View style={style.resendBox}>
          {seconds > 1 ? (
            <Text style={style.resendText}>
              Resend in{' '}
              <Text style={style.resendSpan}>00 : {formattedSeconds}</Text>
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSeconds(60);
              }}>
              <Text style={style.resendSpan}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
