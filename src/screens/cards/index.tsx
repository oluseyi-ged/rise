/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {SvgIcon} from '@components';
import {HDP} from '@helpers';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {SizedBox} from '../../components/sized-box/index';
import style from './styles';

export const Cards: FC = ({navigation}: any) => {
  const width = Dimensions.get('window').width;

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

  const slides = [
    {
      id: 1,
      type: 'Virtual',
      desc: 'Instantly request for a Davenpay virtual card to use at anytime, all around the globe',
      icon: 'vcard',
      data: [
        {
          label: 'Card Creation Fee',
          value: 'Free',
        },
        {
          label: 'Maintnance Fee',
          value: 'Free',
        },
        {
          label: 'Secured',
          value: 'Yes',
        },
      ],
    },
    {
      id: 2,
      type: 'Physical',
      desc: 'Instantly request for a Davenpay physical card to use at anytime, all around the globe',
      icon: 'pcard',
      data: [
        {
          label: 'Card Creation Fee',
          value: 'Free',
        },
        {
          label: 'Maintnance Fee',
          value: 'Free',
        },
        {
          label: 'Delivery Fee',
          value: 'Free',
        },
        {
          label: 'Secured',
          value: 'Yes',
        },
      ],
    },
  ];

  const ref = useRef<any>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateIndex = e => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffset / width);
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <View style={style.overlay}>
        <Animated.View // Special animatable View
          style={[
            style.soonBox,
            {
              // ...props.style,
              opacity: fadeAnim,
            },
          ]}>
          <SvgIcon name="info" size={30} />
          <Text style={style.soonText}>COMING SOON!</Text>
        </Animated.View>
      </View>
      <KeyboardAwareScrollView
        style={style.scrollWrap}
        keyboardShouldPersistTaps="handled">
        <SizedBox height={10} />
        <View style={style.pageHeader}>
          <View style={style.pageWelcome}>
            <SvgIcon size={40} name="avi" />
          </View>
          <Text style={style.welcomeName}>Cards</Text>
          {/* <SvgIcon size={40} name="notif" /> */}
          <SizedBox width={40} />
        </View>
        <SizedBox height={50} />
        <View style={style.container}>
          <View style={style.flowContainer}>
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
                    {/* Render indicator */}
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: HDP(8),
                        justifyContent: 'center',
                      }}>
                      {slides.map((_, index) => (
                        <View
                          style={[
                            currentIndex === index
                              ? style.indicate
                              : style.unindicate,
                          ]}
                        />
                      ))}
                    </View>
                    <View style={style.swipeTextContainer}>
                      <SizedBox height={16} />
                      <SvgIcon
                        name={item?.icon}
                        size={327}
                        containerStyle={{height: HDP(190)}}
                      />
                      <SizedBox height={24} />

                      <Text style={style.swipeLabel}>
                        <Text style={{color: '#2BD87C'}}>Moola</Text>{' '}
                        {item.type} Card
                      </Text>
                      <SizedBox height={16} />
                      <Text style={style.swipeDesc}>{item.desc}</Text>

                      <SizedBox height={40} />

                      <View style={style.proBox}>
                        {item?.data?.map((pro, i) => (
                          <View style={style.proGrid}>
                            <Text style={style.proLabel}>{pro?.label}:</Text>
                            <Text style={style.proValue}>{pro?.value}</Text>
                          </View>
                        ))}
                      </View>

                      <SizedBox height={40} />

                      <TouchableOpacity style={style.proceedCta}>
                        <Text style={style.proceedText}>
                          Get A {item?.type} Card
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <SizedBox height={100} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
