/* eslint-disable react-native/no-inline-styles */
import {DateSelect, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import {useGetProfileQuery} from '@services/queryApi';
import {Formik} from 'formik';
import moment from 'moment';
import {default as React, useRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as yup from 'yup';
import styles from './styles';

export const Personal = ({navigation}: any) => {
  const {data: userData} = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const formRef = useRef<any>();

  const options = [
    // {
    //   id: 1,
    //   icon: 'personal',
    //   title: 'Email Settings',
    //   sub: 'Change your email address',
    //   route: 'Email',
    // },
    {
      id: 2,
      icon: 'order',
      title: 'Password & Security',
      sub: 'Manage payment methods and FoodieApp Credits',
    },
  ];

  const initSchema = yup.object().shape({
    firstName: yup.string().required('Field cannot be empty'),
    lastName: yup.string().required('Field cannot be empty'),
    phoneNumber: yup.string().required('Field cannot be empty'),
    dateOfBirth: yup.string().required('Start Date field should not be empty'),
  });

  const initialValues = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    dateOfBirth: moment(userData?.dateOfBirth)?.format('DD-MM-YYYY') || '',
    phoneNumber: userData?.phoneNumber || '',
  };

  console.log(userData);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.header}>
        <SvgIcon name="back" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Personal Information</Text>
      </View>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <SizedBox height={20} />
        <View style={styles.paddingWrap}>
          <View style={styles.pageHead}>
            <View style={styles.headLeft}>
              <View style={styles.imgBox} />
              <SizedBox width={24} />
              <View>
                <Text style={styles.userName}>
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Text style={styles.userMail}>{userData?.email}</Text>
              </View>
            </View>
          </View>
          <SizedBox height={55} />

          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              const postData = {...values};
              postData.phoneNumber = '+234' + values.phoneNumber.substring(1);
              console.log(postData);
              // bio(postData);
            }}
            innerRef={formRef}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={initSchema}>
            {({errors, setFieldValue, values}) => (
              <View style={{gap: HDP(10)}}>
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
                  labelStyle={{color: '#263238'}}
                  editable={false}
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
                  labelStyle={{color: '#263238'}}
                  editable={false}
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
                  editable={false}
                  onChangeText={value => setFieldValue('phoneNumber', value)}
                  // @ts-ignore
                  value={values.phoneNumber}
                  maxLength={11}
                  labelStyle={{color: '#263238'}}
                />
                <DateSelect
                  placeholder="Birthday"
                  value={values.dateOfBirth}
                  label="Birthday"
                  onSubmit={(value: any) => setFieldValue('dateOfBirth', value)}
                  error={errors.dateOfBirth}
                  disabled
                />
              </View>
            )}
          </Formik>

          <SizedBox height={20} />
          <View style={styles.subRow}>
            <Text style={styles.subText}>Account settings</Text>
          </View>
          {options?.map((opt, i) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Security')}
              style={[styles.subItem, {gap: HDP(24)}]}
              key={i}>
              <SvgIcon name={opt?.icon} size={30} />
              <View style={{flex: 1}}>
                <Text style={[styles.referMain, {paddingBottom: HDP(0)}]}>
                  {opt?.title}
                </Text>
                {opt?.sub ? (
                  <Text style={styles.referSub}>{opt?.sub}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
      {/* <View style={styles.floatCta}>
        <Button title="Save" />
        <SizedBox height={10} />
      </View> */}
    </SafeAreaView>
  );
};
