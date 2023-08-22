/* eslint-disable react-native/no-inline-styles */

import {SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import Clipboard from '@react-native-clipboard/clipboard';
import {showToastMessage} from '@utils/prompt';
import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const Referrals = ({navigation}: any) => {
  const {profile} = useAppSelector((store: RootState) => store);

  const copyToClipboard = val => {
    Clipboard.setString(val);
    // Alert.alert('referral ID copied!');
    showToastMessage('referral ID copied');
  };

  return (
    <SafeAreaView style={styles.pageWrap}>
      <KeyboardAwareScrollView
        style={styles.scrollWrap}
        keyboardShouldPersistTaps="handled">
        <SizedBox height={15} />
        <View>
          <SvgIcon
            name="back"
            size={40}
            onPress={() => navigation.goBack()}
            containerStyle={{alignSelf: 'flex-start'}}
          />
          <SizedBox height={8} />
          <View>
            <Text style={styles.headerLabel}>Referrals</Text>
          </View>
        </View>
        <SvgIcon
          name="refer-cards"
          size={200}
          containerStyle={{height: HDP(200)}}
        />
        <SizedBox height={40} />

        <View>
          <Text style={styles.bigRefer}>
            Get <Text style={styles.bonusAmt}>N1000</Text> for each referral
          </Text>
          <SizedBox height={16} />
          <Text style={styles.referText}>
            Both you and your referral will get a N1000 bonus, when they sign up
            and complete their verification
          </Text>
          <SizedBox height={40} />
          <View style={styles.ctaSection}>
            <View style={styles.referCodeBox}>
              <Text style={styles.referCode}>Your Referral Code</Text>
              <Text style={styles.codeText}>1G6FRE6</Text>
            </View>
          </View>
          <SizedBox height={24} />

          <TouchableOpacity
            onPress={() => copyToClipboard(profile?.referral_id)}
            style={styles.copyView}>
            <Text style={styles.optText}>Copy</Text>
            <SvgIcon name="copy-green" size={16} />
          </TouchableOpacity>
        </View>
        <SizedBox height={50} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
