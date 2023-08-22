/* eslint-disable react-native/no-inline-styles */
import {AmountInput, Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import {showToastMessage} from '@utils/prompt';
import {Formik} from 'formik';
import React, {FC, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import {RootState, useAppSelector} from 'store';
import * as yup from 'yup';
import style from './styles';

const {width} = Dimensions.get('window');

export const RequestMoney: FC = ({navigation}: any) => {
  const {profile} = useAppSelector<any>((store: RootState) => store);
  const [amt, setAmt] = useState('');
  const [desc, setDesc] = useState('');
  const {height} = Dimensions.get('window');

  const getInputWidth = () => {
    return {
      width:
        amt.length === 1
          ? amt.length * 78
          : amt.length === 2
          ? amt.length * 46
          : amt.length === 3
          ? amt.length * 35
          : amt.length === 4
          ? amt.length * 35
          : amt.length === 5
          ? amt.length * 30
          : amt.length === 6
          ? amt.length * 28
          : amt.length === 7
          ? amt.length * 29
          : amt.length === 8
          ? amt.length * 29
          : amt.length === 9
          ? amt.length * 29
          : amt.length === 10
          ? amt.length * 29
          : amt.length === 11
          ? amt.length * 29
          : '90%', // Adjust the multiplier to your liking
    };
  };

  const viewShot = React.useRef<any>();
  const captureViewShot = async () => {
    try {
      const imageURL = await captureRef(viewShot, {
        quality: 0.5,
      });
      Share.open({
        title: 'Image',
        filename: 'My Moola QR Code',
        url: imageURL,
        message: 'Scan my QR code to send funds.',
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const signInSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
  });

  const initialValues = {
    amount: '',
    description: '',
  };

  const quickAmt = [
    {
      label: '₦1,000',
      value: '1000',
    },
    {
      label: '₦2,000',
      value: '2000',
    },
    {
      label: '₦5,000',
      value: '5000',
    },
    {
      label: '₦10,000',
      value: '10000',
    },
  ];

  const handleRequest = async () => {
    captureViewShot();
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <SvgIcon
              name="back"
              size={40}
              onPress={() => navigation.goBack()}
            />
            <Text style={style.headerLabel}>Request Money</Text>
            <View style={{width: HDP(40)}} />
          </View>
          <SizedBox height={38} />
          <Text style={style.headerSub}>
            How much would you like to request?
          </Text>
          <SizedBox height={40} />
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              console.log(values);
              if (Number(values.amount) >= 100) {
                handleRequest();
              } else {
                showToastMessage('Amount must be equal to or more than 100');
              }
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={signInSchema}>
            {({handleSubmit, errors, setFieldValue, values}) => (
              <View>
                <AmountInput
                  name="amount"
                  maxLength={13}
                  innerStyle={[
                    style.textStyle,
                    {
                      color: Number(values.amount) < 1 ? '#BABABB' : '#2BD87C',
                    },
                  ]}
                  inputStyle={[
                    getInputWidth(),
                    values.amount.length === 0 && {width: HDP(100)},
                  ]}
                  placeholder={'0.0'}
                  onChangeText={value => {
                    setFieldValue('amount', value);
                    setAmt(value);
                  }}
                  value={values.amount?.toLocaleString()}
                  keyboardType="numeric"
                />
                {errors?.amount?.length ? (
                  <Text style={style.errored}>{errors?.amount}</Text>
                ) : null}
                <SizedBox height={5} />
                <View style={style.quickGrid}>
                  {quickAmt?.map(quick => (
                    <TouchableOpacity
                      onPress={() => {
                        setFieldValue('amount', quick.value);
                        setAmt(quick.value);
                      }}
                      style={[
                        style.quickItem,
                        amt === quick.value && {backgroundColor: '#ECF1FE'},
                      ]}>
                      <Text
                        style={[
                          style.quickText,
                          amt === quick.value && {color: '#3C76F1'},
                        ]}>
                        {quick?.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <SizedBox height={40} />
                <TextInput
                  placeholder="Describe here..."
                  label="Description"
                  name="description"
                  error={errors?.description}
                  onChangeText={value => {
                    setFieldValue('description', value);
                    setDesc(value);
                  }}
                  value={values.description}
                />
                <SizedBox height={50} />
                <Button
                  title="Request"
                  containerStyle={{width: width * 0.9}}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
      <View style={{height: height * 0.7, position: 'absolute', top: 1000}}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View ref={viewShot} style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={style.downloadHeader}>
              <SvgIcon name="logo" size={58} />
              <SizedBox height={10} />
              <Text style={style.downloadtext}>
                {profile?.profile?.firstName} {profile?.profile?.lastName}
              </Text>
            </View>

            <>
              <View style={style.payTab}>
                <View style={{alignSelf: 'center'}}>
                  <QRCode
                    value={JSON.stringify({
                      amount: amt,
                      description: '',
                    })}
                    size={200}
                  />
                </View>
              </View>
              <SizedBox height={24} />
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Amount</Text>
                <Text style={style.otherRight}>
                  NGN{Number(amt)?.toLocaleString()}
                </Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Description</Text>
                <Text style={style.otherRight}>{desc}</Text>
              </View>
            </>
            <View style={style.disclaimerSection}>
              <Text style={style.disclaimerText}>Disclaimer</Text>
              <Text style={style.disclaimerDet}>
                By scanning this code, you agree to pay the listed amount to the
                above moola user. Please ensure you intend to credit the user
                before proceeding with the payment.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
