/* eslint-disable react-native/no-inline-styles */
import {Onb1, Onb2, Onb3} from '@assets/images';
import {Button, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {setFirst} from '@slices/first';
import {palette} from '@theme';
import React, {FC, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from 'store';
import {SizedBox} from '../../components/sized-box/index';
import style from './styles';

export const Onboarding: FC = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const width = Dimensions.get('window').width;

  const slides = [
    {
      id: 1,
      img: Onb1,
      label: 'Quality assets',
      desc: 'Rise invests your money into the best dollar investments around the world. ',
      primary: '#FE7122',
      secondary: '#FEFAF7',
    },
    {
      id: 2,
      img: Onb2,
      label: 'Superior Selection',
      desc: 'Our expert team and intelligent algorithms select assets that beat the markets.',
      primary: '#B80074',
      secondary: '#FDF4F9',
    },
    {
      id: 3,
      img: Onb3,
      label: 'Better Performance',
      desc: 'You earn more returns, achieve more of your financial goals and protect your money from devaluation.',
      primary: '#0898A0',
      secondary: '#F6FFFE',
    },
  ];

  const ref = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollIndex = () => {
    const nextSlideIndex = currentIndex + 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentIndex(nextSlideIndex);
    }
  };

  const scrollBack = () => {
    const nextSlideIndex = currentIndex - 1;
    if (nextSlideIndex !== slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({offset});
      setCurrentIndex(nextSlideIndex);
    }
  };

  const updateIndex = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView
      style={[
        style.pageWrap,
        {backgroundColor: slides[currentIndex]?.secondary},
      ]}>
      <FlatList
        ref={ref}
        data={slides}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={updateIndex}
        renderItem={({item}) => {
          return (
            <View style={style.swipeCont}>
              <Image
                style={style.onbImg}
                source={item?.img}
                resizeMode="contain"
              />
              {/* Render indicator */}
              <View style={style.ctaGrid}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: HDP(16),
                  }}>
                  {slides.map((_, index) => (
                    <View
                      style={[
                        currentIndex === index
                          ? {
                              height: HDP(6),
                              width: HDP(6),
                              backgroundColor: slides[currentIndex]?.primary,
                              justifyContent: 'center',
                              borderRadius: HDP(10),
                            }
                          : style.unindicate,
                      ]}
                    />
                  ))}
                </View>
              </View>
              <View style={style.swipeTextContainer}>
                <SizedBox height={59} />
                <Text
                  style={[
                    style.swipeLabel,
                    {color: slides[currentIndex]?.primary},
                  ]}>
                  {item.label}
                </Text>
                <SizedBox height={5} />
                <Text style={style.swipeDesc}>{item.desc}</Text>
              </View>
              <SizedBox height={30} />
              <View
                style={[
                  style.btnContain,
                  {bottom: currentIndex !== 2 ? HDP(100) : HDP(50)},
                ]}>
                {currentIndex !== 2 ? (
                  <View style={style.buttonGrid}>
                    {currentIndex === 0 ? (
                      <SvgIcon name="back-fade" size={48} />
                    ) : (
                      <SvgIcon
                        name="back-color"
                        size={48}
                        onPress={() => scrollBack()}
                      />
                    )}

                    <TouchableOpacity
                      onPress={scrollIndex}
                      style={style.ctaBtn}>
                      <Text
                        style={[
                          style.ctaText,
                          {color: slides[currentIndex]?.primary},
                        ]}>
                        Next
                      </Text>
                      <SvgIcon
                        name={
                          currentIndex === 0 ? 'right-orange' : 'right-purple'
                        }
                        size={15}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <Button
                      onPress={() => {
                        if (currentIndex !== slides.length - 1) {
                          scrollIndex();
                        } else {
                          navigation.navigate('Auth', {screen: 'Signup'});
                          dispatch(setFirst(false));
                        }
                      }}
                      title="Sign Up"
                      textStyle={{color: palette.white}}
                    />
                    <SizedBox height={10} />
                    <Button
                      title="Sign In"
                      textStyle={{color: palette.teal}}
                      containerStyle={style.inBox}
                    />
                  </>
                )}
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};
