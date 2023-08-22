/* eslint-disable react-native/no-inline-styles */
import {Button, DateSelect, SizedBox, SvgIcon, TextInput} from '@components';
import {RF} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {useSignUpMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {family} from '@theme';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import PhoneInput from 'react-native-phone-number-input';
import {useAppDispatch} from 'store';
import * as yup from 'yup';
import style from './styles';

const {width} = Dimensions.get('window');

export const CreateProfile: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const init = route?.params?.initValues;
  const phoneInput = useRef<PhoneInput>(null);
  const formRef = useRef<any>();
  const [signUp, {data, isLoading, isSuccess, isError, error: logErr}] =
    useSignUpMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data));
      navigation.reset({
        index: 0,
        routes: [{name: 'FinishProfile', params: {}}],
      });
    }
    if (isError && 'status' in logErr!) {
      if (logErr?.data?.message?.length) {
        flash.danger({description: logErr?.data?.message});
      }
    }
  }, [data, logErr, isError, isLoading, isSuccess, navigation, dispatch]);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const signInSchema = yup.object().shape({
    first_name: yup.string().required('Field cannot be empty'),
    last_name: yup.string().required('Field cannot be empty'),
    username: yup.string().required('Field cannot be empty'),
    phone_number: yup.string().required('Field cannot be empty'),
    date_of_birth: yup
      .string()
      .required('Start Date field should not be empty'),
  });

  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    date_of_birth: '',
    phone_number: '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <View style={style.upperBox}>
            <Text style={style.welcomeTxt}>Tell Us More About You</Text>
            <SizedBox height={12} />
            <Text style={style.welcomeSub}>
              Please use your name as it appears on your ID.
            </Text>
          </View>
          <View style={{width: width * 0.85, alignSelf: 'center'}}>
            <Formik
              initialValues={initialValues}
              onSubmit={values => {
                const postData = {...values, ...init};
                signUp(postData);
              }}
              innerRef={formRef}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={signInSchema}>
              {({errors, setFieldValue, values}) => (
                <View>
                  <TextInput
                    placeholder="Legal First name"
                    label="Legal First Name"
                    name="first_name"
                    // @ts-ignore
                    error={errors?.first_name}
                    autoCorrect={false}
                    onChangeText={value => setFieldValue('first_name', value)}
                    // @ts-ignore
                    value={values.first_name}
                  />
                  <TextInput
                    placeholder="Legal Last name"
                    label="Legal Last Name"
                    name="last_name"
                    // @ts-ignore
                    error={errors?.last_name}
                    // @ts-ignore
                    value={values.last_name}
                    autoCorrect={false}
                    onChangeText={value => setFieldValue('last_name', value)}
                  />
                  <TextInput
                    placeholder="Nick name"
                    label="Nick Name"
                    name="username"
                    // @ts-ignore
                    error={errors?.username}
                    // @ts-ignore
                    value={values.username}
                    autoCorrect={false}
                    onChangeText={value => setFieldValue('username', value)}
                  />
                  {/* <Text style={style.phoneLabel}>
                      Enter your Phone Number
                    </Text> */}
                  <PhoneInput
                    ref={phoneInput}
                    // defaultValue={value}
                    defaultCode="NG"
                    onChangeFormattedText={text => {
                      setFieldValue('phone_number', text);
                    }}
                    flagButtonStyle={style.flagView}
                    containerStyle={style.containerView}
                    countryPickerButtonStyle={style.pickerCaret}
                    textContainerStyle={style.textContain}
                    placeholder={'---'}
                    codeTextStyle={{
                      color: '#292F33',
                      fontSize: RF(16),
                      fontFamily: family.Bold,
                    }}
                    layout="first"
                    renderDropdownImage={<SvgIcon name="dropdown" size={24} />}
                    textInputStyle={style.textStyle}
                  />
                  {/* @ts-ignore */}
                  {errors?.number?.length ? (
                    <Text style={[style.error]}>
                      {/* @ts-ignore */}
                      {errors?.number}
                    </Text>
                  ) : null}
                  <SizedBox height={18} />
                  <DateSelect
                    placeholder="Date of Birth"
                    value={values.date_of_birth}
                    // label="Date"
                    onSubmit={(value: any) =>
                      setFieldValue('date_of_birth', value)
                    }
                    error={errors.date_of_birth}
                  />
                  <SizedBox height={20} />
                  <Button
                    title="Continue"
                    loading={isLoading}
                    onPress={handleSubmit}
                  />
                  <SizedBox height={24} />
                  <TouchableOpacity style={style.ctaDown}>
                    <Text style={style.existText}>
                      By clicking continue, you agree to our{' '}
                      <Text style={style.existSpanDark}>Terms of Use</Text> and{' '}
                      <Text style={style.existSpanDark}>Privacy Policy.</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
