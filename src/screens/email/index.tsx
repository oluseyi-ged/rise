/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import {useGetProfileQuery} from '@services/queryApi';
import {Formik} from 'formik';
import {default as React, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';

export const Email = ({navigation}: any) => {
  const {data: userData} = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const formRef = useRef<any>();

  const initSchema = yup.object().shape({
    email: yup.string().required('Field cannot be empty'),
    confirmEmail: yup.string().required('Field cannot be empty'),
    password: yup.string().required('Field should not be empty'),
  });

  const initialValues = {
    email: '',
    confirmEmail: '',
    password: '',
  };

  console.log(userData);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.header}>
        <SvgIcon name="back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Email Settings</Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <SizedBox height={20} />
        <View style={styles.paddingWrap}>
          <View style={styles.pageHead}>
            <View style={styles.headLeft}>
              <View>
                <Text style={styles.userName}>
                  Need to change your email address?
                </Text>
                <SizedBox height={12} />
                <Text style={styles.userMail}>
                  No problem, type a new email address below. To keep your
                  account secure, we’ll need you to enter your password to
                  confirm it’s really you. {'\n'}
                  You’ll also need to confirm your new email address before the
                  change is applied.
                </Text>
              </View>
            </View>
          </View>
          <SizedBox height={55} />

          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              console.log(values);
              // bio(postData);
            }}
            innerRef={formRef}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values}) => (
              <View style={{gap: HDP(10)}}>
                <TextInput
                  placeholder="New Email Address"
                  label="New Email Address"
                  name="email"
                  // @ts-ignore
                  error={errors?.email}
                  autoCorrect={false}
                  onChangeText={value => setFieldValue('email', value)}
                  // @ts-ignore
                  value={values.email}
                  iconName1="email"
                  labelStyle={{color: '#263238'}}
                />
                <TextInput
                  placeholder="Confirm new email"
                  label="Confirm new email"
                  name="confirmEmail"
                  // @ts-ignore
                  error={errors?.confirmEmail}
                  // @ts-ignore
                  value={values.confirmEmail}
                  autoCorrect={false}
                  onChangeText={value => setFieldValue('confirmEmail', value)}
                  iconName1="email"
                  labelStyle={{color: '#263238'}}
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
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
      <View style={styles.floatCta}>
        <Button title="Save" />
        <SizedBox height={10} />
      </View>
    </SafeAreaView>
  );
};
