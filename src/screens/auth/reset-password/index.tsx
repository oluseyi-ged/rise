import {Button, SizedBox, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useResetPasswordMutation} from '@services/mutationApi';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import * as yup from 'yup';
import style from './styles';

export const ResetPassword: FC = ({navigation, route}: any) => {
  const countryCode = '+234';
  const formRef = useRef<any>();
  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

  const allRequirementsMet = Object.values(requirementsMet).every(
    value => value === true,
  );

  const checkPasswordStrength = value => {
    const passwordStrengthSchema = yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Character',
      );

    const newRequirements = {
      length: value?.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialCharacter: /[!@#\$%\^&\*]/.test(value),
    };

    passwordStrengthSchema
      .validate(value)
      .then(() => {
        setRequirementsMet(newRequirements);
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error: any) => {
        setRequirementsMet(newRequirements);
      });
  };

  const handlePasswordChange = value => {
    checkPasswordStrength(value);
  };

  const getColor = requirementMet => {
    return requirementMet ? 'green' : 'red';
  };
  const initSchema = yup.object().shape({
    phone: yup.string().required('Phone number field should not be empty'),
    otp: yup.string().required('OTP field should not be empty'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    confirm_password: yup
      .string()
      .required('Please confirm password')
      // @ts-ignore
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const initialValues = {
    phone: route?.params?.value,
    otp: '',
    password: '',
    confirm_password: '',
  };
  const [resetPassword, {data, isLoading, isSuccess, isError, error, reset}] =
    useResetPasswordMutation();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.navigate('Login');
      flash.success({description: 'Password Reset Successfully'});
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
  }, [error, isError, isSuccess, reset, data, navigation]);

  return (
    <SafeAreaView style={style.pageWrap}>
      <ScrollView style={style.container}>
        <SizedBox height={50} />
        <Text style={style.pageLabel}>Reset Password</Text>
        <Text style={style.notify}>
          Please fill form below to reset password.
        </Text>
        <SizedBox height={30} />
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={values => {
            const logData = {
              phone: values?.phone?.startsWith('+')
                ? values?.phone
                : countryCode + values.phone.substring(1),
              otp: values?.otp,
              password: values?.password,
            };
            resetPassword(logData);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={initSchema}>
          {({errors, setFieldValue, values}) => (
            <>
              <TextInput
                placeholder="08136292202"
                iconName1="flag"
                name="phone"
                // @ts-ignore
                error={errors?.phone}
                autoCorrect={false}
                onChangeText={value => setFieldValue('phone', value)}
                maxLength={11}
                keyboardType="number-pad"
                value={values.phone}
                label="Phone Number"
                editable={false}
              />
              <SizedBox height={24} />
              <TextInput
                placeholder="Enter OTP here..."
                name="otp"
                // @ts-ignore
                error={errors?.otp}
                autoCorrect={false}
                onChangeText={value => setFieldValue('otp', value)}
                maxLength={11}
                keyboardType="number-pad"
                value={values.otp}
                label="OTP"
              />
              <SizedBox height={24} />
              <TextInput
                placeholder="•••••••••••••••••••••"
                label="Password"
                type="password"
                name="password"
                autoCorrect={false}
                error={errors?.password}
                onChangeText={value => {
                  setFieldValue('password', value);
                  handlePasswordChange(value);
                }}
              />
              {!allRequirementsMet ? (
                <View style={style.requirementsContainer}>
                  <Text
                    style={[
                      style.requirement,
                      {color: getColor(requirementsMet.length)},
                    ]}>
                    {requirementsMet.length ? '👍🏼' : '👎🏼'} Must Contain 8
                    Characters
                  </Text>
                  <Text
                    style={[
                      style.requirement,
                      {color: getColor(requirementsMet.uppercase)},
                    ]}>
                    {requirementsMet.uppercase ? '👍🏼' : '👎🏼'} One Uppercase
                  </Text>
                  <Text
                    style={[
                      style.requirement,
                      {color: getColor(requirementsMet.lowercase)},
                    ]}>
                    {requirementsMet.lowercase ? '👍🏼' : '👎🏼'} One Lowercase
                  </Text>
                  <Text
                    style={[
                      style.requirement,
                      {color: getColor(requirementsMet.number)},
                    ]}>
                    {requirementsMet.number ? '👍🏼' : '👎🏼'} One Number
                  </Text>
                  <Text
                    style={[
                      style.requirement,
                      {color: getColor(requirementsMet.specialCharacter)},
                    ]}>
                    {requirementsMet.specialCharacter ? '👍🏼' : '👎🏼'} One Special
                    Character
                  </Text>
                </View>
              ) : null}
              <SizedBox height={24} />
              <TextInput
                placeholder="•••••••••••••••••••••"
                label="Confirm Password"
                type="password"
                autoCorrect={false}
                name="confirm_password"
                error={errors?.confirm_password}
                onChangeText={value => setFieldValue('confirm_password', value)}
              />
            </>
          )}
        </Formik>
      </ScrollView>

      <View style={style.btnWrap}>
        <Button title="Continue" onPress={handleSubmit} loading={isLoading} />
      </View>
    </SafeAreaView>
  );
};
