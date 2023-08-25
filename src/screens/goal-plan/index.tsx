import {Button, SizedBox, SvgIcon, TextInput} from '@components';
import {HDP} from '@helpers';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';

export const GoalPlan = ({navigation}: any) => {
  const [reason, setReason] = useState('');

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={{paddingHorizontal: HDP(20)}}>
        <View style={styles.header}>
          <SvgIcon name="back" size={36} onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Goal name</Text>
          <SizedBox width={36} />
        </View>
        <SizedBox height={32} />
        <View style={styles.spanBox}>
          <Text style={styles.spanText}>Question 1 of 3</Text>
          <SizedBox height={21} />
          <View style={styles.span}>
            <View style={styles.spanInner} />
          </View>
        </View>
        <SizedBox height={54} />
        <View>
          <Text style={styles.label}>What are you saving for</Text>
          <SizedBox height={20} />
          <TextInput
            placeholder="Enter Here..."
            onChangeText={txt => setReason(txt)}
          />
          <SizedBox height={20} />
          <Button
            title="Continue"
            disabled={!reason?.length}
            onPress={() => navigation.navigate('GoalAmount', {reason: reason})}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
