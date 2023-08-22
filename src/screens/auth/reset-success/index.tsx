import {Button, SizedBox, SvgIcon} from '@components';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import style from './styles';

export const ResetSuccess: FC = ({navigation}: any) => {
  return (
    <View style={style.container}>
      <View style={style.flowContainer}>
        <View style={style.swipeCont}>
          <View style={style.swipeTextContainer}>
            <SvgIcon name="reset-success" size={246} />
            <SizedBox height={59} />
            <Text style={style.swipeLabel}>Password reset successful</Text>
            <SizedBox height={18} />
            <Text style={style.swipeDesc}>
              You have successfully reset your password. Please use your new
              password when logging in
            </Text>
            <SizedBox height={64} />
            <Button
              green
              arrowed
              title="Continue"
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
