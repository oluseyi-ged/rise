/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {HDP, maskString} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {
  useResendOtpEmailMutation,
  useResendOtpPhoneMutation,
  useVerifyOtpEmailMutation,
  useVerifyOtpPhoneMutation,
} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {FC, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import style from './styles';

export const Otp: FC = ({navigation, route}: any) => {
  const {mode} = route?.params;
  const {data}: any = route?.params;
  const [pin, setPin] = useState('');
  const [seconds, setSeconds] = useState(60);
  const dispatch = useAppDispatch();

  const [
    verifyOtpEmail,
    {
      data: mailData,
      isLoading: mailLoad,
      isSuccess: mailTrue,
      isError: mailFalse,
      error: mailErr,
      reset: mailReset,
    },
  ] = useVerifyOtpEmailMutation();

  const [
    verifyOtpPhone,
    {
      data: phoneData,
      isLoading: phoneLoad,
      isSuccess: phoneTrue,
      isError: phoneFalse,
      error: phoneErr,
      reset: phoneReset,
    },
  ] = useVerifyOtpPhoneMutation();

  const [
    resendOtpEmail,
    {
      isLoading: resMailLoad,
      isSuccess: resMailTrue,
      isError: resMailFalse,
      error: resMailErr,
      reset: resMailReset,
    },
  ] = useResendOtpEmailMutation();

  const [
    resendOtpPhone,
    {
      isLoading: resPhoneLoad,
      isSuccess: resPhoneTrue,
      isError: resPhoneFalse,
      error: resPhoneErr,
      reset: resPhoneReset,
    },
  ] = useResendOtpPhoneMutation();

  useEffect(() => {
    if (resMailTrue || resPhoneTrue) {
      flash.success({
        description: 'OTP resent successfully',
      });
    }
    if (resMailFalse || resPhoneFalse) {
      console.log(resMailErr || resPhoneErr);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: resMailErr?.data?.message || resPhoneErr?.data?.message,
      });
      resMailReset();
      resPhoneReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resMailFalse, resMailTrue, resPhoneFalse, resPhoneTrue]);

  useEffect(() => {
    if (mailTrue || phoneTrue) {
      dispatch(setAuth(mailData || phoneData));
      navigation.replace('CreateProfile', {data: mailData || phoneData});
    }
    if (mailFalse || phoneFalse) {
      console.log(mailErr || phoneErr);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: mailErr?.data?.message || phoneErr?.data?.message,
      });
      mailReset();
      phoneReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mailFalse, mailTrue, phoneFalse, phoneTrue]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    const formattedTime = `${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return formattedTime;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        contentContainerStyle={style.pageWrap}
        keyboardShouldPersistTaps="handled">
        <SvgIcon
          name="back"
          size={24}
          containerStyle={{alignSelf: 'flex-start', marginLeft: HDP(24)}}
          onPress={() => navigation.goBack()}
        />
        <View>
          <View style={style.upperBox}>
            <Text style={style.welcomeTxt}>
              Verify your {mode === 'mail' ? 'email address' : 'phone number'}
            </Text>
            <SizedBox height={12} />
            <Text style={style.descTxt}>
              To confirm your{' '}
              {mode === 'mail' ? 'email address' : 'mobile number'}, enter the
              6-digit code sent to your{' '}
              {mode === 'mail' ? 'email address' : 'mobile number'}{' '}
              {maskString(
                data?.email || data?.phoneNumber,
                mode === 'mail' ? 13 : 4,
              )}
            </Text>
            <SizedBox height={10} />
            <OTPInputView
              style={{width: '100%', height: 70}}
              pinCount={6}
              autoFocusOnLoad={false}
              codeInputFieldStyle={style.underlineStyleBase}
              onCodeFilled={code => {
                setPin(code);
              }}
            />
            <SizedBox height={10} />
            <TouchableOpacity
              onPress={() => {
                setSeconds(60);
                console.log({id: data?.id});
                if (mode === 'mail') {
                  //@ts-ignore
                  resendOtpEmail({id: data?.id});
                } else {
                  //@ts-ignore
                  resendOtpPhone({id: data?.id});
                }
              }}
              disabled={seconds !== 0}>
              <Text style={style.resendText}>
                Did not receive any code?{' '}
                {seconds > 0 ? (
                  <Text style={style.resendSpan}>
                    Resend in {formatTime(seconds)}
                  </Text>
                ) : (
                  <Text style={style.resendSpan}>Resend</Text>
                )}
              </Text>
            </TouchableOpacity>
            <SizedBox height={24} />
            <Button
              title="Confirm"
              loading={mailLoad || phoneLoad}
              onPress={() => {
                if (mode === 'mail') {
                  const post = {
                    otp: pin,
                    email: data?.email,
                  };
                  verifyOtpEmail(post);
                } else {
                  const post = {
                    otp: pin,
                    email: data?.phoneNumber,
                  };
                  verifyOtpPhone(post);
                }
              }}
            />
            <SizedBox height={20} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
