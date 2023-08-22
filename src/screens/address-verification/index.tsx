/* eslint-disable react-native/no-inline-styles */
import {Button, Select, SizedBox, SvgIcon, TextInput} from '@components';
import {extractSelect} from '@helpers';
import {useVerifyAddyMutation} from '@services/mutationApi';
import {locationData} from '@utils/locationData';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';
import {flash} from '@helpers/FlashMessageHelpers';

export const AddressVerification = ({navigation}) => {
  const formRef = useRef<any>();
  const [state, setState] = useState('');
  const [lgaArr, setLgaArr] = useState([]);
  const [verifyAddy, {data, isLoading, error, isError, isSuccess, reset}] =
    useVerifyAddyMutation();

  console.log(state);
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  useEffect(() => {
    setLgaArr(
      extractSelect(
        locationData?.find(item => item.code === state)?.localGoverment,
        'lgaCode',
        'lgaName',
      ),
    );
  }, [state]);

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore

      flash.success({description: 'Sent successfully'});
      navigation.navigate('IDVerify');
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
  }, [data, error, isError, isSuccess, navigation, reset]);

  const [formData, setFormData] = useState({
    address: '',
    state: '',
    lga: '',
    landmark: '',
  });

  const signInSchema = yup.object().shape({
    address: yup.string().required('Home Address field should not be empty'),
    state: yup.string().required('State field should not be empty'),
    lga: yup.string().required('LGA field should not be empty'),
    landmark: yup.string().required('Landmark field should not be empty'),
  });

  const initialValues = {
    address: '',
    state: '',
    lga: '',
    landmark: '',
  };

  const statesArr = extractSelect(locationData, 'code', 'state');

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
            <Text style={styles.headerLabel}>Address Verification</Text>
            <Text style={styles.headerSub}>
              Kindly enter your residential address information.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={values => {
            console.log(values);
            setFormData(values);
            verifyAddy(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}>
          {({errors, setFieldValue, values}) => (
            <View>
              <TextInput
                label="Home Address"
                placeholder="No 123, wemimo street along babcock "
                value={values.address}
                onChangeText={(value: any) => setFieldValue('address', value)}
                error={errors.address}
              />
              <SizedBox height={14} />

              <Select
                data={statesArr}
                save="key"
                placeholder="Select State"
                label="State"
                onSelect={(value: any) => {
                  setFieldValue('state', value);
                  setState(value);
                }}
                error={errors.state}
              />
              <SizedBox height={14} />
              <Select
                data={lgaArr}
                save="key"
                placeholder="Select LGA"
                label="LGA"
                onSelect={(value: any) => {
                  setFieldValue('lga', value);
                }}
                emptyText="Select a State to get LGA list!!"
                error={errors.lga}
              />
              <SizedBox height={14} />

              <TextInput
                label="Closest Landmark"
                placeholder="Babcock University"
                value={values.landmark}
                onChangeText={(value: any) => setFieldValue('landmark', value)}
                error={errors.landmark}
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
