/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {checkVerification, HDP} from '@helpers';
import {verifyOptions} from '@utils/data';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const VerifyIdentity = ({navigation}) => {
  const {profile} = useAppSelector<any>((store: RootState) => store);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={{paddingHorizontal: HDP(24)}}>
        <SvgIcon
          name="back"
          size={40}
          onPress={() => navigation.goBack()}
          containerStyle={{alignSelf: 'flex-start'}}
        />
        <SizedBox height={8} />
        <View>
          <Text style={styles.headerLabel}>Verify Identity</Text>
          <Text style={styles.headerSub}>
            Complete your verification, to increase your daily, monthly and
            yearly transactions
          </Text>
        </View>
      </View>
      <SizedBox height={40} />
      <View style={{paddingHorizontal: HDP(24)}}>
        {verifyOptions.map((acc, i) => (
          <TouchableOpacity
            key={i}
            style={styles.optItem}
            disabled={checkVerification(acc?.title, profile) === 'Verified'}
            onPress={() => {
              navigation.navigate(acc?.route);
            }}>
            <View style={styles.optLeft}>
              <SvgIcon name={acc?.icon} size={40} />
              <SizedBox width={12} />
              <View>
                <Text style={styles.optText}>{acc?.title}</Text>

                <SizedBox height={4} />
                <Text
                  style={[
                    styles.optDesc,
                    {
                      color:
                        checkVerification(acc?.title, profile) === 'Verified'
                          ? '#34C759'
                          : '#FF3B30',
                    },
                  ]}>
                  {checkVerification(acc?.title, profile)}
                </Text>
              </View>
            </View>
            {checkVerification(acc?.title, profile) === 'Verified' ? (
              <SvgIcon name="checked-circle" size={24} />
            ) : (
              <SvgIcon name="caret-right" size={24} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};
