import {Button, SizedBox, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useLoginMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {setLogged} from '@slices/logged';
import {Formik} from 'formik';
import React, {FC, useEffect, useRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import * as yup from 'yup';
import style from './styles';

export const Login: FC = ({navigation}: any) => {
  const formRef = useRef<any>();
  const dispatch = useAppDispatch();

  const [logIn, {data, isLoading, isSuccess, isError, error: logErr}] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuth(data));
      dispatch(setLogged(true));
      navigation.reset({
        index: 0,
        routes: [{name: 'Home', params: {}}],
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

  const initSchema = yup.object().shape({
    email_address: yup
      .string()
      .email('Invalid email')
      .required('Email is required'),
    password: yup.string().required('Please enter your password'),
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
            <Text style={style.welcomeTxt}>Welcome back</Text>
            <SizedBox height={12} />
            <Text style={style.welcomeSub}>
              Let’s get you logged in to get back to building your
              dollar-denominated investment portfolio.
            </Text>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values: any) => {
              console.log(values);
              logIn(values);
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
                  }}
                />
                <SizedBox height={5} />
                <Button
                  title="Sign In"
                  onPress={handleSubmit}
                  loading={isLoading}
                />
                <SizedBox height={16} />
                <TouchableOpacity style={style.forgotCta}>
                  <Text style={style.forgotText}>I forgot my password</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={style.newText}>
          Don't have an account? <Text style={style.newSpan}> Sign up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
