/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {flash} from '@helpers/FlashMessageHelpers';
import {useVerifyBvnMutation} from '@services/mutationApi';
import {setProfile} from '@slices/profile';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useAppDispatch} from 'store';
import styles from './styles';

export const BvnVerified = ({navigation}) => {
  const [bvn, setBvn] = useState<any>('');
  const dispatch = useAppDispatch();
  const [verifyBvn, {data, isLoading, error, isError, isSuccess, reset}] =
    useVerifyBvnMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setProfile(data));
      flash.success({description: 'BVN verified successfully'});
      navigation.goBack();
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({description: error?.data?.message});
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Text style={styles.headerLabel}>BVN Verification</Text>
            <Text style={styles.headerSub}>
              Please provide your 11-digit Number
            </Text>
          </View>
        </View>
        <SizedBox height={40} />

        <View>
          <TextInput
            label="BVN"
            placeholder="Enter 11-digit here"
            bvnLength={11}
            value={bvn}
            onChangeText={text => setBvn(text)}
            maxLength={11}
            keyboardType="number-pad"
          />
          <SizedBox height={41} />
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        <Button
          title="Confirm"
          disabled={bvn.length < 11}
          onPress={() => verifyBvn({bvn})}
          loading={isLoading}
        />
      </View>
    </SafeAreaView>
  );
};
