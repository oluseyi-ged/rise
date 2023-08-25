import {Button, SizedBox, SvgIcon} from '@components';
import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const PlanSuccess = ({navigation}: any) => {
  const {auth} = useAppSelector((store: RootState) => store);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.paddingWrap}>
        <View>
          <SvgIcon name="party" size={90} />
          <SizedBox height={30} />
          <Text style={styles.mainText}>You just created{'\n'} your plan.</Text>
          <Text style={styles.subText}>Well done, {auth?.first_name}</Text>
        </View>
        <Button
          title="Go Home"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Home', params: {}}],
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};
