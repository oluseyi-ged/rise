/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useLoginMutation} from '@services/mutationApi';
import {setLogged} from '@slices/logged';
import {setProfile} from '@slices/profile';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import * as yup from 'yup';
import style from './styles';

export const Signin: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const {mode} = route?.params;
  const formRef = useRef<any>();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [login, {data, isLoading, isSuccess, isError, error, reset}] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
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
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      if (error?.data?.message === 'Account setup not completed') {
        flash.danger({
          //@ts-ignore
          description: `${error?.data?.message}. Please proceed to sign up again.`,
        });
        //@ts-ignore
      } else if (error?.data?.message === 'Email not verified') {
        flash.danger({
          //@ts-ignore
          description: `${error?.data?.message}. Please proceed to sign up again.`,
        });
      } else {
        //@ts-ignore
        flash.danger({description: error?.data?.message});
      }
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess, navigation, reset]);
  const initSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Please enter your password'),
  });
  const phSchema = yup.object().shape({
    phoneNumber: yup.string().required('Phone is required'),
    password: yup.string().required('Please enter your password'),
  });

  const initialValues = {
    modeOfSignIn: mode === 'mail' ? 'EMAIL' : 'PHONE_NUMBER',
    email: '',
    password: '',
  };

  const phoneVal = {
    modeOfSignIn: mode !== 'mail' ? 'PHONE_NUMBER' : 'EMAIL',
    phoneNumber: '',
    password: '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <SvgIcon
            name="back"
            size={24}
            onPress={() => navigation.navigate('Login')}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <View>
            <View>
              <View style={style.upperBox}>
                <Text style={[style.existSpan, {textDecorationLine: 'none'}]}>
                  Welcome back!
                </Text>
                <SizedBox height={11} />
                <Text
                  style={[
                    style.existText,
                    {textAlign: 'left', alignSelf: 'flex-start'},
                  ]}>
                  Login now and get access to thousands of home cooked meals on
                  <Text
                    style={[style.existSpanDark, {textDecorationLine: 'none'}]}>
                    {' '}
                    Cheffie.App!
                  </Text>
                </Text>
              </View>
              <SizedBox height={26} />
              <Formik
                initialValues={mode === 'mail' ? initialValues : phoneVal}
                onSubmit={values => {
                  const postData = {...values};
                  if (mode === 'mail') {
                    login(postData);
                  } else {
                    //@ts-ignore
                    postData.phoneNumber =
                      //@ts-ignore
                      '+234' + values.phoneNumber.substring(1);
                    login(postData);
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
                      />
                    )}
                    <TextInput
                      iconName1="lock"
                      placeholder="•••••••••"
                      label="Password"
                      type="password"
                      name="password"
                      autoCorrect={false}
                      error={errors?.password}
                      onChangeText={value => {
                        setFieldValue('password', value);
                      }}
                    />
                    <SizedBox height={15} />
                    <Button
                      title="Continue"
                      loading={isLoading}
                      onPress={handleSubmit}
                      // onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                )}
              </Formik>
              <View>
                <SizedBox height={22} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Describe')}>
                  <Text style={style.existText}>
                    Don’t have an account?{' '}
                    <Text style={style.existSpan}>Register</Text>
                  </Text>
                </TouchableOpacity>
                <SizedBox height={20} />
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
