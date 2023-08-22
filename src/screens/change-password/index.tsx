/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useChangePasswordMutation} from '@services/mutationApi';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';

export const ChangePassword = ({navigation}) => {
  const formRef = useRef<any>();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

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

  const [changePassword, {data, isLoading, isSuccess, isError, error, reset}] =
    useChangePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      flash.success({description: 'Password changed successfully'});
      navigation.goBack();
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
  }, [data, error, isError, isSuccess, navigation, reset]);

  const changeSchema = yup.object().shape({
    currentPassword: yup.string().required('Field is required'),
    confirmPassword: yup
      .string()
      .required('Please confirm password')
      // @ts-ignore
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
    newPassword: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const initialValues = {
    newPassword: '',
    currentPassword: '',
    confirmPassword: '',
  };

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
            <Text style={styles.headerLabel}>Change Password</Text>
            <Text style={styles.headerSub}>
              Please make sure you are familiar with the password you are using.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values);
            const post = {
              currentPassword: values?.currentPassword,
              newPassword: values?.newPassword,
            };
            changePassword(post);
          }}
          innerRef={formRef}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={changeSchema}>
          {({errors, setFieldValue}) => (
            <View>
              <TextInput
                label="Current Password"
                placeholder="********"
                type="password"
                name="currentPassword"
                error={errors?.currentPassword}
                autoCorrect={false}
                onChangeText={value => setFieldValue('currentPassword', value)}
              />
              <SizedBox height={14} />
              <TextInput
                label="New Password"
                placeholder="********"
                type="password"
                name="newPassword"
                autoCorrect={false}
                error={errors?.newPassword}
                onChangeText={value => {
                  setFieldValue('newPassword', value);
                  handlePasswordChange(value);
                }}
              />
              {!allRequirementsMet ? (
                <View style={styles.requirementsContainer}>
                  <Text
                    style={[
                      styles.requirement,
                      {color: getColor(requirementsMet.length)},
                    ]}>
                    {requirementsMet.length ? '👍🏼' : '👎🏼'} Must Contain 8
                    Characters
                  </Text>
                  <Text
                    style={[
                      styles.requirement,
                      {color: getColor(requirementsMet.uppercase)},
                    ]}>
                    {requirementsMet.uppercase ? '👍🏼' : '👎🏼'} One Uppercase
                  </Text>
                  <Text
                    style={[
                      styles.requirement,
                      {color: getColor(requirementsMet.lowercase)},
                    ]}>
                    {requirementsMet.lowercase ? '👍🏼' : '👎🏼'} One Lowercase
                  </Text>
                  <Text
                    style={[
                      styles.requirement,
                      {color: getColor(requirementsMet.number)},
                    ]}>
                    {requirementsMet.number ? '👍🏼' : '👎🏼'} One Number
                  </Text>
                  <Text
                    style={[
                      styles.requirement,
                      {color: getColor(requirementsMet.specialCharacter)},
                    ]}>
                    {requirementsMet.specialCharacter ? '👍🏼' : '👎🏼'} One Special
                    Character
                  </Text>
                </View>
              ) : null}
              <SizedBox height={14} />
              <TextInput
                label="Confirm Password"
                placeholder="********"
                type="password"
                autoCorrect={false}
                name="confirmPassword"
                error={errors?.confirmPassword}
                onChangeText={value => setFieldValue('confirmPassword', value)}
              />
              <SizedBox height={41} />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button title="Confirm" onPress={handleSubmit} loading={isLoading} />
      </View>
    </SafeAreaView>
  );
};
