import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {Formik} from 'formik';
import React, {FC, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import style from './styles';

export const Signup: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const [pass, setPass] = useState('');

  console.log(pass?.length, 'check');

  const [requirementsMet, setRequirementsMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialCharacter: false,
  });

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
    setPass(value);
  };

  const getColor = requirementMet => {
    return requirementMet ? '#000' : '#000';
  };

  const initSchema = yup.object().shape({
    email_address: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
  });

  const initialValues = {
    email_address: '',
    password: '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <View style={style.upperBox}>
            <Text style={style.welcomeTxt}>Create an account</Text>
            <SizedBox height={12} />
            <Text style={style.welcomeSub}>
              Start building your dollar-denominated investment portfolio
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: any) => {
              console.log(values);
              navigation.navigate('CreateProfile', {initValues: values});
            }}
            innerRef={formRef}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values}) => (
              <View>
                <TextInput
                  placeholder="Email Address"
                  label="Email address"
                  name="email_address"
                  autoCorrect={false}
                  // @ts-ignore
                  error={errors?.email_address}
                  onChangeText={value => setFieldValue('email_address', value)}
                  // @ts-ignore
                  value={values.email_address}
                />
                <TextInput
                  placeholder="Password"
                  label="Password"
                  type="password"
                  name="password"
                  autoCorrect={false}
                  // @ts-ignore
                  error={errors?.password}
                  onChangeText={value => {
                    setFieldValue('password', value);
                    handlePasswordChange(value);
                  }}
                />
                <View style={style.requirementsContainer}>
                  <View style={style.checkGrid}>
                    {requirementsMet.length ? (
                      <SvgIcon name="tick" size={20} />
                    ) : (
                      <SvgIcon name="miss" size={20} />
                    )}
                    <Text
                      style={[
                        style.requirement,
                        {color: getColor(requirementsMet.length)},
                      ]}>
                      Minimum of 8 characters
                    </Text>
                  </View>

                  <View style={style.checkGrid}>
                    {requirementsMet.uppercase && requirementsMet.lowercase ? (
                      <SvgIcon name="tick" size={20} />
                    ) : (
                      <SvgIcon name="miss" size={20} />
                    )}
                    <Text
                      style={[
                        style.requirement,
                        {
                          color: getColor(
                            requirementsMet.uppercase &&
                              requirementsMet.lowercase,
                          ),
                        },
                      ]}>
                      One UPPERCASE character
                    </Text>
                  </View>

                  <View style={style.checkGrid}>
                    {requirementsMet.specialCharacter &&
                    requirementsMet.number ? (
                      <SvgIcon name="tick" size={20} />
                    ) : (
                      <SvgIcon name="miss" size={20} />
                    )}
                    <Text
                      style={[
                        style.requirement,
                        {
                          color: getColor(
                            requirementsMet.specialCharacter &&
                              requirementsMet.number,
                          ),
                        },
                      ]}>
                      One unique character (e.g: !@#$%^&*?)
                    </Text>
                  </View>
                </View>
                <SizedBox height={5} />
                <Button
                  title="Sign Up"
                  // onPress={() => navigation.navigate('CreateProfile')}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
