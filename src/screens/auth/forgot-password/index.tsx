import {Button, SizedBox, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useForgotPasswordMutation} from '@services/mutationApi';

import {Formik} from 'formik';
import React, {FC, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import * as yup from 'yup';
import style from './styles';

export const ForgotPassword: FC = ({navigation}: any) => {
  const countryCode = '+234';
  const formRef = useRef<any>();
  const [phone, setPhone] = useState('');
  const phoneSchema = yup.object().shape({
    phone: yup.string().required('Phone number field should not be empty'),
  });
  const initialValues = {
    phone: '',
  };
  const [forgotPassword, {data, isLoading, isSuccess, isError, error, reset}] =
    useForgotPasswordMutation();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      navigation.navigate('ResetPassword', {value: phone});
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess, reset, data]);

  return (
    <SafeAreaView style={style.pageWrap}>
      <ScrollView style={style.container}>
        <SizedBox height={50} />
        <Text style={style.pageLabel}>Forgot Password</Text>
        <Text style={style.notify}>
          Please enter your resgistered phone number to receive an OTP.
        </Text>
        <SizedBox height={50} />
        <View style={style.labelBorder}>
          <Text style={style.phoneText}>Phone Number</Text>
        </View>
        <SizedBox height={30} />
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={values => {
            const logData = {
              phone: values?.phone?.startsWith('+')
                ? values?.phone
                : countryCode + values.phone.substring(1),
            };
            setPhone(logData?.phone);
            forgotPassword(logData);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={phoneSchema}>
          {({errors, setFieldValue, values}) => (
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
            />
          )}
        </Formik>
      </ScrollView>

      <View style={style.btnWrap}>
        <Button title="Continue" onPress={handleSubmit} loading={isLoading} />
      </View>
    </SafeAreaView>
  );
};
