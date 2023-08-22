/* eslint-disable @typescript-eslint/no-unused-vars */

import {SvgIcon} from '@components';
import React, {FC, useEffect} from 'react';
import {Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import style from './styles';

export const SplashScreen: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {logged, first, profile} = useAppSelector((store: RootState) => store);

  useEffect(() => {
    setTimeout(() => {
      // SplashFunctions.openApp(navigation);
      if (first) {
        navigation.navigate('Onboarding');
      } else if (logged) {
        navigation.navigate('Home');
      } else if (!logged) {
        if (profile?.phone) {
          navigation.navigate('Auth', {screen: 'Login'});
        } else {
          navigation.navigate('Auth', {screen: 'Login'});
        }
      }
    }, 2300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={style.container}>
      <Animatable.View animation="fadeIn" duration={2300}>
        <SvgIcon name="logo" size={122} />
        <Text style={style.splashText}>
          Dollar investments that {'\n'}help you grow{' '}
        </Text>
      </Animatable.View>
      <Animatable.View animation="fadeIn" duration={2300}>
        <Text style={style.splashMini}>All rights reserved {'\n'}(c) 2021</Text>
      </Animatable.View>
    </View>
  );
};
