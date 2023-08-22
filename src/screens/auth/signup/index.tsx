/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  useEmailSignupMutation,
  useOauthMutation,
  usePhoneSignupMutation,
} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {setLogged} from '@slices/logged';
import {setProfile} from '@slices/profile';
import {transformText} from '@utils';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import * as yup from 'yup';
import style from './styles';

export const Signup: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState(route?.params?.mode);
  const [oData, setOData] = useState<any>({});
  const countryCode = '+234';
  const [gToken, setGToken] = useState<any>('');
  const formRef = useRef<any>();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [oauth, {data, isLoading, isSuccess, isError, error, reset}] =
    useOauthMutation();

  const [
    emailSignup,
    {
      data: mailData,
      isLoading: mailLoad,
      isSuccess: mailTrue,
      isError: mailFalse,
      error: mailErr,
      reset: mailReset,
    },
  ] = useEmailSignupMutation();

  const [
    phoneSignup,
    {
      data: phoneData,
      isLoading: phoneLoad,
      isSuccess: phoneTrue,
      isError: phoneFalse,
      error: phoneErr,
      reset: phoneReset,
    },
  ] = usePhoneSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data?.userAccount?.accountSetupStage === 'SETUP_COMPLETED') {
        dispatch(setProfile(data));
        dispatch(setLogged(true));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      } else {
        console.log(data, oData);
        dispatch(setAuth(data));
        navigation.navigate('CreateProfile', {data: data, oauth: oData});
      }
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: mailErr?.data?.message || phoneErr?.data?.message,
      });
      reset();
    }
  }, [
    data,
    dispatch,
    error,
    isError,
    isSuccess,
    mailErr,
    navigation,
    oData,
    phoneErr,
    reset,
  ]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        // '586721565558-sp80bmg69pihmpn9rumv58v1qahr6bd5.apps.googleusercontent.com',
        '586721565558-b9vkec3tbfmsaba0rfgcr06a99dl6rco.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    if (gToken?.length) {
      auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(token => {
            console.log('first', token);
            oauth({
              idToken: token,
            });
          });
        } else {
          console.log('');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gToken]);

  const GoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        const googleCredential = auth.GoogleAuthProvider.credential(
          result?.idToken,
        );
        setOData(result?.user);
        setGToken('trigger');
        return auth().signInWithCredential(googleCredential);
      });
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('User cancelled the login flow !');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (mailTrue || phoneTrue) {
      console.log(mailData || phoneData);
      if (
        mailData?.accountSetupStage === 'SETUP_COMPLETED' ||
        phoneData?.accountSetupStage === 'SETUP_COMPLETED'
      ) {
        flash.danger({
          //@ts-ignore
          description: `${
            transformText(mailData?.modeOfSignUp) ||
            transformText(phoneData?.modeOfSignUp)
          } already used by an existing account`,
        });
      } else {
        navigation.navigate('Otp', {mode, data: mailData || phoneData});
      }
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
  const initSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });
  const phSchema = yup.object().shape({
    phoneNumber: yup.string().required('Phone is required'),
  });

  const initialValues = {
    email: '',
  };

  const phoneVal = {
    phoneNumber: '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <View>
            <SvgIcon
              name="back"
              size={24}
              onPress={() => navigation.navigate('Describe')}
              containerStyle={{alignSelf: 'flex-start'}}
            />
            <SizedBox height={39} />
            <View>
              <View style={style.upperBox}>
                <Text style={style.welcomeTxt}>Welcome to</Text>
                <SizedBox height={12} />
                <SvgIcon
                  name="logo"
                  size={200}
                  containerStyle={{height: HDP(52)}}
                />
              </View>
              <SizedBox height={166} />
              <Formik
                initialValues={mode === 'mail' ? initialValues : phoneVal}
                onSubmit={(values: any) => {
                  const postData = values;
                  if (mode === 'mail') {
                    emailSignup(postData);
                  } else {
                    const phone = countryCode + values.phoneNumber.substring(1);
                    phoneSignup({
                      phoneNumber: phone,
                    });
                  }
                }}
                innerRef={formRef}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={mode === 'mail' ? initSchema : phSchema}>
                {({errors, setFieldValue, values}) => (
                  <View>
                    {mode === 'mail' ? (
                      <TextInput
                        iconName1="email"
                        placeholder="Email Address"
                        label="Email address"
                        name="email"
                        autoCorrect={false}
                        // @ts-ignore
                        error={errors?.email}
                        onChangeText={value => setFieldValue('email', value)}
                        // @ts-ignore
                        value={values.email}
                      />
                    ) : (
                      <TextInput
                        iconName1="flag"
                        placeholder="Phone Number"
                        label="Phone number"
                        name="phoneNumber"
                        keyboardType="number-pad"
                        autoCorrect={false}
                        // @ts-ignore
                        error={errors?.phoneNumber}
                        onChangeText={value =>
                          setFieldValue('phoneNumber', value)
                        }
                        // @ts-ignore
                        value={values.phoneNumber}
                        maxLength={11}
                      />
                    )}
                    <SizedBox height={5} />
                    <Button
                      title="Continue"
                      loading={mailLoad || phoneLoad}
                      onPress={handleSubmit}
                    />
                  </View>
                )}
              </Formik>
              <View>
                <Text style={style.orText}>or</Text>
                <SizedBox height={16} />
                <Button
                  iconName="google"
                  bordered
                  title="Continue with Google"
                  onPress={GoogleSignUp}
                  loading={isLoading}
                />
                <SizedBox height={16} />
                {mode !== 'mail' ? (
                  <Button
                    iconName="email"
                    bordered
                    title="Continue with Email"
                    onPress={() => setMode('mail')}
                  />
                ) : (
                  <Button
                    iconName="phone"
                    bordered
                    title="Continue with Phone Number"
                    onPress={() => setMode('phone')}
                  />
                )}
                <SizedBox height={24} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={style.existText}>
                    Already have an account?{' '}
                    <Text style={style.existSpan}>Login</Text>
                  </Text>
                </TouchableOpacity>
                <SizedBox height={24} />
                <TouchableOpacity>
                  <Text style={style.existText}>
                    By continuing, I agree to the and{' '}
                    <Text style={style.existSpanDark}>Terms of Use</Text> and{' '}
                    <Text style={style.existSpanDark}>Privacy Policy.</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
