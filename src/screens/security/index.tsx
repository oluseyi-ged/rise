import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {useResetPasswordMutation} from '@services/mutationApi';
import {useGetProfileQuery} from '@services/queryApi';
import {Formik} from 'formik';
import {default as React, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';

export const Security = ({navigation}: any) => {
  const {data: userData} = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const [resetPassword, {isLoading, isSuccess, isError, error}] =
    useResetPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      flash.success({description: 'Password updated successfully'});
      navigation.goBack();
    }
    if (isError) {
      // @ts-ignore
      flash.danger({description: error?.data?.message});
    }
  }, [error, isError, isSuccess, navigation]);

  const formRef = useRef<any>();

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const initSchema = yup.object().shape({
    oldPassword: yup.string().required('Field cannot be empty'),
    password: yup
      .string()
      .required('Field cannot be empty')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
      ),
    confirmPassword: yup
      .string()
      .required('Field should not be empty') // @ts-ignore
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const initialValues = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  console.log(userData);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.header}>
        <SvgIcon name="back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Password & Security</Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <SizedBox height={20} />
        <View style={styles.paddingWrap}>
          <View style={styles.pageHead}>
            <View style={styles.headLeft}>
              <View>
                <Text style={styles.userName}>Update your password</Text>
                <SizedBox height={12} />
                <Text style={styles.userMail}>
                  Remember, your password is a key to your account's security.
                  Keep it safe and don't share it with anyone.
                </Text>
              </View>
            </View>
          </View>
          <SizedBox height={28} />

          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              console.log(values);
              resetPassword({
                oldPassword: values?.oldPassword,
                password: values?.password,
              });
              // bio(postData);
            }}
            innerRef={formRef}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue}) => (
              <View style={{gap: HDP(10)}}>
                <TextInput
                  iconName1="lock"
                  placeholder="Current Password"
                  label="Current Password"
                  type="password"
                  name="oldPassword"
                  autoCorrect={false}
                  error={errors?.oldPassword}
                  onChangeText={value => {
                    setFieldValue('oldPassword', value);
                  }}
                />
                <TextInput
                  iconName1="lock"
                  placeholder="New Password"
                  label="New Password"
                  type="password"
                  name="password"
                  autoCorrect={false}
                  error={errors?.password}
                  onChangeText={value => {
                    setFieldValue('password', value);
                  }}
                />
                <TextInput
                  iconName1="lock"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  autoCorrect={false}
                  error={errors?.confirmPassword}
                  onChangeText={value => {
                    setFieldValue('confirmPassword', value);
                  }}
                />
              </View>
            )}
          </Formik>
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
      <View style={styles.floatCta}>
        <Button title="Save" onPress={handleSubmit} loading={isLoading} />
        <SizedBox height={10} />
      </View>
    </SafeAreaView>
  );
};
