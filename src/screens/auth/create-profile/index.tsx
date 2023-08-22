/* eslint-disable react-native/no-inline-styles */
import {Button, DateSelect, SizedBox, SvgIcon, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useBioMutation} from '@services/mutationApi';
import {setUser} from '@slices/user';
import {formatPhoneNumber} from '@utils';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import * as yup from 'yup';
import style from './styles';

const {width} = Dimensions.get('window');

export const CreateProfile: FC = ({navigation, route}: any) => {
  const dispatch = useAppDispatch();
  const {auth} = useAppSelector<any>((store: RootState) => store);
  const {oauth, mode, authData} = route?.params;
  const formRef = useRef<any>();
  console.log(route?.params);
  const [pass, setPass] = useState('');

  console.log(pass?.length, 'check');

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
    setPass(value);
  };

  const getColor = requirementMet => {
    return requirementMet ? '#1D8A47' : '#F01515';
  };

  const [bio, {data, isLoading, isSuccess, isError, error, reset}] =
    useBioMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setUser(data));
      flash.success({
        description: 'Account created successfully, please login to continue',
      });
      navigation.navigate('Login');
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error, isError, isSuccess, navigation, reset]);
  const signInSchema = yup.object().shape({
    firstName: yup.string().required('Field cannot be empty'),
    lastName: yup.string().required('Field cannot be empty'),
    email: yup
      .string()
      .email('Invalid email')
      .required('Field cannot be empty'),
    phoneNumber: yup.string().required('Field cannot be empty'),
    password: yup
      .string()
      .required('Please enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    dateOfBirth: yup.string().required('Start Date field should not be empty'),
  });

  const initialValues = {
    modeOfSignUp: auth?.userAccount?.modeOfSignUp || mode,
    firstName: oauth?.givenName || '',
    lastName: oauth?.familyName || '',
    password: '',
    email: auth?.userAccount?.email || oauth?.email || authData?.email || '',
    dateOfBirth: '',
    phoneNumber:
      formatPhoneNumber(auth?.userAccount?.phoneNumber) ||
      formatPhoneNumber(authData?.phoneNumber) ||
      '',
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <SvgIcon
            name="back"
            size={24}
            onPress={() => navigation.goBack()}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <View style={style.upperBox}>
            <Text style={style.welcomeTxt}>Add info</Text>
            <SizedBox height={20} />
            <View style={{width: width * 0.8}}>
              <Formik
                initialValues={initialValues}
                onSubmit={values => {
                  const postData = {...values};
                  postData.phoneNumber =
                    '+234' + values.phoneNumber.substring(1);
                  console.log(postData);
                  bio(postData);
                }}
                innerRef={formRef}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={signInSchema}>
                {({errors, setFieldValue, values}) => (
                  <View>
                    <TextInput
                      placeholder="Email Address"
                      label="Email Address"
                      name="email"
                      // @ts-ignore
                      error={errors?.email}
                      autoCorrect={false}
                      onChangeText={value => setFieldValue('email', value)}
                      iconName1="email"
                      value={values?.email}
                      // @ts-ignore
                      editable={errors?.email}
                    />
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
                    <TextInput
                      placeholder="First name"
                      label="First Name"
                      name="firstName"
                      // @ts-ignore
                      error={errors?.firstName}
                      autoCorrect={false}
                      onChangeText={value => setFieldValue('firstName', value)}
                      // @ts-ignore
                      value={values.firstName}
                      iconName1="name-card"
                    />
                    <TextInput
                      placeholder="Last name"
                      label="Last Name"
                      name="lastName"
                      // @ts-ignore
                      error={errors?.lastName}
                      // @ts-ignore
                      value={values.lastName}
                      autoCorrect={false}
                      onChangeText={value => setFieldValue('lastName', value)}
                      iconName1="name-card"
                    />
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
                        handlePasswordChange(value);
                      }}
                    />
                    {pass?.length === 0 ? (
                      <Text style={style.passInfo}>
                        Your password should be at least 8 characters containing
                        a small letter, a capital letter, a number and a symbol.
                      </Text>
                    ) : !allRequirementsMet ? (
                      <View style={style.requirementsContainer}>
                        <Text style={[style.requirement, {color: '#F01515'}]}>
                          Your password needs to:
                        </Text>
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
                            be at least 8 characters long
                          </Text>
                        </View>

                        <View style={style.checkGrid}>
                          {requirementsMet.uppercase &&
                          requirementsMet.lowercase ? (
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
                            include both lower and upper case characters
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
                            include at least one number and a symbol
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    <SizedBox height={18} />
                    <DateSelect
                      placeholder="Birthday"
                      value={values.dateOfBirth}
                      label="Birthday"
                      onSubmit={(value: any) =>
                        setFieldValue('dateOfBirth', value)
                      }
                      error={errors.dateOfBirth}
                    />
                    <Text style={style.dobText}>
                      So we know when to celebrate. No one else can see it.
                    </Text>
                  </View>
                )}
              </Formik>
            </View>
            <SizedBox height={20} />
            <Button
              title="Create Account"
              loading={isLoading}
              onPress={handleSubmit}
            />
            <SizedBox height={24} />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('Login')}>
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
            <SizedBox height={15} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
