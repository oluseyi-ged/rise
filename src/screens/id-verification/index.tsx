/* eslint-disable react-native/no-inline-styles */
import {Button, Select, SizedBox, SvgIcon, TextInput} from '@components';
import ImagePickerComponent from '@components/image-picker';
import {flash} from '@helpers/FlashMessageHelpers';
import {useVerifyIdMutation} from '@services/mutationApi';
import {idTypeOptions} from '@utils/data';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import styles from './styles';

export const IDVerification = ({navigation}) => {
  const [frontId, setFrontId] = useState('');
  const [front, setFront] = useState('');
  const [backId, setBackId] = useState('');
  const [back, setBack] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idType, setIdType] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [verifyId, {data, isLoading, error, isError, isSuccess, reset}] =
    useVerifyIdMutation();
  console.log(front, back, idNumber, idType);
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
            <Text style={styles.headerLabel}>Upload ID</Text>
            <Text style={styles.headerSub}>
              Kindly snap or upload your ID for identity verification.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />

        <View>
          <Select
            data={idTypeOptions}
            save="key"
            placeholder="Select ID Type"
            label="ID Type"
            onSelect={(value: any) => {
              setIdType(value);
            }}
            error={idType.length < 1 && isTouched ? 'Enter an ID type' : ''}
          />

          <SizedBox height={41} />
          <TextInput
            label="ID Number"
            placeholder="Enter ID Number "
            value={idNumber}
            onChangeText={value => setIdNumber(value)}
            error={idNumber.length < 1 && isTouched ? 'Enter an ID number' : ''}
          />
          <SizedBox height={14} />
          <ImagePickerComponent
            label="Front ID"
            setImageUri={img => setFront(img)}
            image={front}
            setImage={img => setFrontId(img)}
            imageDisplay={frontId}
          />
          <SizedBox height={41} />
          <ImagePickerComponent
            label="Back ID"
            setImageUri={img => setBack(img)}
            image={back}
            setImage={img => setBackId(img)}
            imageDisplay={backId}
          />
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button
          title="Confirm"
          loading={isLoading}
          disabled={
            front?.length < 1 ||
            back?.length < 1 ||
            idNumber?.length < 1 ||
            idType?.length < 1
          }
          onPress={() => {
            verifyId({front, back, idNumber, idType});
            setIsTouched(true);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
