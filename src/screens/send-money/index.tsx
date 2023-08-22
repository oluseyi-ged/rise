/* eslint-disable react-native/no-inline-styles */
import {
  AmountInput,
  BottomSheet,
  Button,
  Select,
  SizedBox,
  SvgIcon,
  TextInput,
} from '@components';
import {HDP, extractSelect} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import {
  useGetAccountNameMutation,
  useTransferInMutation,
  useTransferOutMutation,
} from '@services/mutationApi';
import {
  useGetBanksQuery,
  useLazyGetUserByAcctQuery,
  useLazyGetUserByPhoneQuery,
  useLazyGetUserByTagQuery,
} from '@services/queryApi';
import {palette} from '@theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {showToastMessage} from '@utils/prompt';
import {Formik} from 'formik';
import moment from 'moment';
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import {RootState, useAppSelector} from 'store';
import * as yup from 'yup';
import style from './styles';

const {width} = Dimensions.get('window');

export const SendMoney: FC = ({navigation, route}: any) => {
  const id = route.params?.id;
  console.log(id);
  const [postData, setPostData] = useState<any>({});
  const [pin, setPin] = useState('');
  const [payData, setPayData] = useState<any>({});
  const {profile} = useAppSelector<any>((store: RootState) => store);
  const [amt, setAmt] = useState('');
  const [accNumber, setAccNumber] = useState<any>('');
  const [destination, setDestination] = useState<any>('');
  const [bankCode, setBankCode] = useState<any>('');
  const [mode, setMode] = useState('');
  const {height} = Dimensions.get('window');
  const [banking, setBanking] = useState<any>(null);
  const [tagData, setTagData] = useState<any>({});
  const [payTag, setPayTag] = useState<any>(null);
  const [bump, setBump] = useState<any>(null);
  const [pulseAnimation] = useState(new Animated.Value(1));

  useEffect(() => {
    const pulse = () => {
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data: banksData} = useGetBanksQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [
    getAccountName,
    {
      data: accountData,
      isLoading: accountLoad,
      isSuccess: accountTrue,
      isError: accountFalse,
    },
  ] = useGetAccountNameMutation();

  const [
    transferOut,
    {
      // data: outData,
      isLoading: outLoad,
      isSuccess: outTrue,
      isError: outFalse,
      error: outErr,
    },
  ] = useTransferOutMutation();

  const [
    transferIn,
    {
      // data: inData,
      isLoading: inLoad,
      isSuccess: inTrue,
      isError: inFalse,
      error: inErr,
    },
  ] = useTransferInMutation();

  const [
    trigger,
    {
      data: acctres,
      isSuccess: acctSucc,
      isError: acctFalse,
      isLoading: acctLoad,
    },
  ] = useLazyGetUserByAcctQuery(destination);

  const [
    fetch,
    {
      data: phoneres,
      isSuccess: phoneSucc,
      isError: phoneFalse,
      isLoading: phoneLoad,
    },
  ] = useLazyGetUserByPhoneQuery(destination);

  const [
    call,
    {data: tagres, isSuccess: tagSucc, isError: tagFalse, isLoading: tagLoad},
  ] = useLazyGetUserByTagQuery(destination?.toLowerCase());

  useEffect(() => {
    if (acctSucc || phoneSucc || tagSucc) {
      setTagData(acctres || phoneres || tagres);
      setPayTag(1);
    }
  }, [acctSucc, acctres, phoneSucc, phoneres, tagSucc, tagres]);

  console.log(acctres, phoneres, tagres);

  useEffect(() => {
    if (outFalse || inFalse) {
      flash.danger({
        //@ts-ignore
        description: outErr?.data?.message || inErr?.data?.message,
      });
    }
  }, [outFalse, inFalse, outErr, inErr]);

  useEffect(() => {
    if (accNumber?.length > 9 && bankCode) {
      getAccountName({
        bankCode: bankCode,
        accountNumber: accNumber,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accNumber, bankCode]);

  function getBankNameByCode(code) {
    const bank = banksData?.result?.find(bank => bank.Code === code);
    return bank ? bank.Name : 'Bank not found';
  }

  const handlePay = async () => {
    await setBanking(null);
    const sendData = {
      authPin: String(pin),
      receiverAccountNumber: accNumber,
      receiverName: accountData?.accountName,
      bankCode: payData?.bank,
      amount: Number(payData?.amount),
      description: payData?.description,
      location: '1.38716,3.05117',
    };
    transferOut(sendData);
  };

  const handleFund = async () => {
    await setPayTag(null);
    const sendData = {
      authPin: String(pin),
      userTag: tagData?.tag,
      amount: Number(payData?.amount),
      description: payData?.description,
    };
    transferIn(sendData);
  };

  const handleFetch = () => {
    console.log('first', mode, destination);
    if (mode === 'Tag') {
      call(destination?.toLowerCase());
    }
    if (mode === 'Phone Number') {
      fetch('+234' + destination.substring(1));
    }
    if (mode === 'Account Number') {
      trigger(destination);
    }
  };

  const bankData = extractSelect(banksData?.result, 'Code', 'Name');

  const inOptions = [
    {key: 1, value: 'Tag'},
    {key: 2, value: 'Phone Number'},
    {key: 3, value: 'Account Number'},
  ];

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

  const viewShot = React.useRef<any>();
  const captureViewShot = async () => {
    console.log('we are here');
    try {
      const imageURL = await captureRef(viewShot, {
        quality: 0.5,
      });
      Share.open({
        title: 'Image',
        filename: 'My Merchant QR Code',
        url: imageURL,
        message: 'Scan my QR code to make payment.',
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const bankSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
    accountNumber: yup
      .string()
      .length(10, 'Account number must be exactly 11 characters long')
      .required('Account number is required'),
    bank: yup.string().required('Please select bank'),
  });
  const tagSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
  });
  const bumpSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
  });
  const qrSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
  });
  const initSchema = yup.object().shape({
    amount: yup.string().required('Amount cannot be empty'),
    description: yup.string().required('Description field should not be empty'),
  });

  const bankValues = {
    amount: '',
    description: '',
    accountNumber: '',
    bank: '',
  };
  const tagValues = {
    amount: '',
    description: '',
  };
  const qrValues = {
    amount: '',
    description: '',
  };
  const bumpValues = {
    amount: '',
    description: '',
  };
  const initialValues = {
    amount: '',
    description: '',
  };

  const handleRequest = async values => {
    await setPostData(values);
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
            <Text style={style.headerLabel}>Send Money</Text>
            <View style={{width: HDP(40)}} />
          </View>
          <SizedBox height={38} />
          <Text style={style.headerSub}>How much would you like to send?</Text>
          <SizedBox height={40} />
          <Formik
            initialValues={
              id === 'bump'
                ? bumpValues
                : id === 'bank'
                ? bankValues
                : id === 'tag'
                ? tagValues
                : id === 'qr'
                ? qrValues
                : initialValues
            }
            onSubmit={values => {
              console.log(values);
              if (Number(values.amount) >= 100) {
                setPayData(values);
                if (id === 'bank') {
                  setBanking(1);
                } else if (id === 'tag') {
                  handleFetch();
                }
              } else {
                showToastMessage('Amount must be equal to or more than 100');
              }
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={
              id === 'bump'
                ? bumpSchema
                : id === 'bank'
                ? bankSchema
                : id === 'tag'
                ? tagSchema
                : id === 'qr'
                ? qrSchema
                : initSchema
            }>
            {({handleSubmit, errors, setFieldValue, values}) => (
              <View>
                <AmountInput
                  name="amount"
                  maxLength={7}
                  innerStyle={[
                    style.textStyle,
                    {
                      color: Number(values.amount) < 1 ? '#BABABB' : '#2BD87C',
                    },
                  ]}
                  inputStyle={[
                    getInputWidth(),
                    values.amount.length === 0 && {width: HDP(125)},
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
                  onChangeText={value => setFieldValue('description', value)}
                  value={values.description}
                />

                {id === 'bank' && (
                  <>
                    <Select
                      onSelect={value => {
                        setFieldValue('bank', value);
                        setBankCode(value);
                      }}
                      placeholder="Select Bank"
                      save="key"
                      label="Bank"
                      data={bankData}
                      // @ts-ignore
                      error={errors?.bank}
                    />
                    <SizedBox height={5} />
                    <TextInput
                      placeholder="1101568150"
                      maxLength={10}
                      label="Account Number"
                      name="accountNumber"
                      // @ts-ignore
                      error={errors?.accountNumber}
                      onChangeText={value => {
                        setFieldValue('accountNumber', value);
                        setAccNumber(value);
                      }}
                      // @ts-ignore
                      value={values.accountNumber}
                    />
                    <View style={{alignSelf: 'flex-start'}}>
                      {accountLoad && (
                        <ActivityIndicator color={palette.green} />
                      )}
                      {accountTrue && (
                        <Text style={style.acctName}>
                          {accountData?.accountName}
                        </Text>
                      )}
                      {accountFalse && (
                        <Text style={style.acctErr}>
                          Account number does not exist
                        </Text>
                      )}
                    </View>
                  </>
                )}

                {id === 'tag' && (
                  <>
                    <Select
                      onSelect={value => {
                        setMode(value);
                      }}
                      placeholder="Select mode"
                      save="value"
                      label="Mode"
                      data={inOptions}
                      // @ts-ignore
                      error={errors?.bank}
                    />
                    <SizedBox height={5} />
                    {mode?.length ? (
                      <TextInput
                        placeholder={'Enter' + ' ' + mode}
                        maxLength={
                          mode === 'Tag'
                            ? 20
                            : mode === 'Phone Number'
                            ? 11
                            : 10
                        }
                        label={mode}
                        name="mode"
                        onChangeText={value => {
                          setDestination(value);
                        }}
                        // @ts-ignore
                        value={values.accountNumber}
                      />
                    ) : null}
                    <View style={{alignSelf: 'flex-start'}}>
                      {(acctLoad || phoneLoad || tagLoad) && (
                        <ActivityIndicator color={palette.green} />
                      )}
                      {(acctSucc || phoneSucc || tagSucc) && (
                        <Text style={style.acctName}>
                          {accountData?.accountName}
                        </Text>
                      )}
                      {(acctFalse || phoneFalse || tagFalse) && (
                        <Text style={style.acctErr}>
                          Moola user does not exist
                        </Text>
                      )}
                    </View>
                  </>
                )}
                <SizedBox height={50} />
                <Button
                  title="Send"
                  containerStyle={{width: width * 0.9}}
                  disabled={accountLoad}
                  loading={outLoad || inLoad}
                  onPress={handleSubmit}
                />
              </View>
            )}
          </Formik>
          <BottomSheet
            // show={true}
            show={typeof banking === 'number'}
            dropPress={() => setBanking(null)}
            content={
              <View style={{paddingHorizontal: HDP(20)}}>
                <View style={style.drawer} />
                <SizedBox height={21} />
                {banking === 1 ? (
                  <>
                    <View style={style.modalHead}>
                      <SvgIcon
                        name="back"
                        onPress={() => setBanking(null)}
                        size={40}
                      />
                      <Text style={style.modalLabel}>Confirm</Text>
                      <View style={{width: HDP(40)}} />
                    </View>
                    <View style={style.transGrid}>
                      <SizedBox height={10} />
                      <Text style={style.lightText}>To</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        {accountData?.accountName}
                      </Text>
                      <SizedBox height={16} />
                      <Text style={style.lightText}>Bank</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        {getBankNameByCode(bankCode)} - {accNumber}
                      </Text>
                      <SizedBox height={16} />
                      <Text style={style.lightText}>Amount</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        NGN {Number(amt)?.toFixed(2)?.toLocaleString()}
                      </Text>
                      <SizedBox height={24} />
                      <View style={style.extraBox}>
                        <View style={style.payBorder}>
                          <Text style={style.payLeft}>Transaction Fee</Text>
                          <Text style={style.payRight}>NGN {'0.00'}</Text>
                        </View>
                        <View style={style.payBorder}>
                          <Text style={style.payLeft}>Total Payment</Text>
                          <Text style={style.payRight}>
                            NGN{' '}
                            {(Number(amt) + 0)?.toFixed(2)?.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <SizedBox height={30} />
                      <Button title="Confirm" onPress={() => setBanking(2)} />
                    </View>
                  </>
                ) : banking === 2 ? (
                  <>
                    <View style={style.modalHead}>
                      <SvgIcon
                        name="back"
                        onPress={() => setBanking(1)}
                        size={40}
                      />
                      <Text style={style.modalLabel}>Authorize</Text>
                      <View style={{width: HDP(40)}} />
                    </View>
                    <OTPInputView
                      style={{width: '70%', height: 70, alignSelf: 'center'}}
                      autoFocusOnLoad={false}
                      pinCount={4}
                      codeInputFieldStyle={style.underlineStyleBase}
                      secureTextEntry
                      onCodeFilled={code => {
                        setPin(code);
                      }}
                    />
                    <SizedBox height={20} />
                    <Button title="Confirm" onPress={() => handlePay()} />
                  </>
                ) : null}
                <SizedBox height={30} />
              </View>
            }
            afterHide={() => setBanking(null)}
          />
          <BottomSheet
            // show={true}
            show={typeof payTag === 'number'}
            dropPress={() => setPayTag(null)}
            content={
              <View style={{paddingHorizontal: HDP(20)}}>
                <View style={style.drawer} />
                <SizedBox height={21} />
                {payTag === 1 ? (
                  <>
                    <View style={style.modalHead}>
                      <SvgIcon
                        name="back"
                        onPress={() => setBanking(null)}
                        size={40}
                      />
                      <Text style={style.modalLabel}>Confirm</Text>
                      <View style={{width: HDP(40)}} />
                    </View>
                    <View style={style.transGrid}>
                      <SizedBox height={10} />
                      <Text style={style.lightText}>To</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        {tagData?.firstName} {tagData?.lastName}
                      </Text>
                      <SizedBox height={16} />
                      <Text style={style.lightText}>Moola {mode}</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        {mode === 'Tag'
                          ? `@${destination?.toLowerCase()}`
                          : destination}
                      </Text>
                      <SizedBox height={16} />
                      <Text style={style.lightText}>Amount</Text>
                      <SizedBox height={5} />
                      <Text style={style.transTitle}>
                        NGN {Number(amt)?.toFixed(2)?.toLocaleString()}
                      </Text>
                      <SizedBox height={24} />
                      <View style={style.extraBox}>
                        <View style={style.payBorder}>
                          <Text style={style.payLeft}>Transaction Fee</Text>
                          <Text style={style.payRight}>NGN {'0.00'}</Text>
                        </View>
                        <View style={style.payBorder}>
                          <Text style={style.payLeft}>Total Payment</Text>
                          <Text style={style.payRight}>
                            NGN{' '}
                            {(Number(amt) + 0)?.toFixed(2)?.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                      <SizedBox height={30} />
                      <Button title="Confirm" onPress={() => setPayTag(2)} />
                    </View>
                  </>
                ) : payTag === 2 ? (
                  <>
                    <View style={style.modalHead}>
                      <SvgIcon
                        name="back"
                        onPress={() => setPayTag(1)}
                        size={40}
                      />
                      <Text style={style.modalLabel}>Authorize</Text>
                      <View style={{width: HDP(40)}} />
                    </View>
                    <OTPInputView
                      style={{width: '70%', height: 70, alignSelf: 'center'}}
                      pinCount={4}
                      autoFocusOnLoad={false}
                      codeInputFieldStyle={style.underlineStyleBase}
                      secureTextEntry
                      onCodeFilled={code => {
                        setPin(code);
                      }}
                    />
                    <SizedBox height={20} />
                    <Button title="Confirm" onPress={() => handleFund()} />
                  </>
                ) : null}
                <SizedBox height={30} />
              </View>
            }
            afterHide={() => setPayTag(null)}
          />
          <BottomSheet
            // show={true}
            show={outTrue || inTrue}
            content={
              <View style={{paddingHorizontal: HDP(20)}}>
                <View style={style.drawer} />
                <SizedBox height={21} />
                <>
                  <View style={style.modalHead}>
                    <SvgIcon
                      name="back"
                      onPress={() => setBanking(1)}
                      size={40}
                    />
                    <Text style={style.modalLabel}>Confirm</Text>
                    <View style={{width: HDP(40)}} />
                  </View>
                  <View style={style.transGrid}>
                    <SvgIcon name="party" size={150} />
                    <SizedBox height={30} />
                    <Text style={style.sentHead}>Money Sent Successfully</Text>
                    <SizedBox height={16} />
                    <Text style={style.sentDet}>
                      You have successfully sent NGN{' '}
                      {Number(amt)?.toFixed(2)?.toLocaleString()} to{' '}
                      {tagData?.firstName} {tagData?.lastName}
                    </Text>
                    <SizedBox height={24} />
                    <TouchableOpacity
                      onPress={handleRequest}
                      style={style.shareBox}>
                      <Text style={style.shareTxt}>SHARE</Text>
                      <SvgIcon name="hyper" size={20} />
                    </TouchableOpacity>
                    <SizedBox height={40} />
                    <Button
                      title="Go Home"
                      onPress={() => navigation.navigate('Home')}
                    />
                  </View>
                </>
                <SizedBox height={30} />
              </View>
            }
          />

          <BottomSheet
            show={typeof bump === 'number'}
            content={
              <View style={{paddingHorizontal: HDP(20)}}>
                <View style={style.drawer} />
                <SizedBox height={21} />
                <>
                  <View style={style.modalHead}>
                    <SvgIcon
                      name="back"
                      onPress={() => setBump(null)}
                      size={40}
                    />
                    <Text style={style.modalLabel}>Connecting...</Text>
                    <View style={{width: HDP(40)}} />
                  </View>
                  <SizedBox height={30} />
                  <View style={style.contained}>
                    <Animated.View
                      style={[
                        style.circle,
                        {
                          transform: [{scale: pulseAnimation}],
                        },
                      ]}>
                      <View style={style.dot} />
                    </Animated.View>
                  </View>
                </>
                <SizedBox height={70} />
                <Button title="Cancel" bordered onPress={() => setBump(null)} />
                <SizedBox height={30} />
              </View>
            }
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          height: height * 0.7,
          position: 'absolute',
          top: 1000,
        }}>
        <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
          <View ref={viewShot} style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={style.downloadHeader}>
              <SvgIcon name="logo" size={58} />
              <SizedBox height={10} />
              <Text style={style.downloadtext}>Transaction Receipt</Text>
            </View>

            <>
              <SizedBox height={30} />
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Amount</Text>
                <Text style={style.otherRight}>
                  NGN{Number(postData?.amount)?.toLocaleString()}
                </Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Description</Text>
                <Text style={style.otherRight}>{postData?.description}</Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Sender</Text>
                <Text style={style.otherRight}>
                  {profile?.profile?.firstName} {profile?.profile?.lastName}
                </Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Destination Bank</Text>
                <Text style={style.otherRight}>
                  {getBankNameByCode(bankCode)}
                </Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Destination Account No.</Text>
                <Text style={style.otherRight}>{accNumber}</Text>
              </View>
              <View style={style.otherBorder}>
                <Text style={style.otherLeft}>Date</Text>
                <Text style={style.otherRight}>
                  {moment().format('dddd, DD MMMM YYYY, hh:mm A')}
                </Text>
              </View>
            </>
            <View style={style.disclaimerSection}>
              <Text style={style.disclaimerText}>Disclaimer</Text>
              <Text style={style.disclaimerDet}>
                Due to the nature of the internet, transactions may be subject
                to interruption blackout, delayed transmission and incorrect
                data transmission. Moola is not liable for malfunction in
                communication facilities not within its control that may affect
                the accuracy and timeliness of messages and transaction you
                send. All transactions are subject to verification and normal
                fraud checks.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
