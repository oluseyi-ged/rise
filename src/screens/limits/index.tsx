/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {checkVerificationStatus} from '@helpers';

import {useGetLimitsQuery} from '@services/queryApi';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const Limits = ({navigation}) => {
  const {profile} = useAppSelector<any>((store: RootState) => store);
  //@ts-ignore
  const {data} = useGetLimitsQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const limitsArr = [
    {
      key: 'Receiving per transaction',
      name: `NGN ${Number(data?.dailyDepositLimit)?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      key: 'Sending per transaction',
      name: `NGN ${Number(data?.dailyTransferLimit)?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
    {
      key: 'Daily transaction limit',
      name: `NGN ${Number(data?.dailyWithdrawalLimit)?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    },
  ];

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
            <Text style={styles.headerLabel}>Account Limits</Text>
            <Text style={styles.headerSub}>
              Check out the amount you can send and receive within a period of
              time.
            </Text>
          </View>
        </View>
        <SizedBox height={40} />

        <View>
          <Text style={styles.limLabel}>{data?.name}</Text>
          <SizedBox height={24} />
          {limitsArr.map((lim, i) => (
            <View key={i} style={styles.limGrid}>
              <Text style={styles.limKey}>{lim?.key}</Text>
              <Text style={styles.limValue}>{lim?.name}</Text>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.bottomCta}>
        {!checkVerificationStatus(profile) && (
          <Button
            title="Upgrade Account"
            onPress={() => navigation.navigate('IDVerify')}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
