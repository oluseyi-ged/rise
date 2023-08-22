/* eslint-disable react-native/no-inline-styles */
import {Button, DateSelect, SizedBox, SvgIcon} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useLazyGetStatementQuery} from '@services/queryApi';
import {Formik} from 'formik';
import React, {useEffect, useRef} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';

export const Statements = ({navigation}) => {
  const formRef = useRef<any>();

  const [trigger, {isFetching, isSuccess, isError, error}] =
    useLazyGetStatementQuery();

  const signInSchema = yup.object().shape({
    startDate: yup.string().required('Start Date field should not be empty'),
    endDate: yup.string().required('End Date field should not be empty'),
  });

  const initialValues = {
    startDate: '',
    endDate: '',
  };

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  console.log(isSuccess, isError, error, 'SENTS');
  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore

      flash.success({
        description: 'The bank statement will be sent to your email shortly',
      });
    }
    if (isError) {
      console.log(error);
      flash.danger({
        //@ts-ignore
        description: error?.data?.message || 'An Error Occured',
      });
    }
  }, [error, isError, isSuccess, navigation]);
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
            <Text style={styles.headerLabel}>Bank statements</Text>
            <Text style={styles.headerSub}>
              Select a preferred date range to download your transactions
              reports.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />
        <Formik
          initialValues={initialValues}
          innerRef={formRef}
          onSubmit={values => {
            console.log(values);
            trigger(values);
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={signInSchema}>
          {({errors, setFieldValue, values}) => (
            <View>
              <DateSelect
                placeholder="Start Date"
                value={values.startDate}
                onSubmit={(value: any) => setFieldValue('startDate', value)}
                error={errors.endDate}
              />
              <SizedBox height={20} />
              <DateSelect
                placeholder="End Date"
                value={values.endDate}
                onSubmit={(value: any) => setFieldValue('endDate', value)}
                error={errors.endDate}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button title="Confirm" loading={isFetching} onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};
