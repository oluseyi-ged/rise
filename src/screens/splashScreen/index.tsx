/* eslint-disable @typescript-eslint/no-unused-vars */

import {SvgIcon} from '@components';
import React, {FC, useEffect} from 'react';
import {View} from 'react-native';
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
          navigation.navigate('Auth');
        }
      }
    }, 2300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={style.container}>
      <Animatable.View animation="flash" direction="normal" duration={2000}>
        <Animatable.View animation="fadeIn" duration={2300}>
          <SvgIcon name="logo" size={200} />
        </Animatable.View>
      </Animatable.View>
    </View>
  );
};
