/* eslint-disable @typescript-eslint/no-unused-vars */

import {SizedBox, SvgIcon} from '@components';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppSelector} from 'store';
import styles from './styles';

export const Bills = ({navigation}: any) => {
  const {profile} = useAppSelector<any>((store: RootState) => store);

  const [fadeAnim, setFadeAnim] = useState<any>(new Animated.Value(0));

  const startAnimation = () => {
    // @ts-ignore
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start(() => {
      setFadeAnim(new Animated.Value(0));
    });
  };

  useEffect(() => {
    startAnimation();
    return () => {
      fadeAnim.setValue(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = [
    {
      name: 'Airtime',
      icon: 'topup',
      desc: 'Buy airtime to call family and friends',
      primary: '#2BD87C',
      secondary: '#D5F7E5',
    },
    {
      name: 'Internet/Data',
      icon: 'internet',
      desc: 'Buy data to connect with family and friends',
      primary: '#6EB100',
      secondary: '#90E8001A',
    },
    {
      name: 'TV',
      icon: 'tv',
      desc: 'Subscribe to your best TV Stations',
      primary: '#BA00E8',
      secondary: '#BA00E80D',
    },
    {
      name: 'Electricity',
      icon: 'electricity',
      desc: 'Pay for utilities for 24/7 light supply',
      primary: '#0500E8',
      secondary: '#0500E80D',
    },
    {
      name: 'Betting',
      icon: 'bet',
      desc: 'Don’t miss out on your sport predictions',
      primary: '#00E833',
      secondary: '#00E8330D',
    },
    {
      name: 'Tolls',
      icon: 'tolls',
      desc: 'Pay for your day to day transport on road',
      primary: '#E88200',
      secondary: '#FFF3F2',
    },
  ];

  return (
    <SafeAreaView style={styles.pageWrap}>
      <View style={styles.overlay}>
        <Animated.View // Special animatable View
          style={[
            styles.soonBox,
            {
              // ...props.style,
              opacity: fadeAnim,
            },
          ]}>
          <SvgIcon name="info" size={30} />
          <Text style={styles.soonText}>COMING SOON!</Text>
        </Animated.View>
      </View>
      <KeyboardAwareScrollView
        style={styles.scrollWrap}
        keyboardShouldPersistTaps="handled">
        <SizedBox height={10} />
        <View style={styles.pageHeader}>
          <View style={styles.pageWelcome}>
            {profile?.profile?.photo?.length ? (
              <Image
                style={styles.userAvi}
                source={{
                  uri: profile?.profile?.photo?.replace(/^http:/i, 'https:'),
                }}
              />
            ) : (
              <SvgIcon name="avi" size={40} />
            )}
          </View>
          <Text style={styles.welcomeName}>Pay Bills</Text>
          {/* <SvgIcon size={40} name="notif" /> */}
          <SizedBox width={40} />
        </View>

        <SizedBox height={24} />

        <View style={styles.payGrid}>
          {options.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[{backgroundColor: opt?.secondary}, styles.optBox]}>
              <View style={[styles.optIcon, {borderLeftColor: opt?.primary}]}>
                <SvgIcon size={32} name={opt?.icon} />
              </View>
              <SizedBox height={20} />
              <Text style={styles.optName}>{opt?.name}</Text>
              <SizedBox height={22} />
              <Text style={styles.optDesc}>{opt?.desc}</Text>
              <SizedBox height={20} />
              <Text style={[styles.optCta, {color: opt?.primary}]}>
                {'Open >>>'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <SizedBox height={100} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
