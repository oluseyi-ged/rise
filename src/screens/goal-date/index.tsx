import {Button, DateSelect, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';

export const GoalDate = ({navigation, route}: any) => {
  const [date, setDate] = useState('');
  console.log(route?.params?.data);
  const form = route?.params?.data;

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={{paddingHorizontal: HDP(20)}}>
        <View style={styles.header}>
          <SvgIcon name="back" size={36} onPress={() => navigation.goBack()} />
          <Text style={styles.headerText}>Target Date</Text>
          <SizedBox width={36} />
        </View>
        <SizedBox height={32} />
        <View style={styles.spanBox}>
          <Text style={styles.spanText}>Question 3 of 3</Text>
          <SizedBox height={21} />
          <View style={styles.span}>
            <View style={styles.spanInner} />
          </View>
        </View>
        <SizedBox height={54} />
        <View>
          <Text style={styles.label}>When do you want to withdraw?</Text>
          <SizedBox height={20} />
          <DateSelect
            placeholder="Choose a date"
            value={date}
            onSubmit={(value: any) => setDate(value)}
            max={new Date('2030-12-31')}
          />
          <SizedBox height={20} />
          <Button
            title="Continue"
            disabled={!date?.length}
            onPress={() => {
              form.date = date;
              navigation.navigate('Projections', {data: form});
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
