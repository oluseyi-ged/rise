/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {HDP, HP} from '@helpers';
import {palette} from '@theme';
import React, {useCallback} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export const NavMenu = ({state, descriptors, navigation}: any) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const MenuIcons = useCallback(({label, status}: any) => {
    switch (label.toLowerCase()) {
      case 'feed':
        return (
          <View>
            <SvgIcon name="feeds" size={30} />
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Feed
            </Text>
          </View>
        );
      case 'wallet':
        return (
          <View>
            <SvgIcon name="wallet" size={30} />
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Wallet
            </Text>
          </View>
        );
      case 'plans':
        return (
          <View>
            <SvgIcon name="plans" size={30} />
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Plans
            </Text>
          </View>
        );
      case 'account':
        return (
          <View>
            <SvgIcon name="avi" size={30} />
            <SizedBox height={6} />
            <Text style={[!status ? styles.navText : styles.navActive]}>
              Account
            </Text>
          </View>
        );
      default:
        return (
          <View>
            <SvgIcon name={status ? 'home' : 'home-inactive'} size={35} />
            <SizedBox height={6} />
            <View
              style={{
                backgroundColor: palette.teal,
                width: HDP(10),
                height: HDP(10),
                borderRadius: HDP(100),
                alignSelf: 'center',
              }}
            />
          </View>
        );
    }
  }, []);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        paddingHorizontal: HDP(30),
        paddingBottom: HDP(Platform.OS === 'android' ? 4 : 10),
        position: 'absolute',
        bottom: HP(Platform.OS === 'android' ? -2 : -1.5),
        borderTopWidth: 1,
        borderTopColor: '#ECEFF1',
      }}>
      {state.routes.map((route: any, index: any) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            disabled
            onLongPress={onLongPress}
            style={{justifyContent: 'center'}}>
            <View
              style={[
                {
                  alignItems: 'center',
                  paddingVertical: HDP(10),
                },
              ]}>
              <MenuIcons label={label} status={isFocused} />
            </View>
            <View>
              <SizedBox height={1} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
