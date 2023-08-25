import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';

export const GoalAmount = ({navigation, route}: any) => {
  const reason = route?.params?.reason;
  const [amount, setAmount] = useState('');

  const init = {
    reason,
    amount,
  };

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={{paddingHorizontal: HDP(20)}}>
        <View style={styles.header}>
          <SvgIcon name="back" size={36} onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Target amount</Text>
          <SizedBox width={36} />
        </View>
        <SizedBox height={32} />
        <View style={styles.spanBox}>
          <Text style={styles.spanText}>Question 2 of 3</Text>
          <SizedBox height={21} />
          <View style={styles.span}>
            <View style={styles.spanInner} />
          </View>
        </View>
        <SizedBox height={54} />
        <View>
          <Text style={styles.label}>How much do need?</Text>
          <SizedBox height={20} />
          <TextInput
            iconName1="naira"
            iconSize1={24}
            placeholder="0.00"
            keyboardType="number-pad"
            onChangeText={txt => setAmount(txt)}
          />
          <SizedBox height={20} />
          <Button
            title="Continue"
            disabled={!amount?.length}
            onPress={() => navigation.navigate('GoalDate', {data: init})}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
