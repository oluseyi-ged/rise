/* eslint-disable react-native/no-inline-styles */
import {SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useGetProfileQuery} from '@services/queryApi';
import {clearAuth} from '@slices/auth';
import {setLogged} from '@slices/logged';
import {clearProfile} from '@slices/profile';
import {clearRestaurants} from '@slices/restaurants';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from 'store';
import styles from './styles';

export const Account = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const {data: userData} = useGetProfileQuery(null, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleExit = async () => {
    await GoogleSignin.signOut();
    await GoogleSignin.revokeAccess();
    dispatch(setLogged(false));
    dispatch(clearProfile());
    dispatch(clearAuth());
    dispatch(clearRestaurants());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
        },
      ],
    });
  };

  const options = [
    {
      id: 1,
      icon: 'personal',
      title: 'Personal Information',
      sub: 'Change your account information',
      route: 'Personal',
    },
    {
      id: 2,
      icon: 'order',
      title: 'Order History',
      sub: 'Manage payment methods and FoodieApp Credits',
      route: '',
    },
    // {
    //   id: 3,
    //   icon: 'subs',
    //   title: 'Subscriptions',
    //   sub: 'Your recurring payment for subscription services.',
    // },
    // {
    //   id: 4,
    //   icon: 'card',
    //   title: 'Payment',
    //   sub: 'Manage delivery and promotional notifications',
    // },
    {
      id: 5,
      icon: 'wrap',
      title: 'Addresses',
      sub: 'Add or remove a delivery address',
      route: 'Address',
    },
    // {
    //   id: 6,
    //   icon: 'tag',
    //   title: 'Offers and Gift Cards',
    //   sub: 'Manage deals and promotional notifications',
    // },
    // {
    //   id: 7,
    //   icon: 'vendor',
    //   title: 'Become a Vendor',
    //   sub: 'Manage your privacy settings',
    // },
    {
      id: 8,
      icon: 'help',
      title: 'Get help',
      sub: 'Manage deals and promotional notifications',
      route: '',
    },
    {
      id: 9,
      icon: 'shield',
      title: 'Privacy',
      sub: 'Manage your privacy settings',
      route: '',
    },
    {
      id: 10,
      icon: 'shield',
      title: 'Log out',
    },
  ];

  console.log(userData);

  return (
    <SafeAreaView style={styles.pageWrap}>
      <ScrollView>
        <SizedBox height={20} />
        <View style={styles.paddingWrap}>
          <View style={styles.pageHead}>
            <View style={styles.headLeft}>
              <View style={styles.imgBox} />
              <SizedBox width={24} />
              <View>
                <Text style={styles.userName}>
                  {userData?.firstName} {userData?.lastName}
                </Text>
                <Text style={styles.userMail}>{userData?.email}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Personal')}>
              <Text style={styles.editCta}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <SizedBox height={55} />

          <View style={styles.subRow}>
            <Text style={styles.subText}>Refer a Friend</Text>
          </View>
          <View style={styles.subItem}>
            <SvgIcon name="box-grid" size={48} />
            <View style={{flex: 1}}>
              <Text style={styles.referMain}>
                Invite a friend - Get ₦ 2,500
              </Text>
              <Text style={styles.referSub}>
                Earn ₦ 2,500 for every 3 friends who make an order over ₦15,500
              </Text>
            </View>
          </View>
          <SizedBox height={20} />
          <View style={styles.subRow}>
            <Text style={styles.subText}>Account services</Text>
          </View>
          {options?.map((opt, i) => (
            <TouchableOpacity
              onPress={() => {
                if (opt?.id === 10) {
                  handleExit();
                } else {
                  navigation.navigate(opt?.route);
                }
              }}
              style={[styles.subItem, {gap: HDP(24)}]}
              key={i}>
              <SvgIcon name={opt?.icon} size={30} />
              <View style={{flex: 1}}>
                <Text style={[styles.referMain, {paddingBottom: HDP(0)}]}>
                  {opt?.title}
                </Text>
                {opt?.sub ? (
                  <Text style={styles.referSub}>{opt?.sub}</Text>
                ) : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <SizedBox height={50} />
        <Text style={styles.versionText}>version 1.0.0</Text>
        <SizedBox height={100} />
      </ScrollView>
    </SafeAreaView>
  );
};
