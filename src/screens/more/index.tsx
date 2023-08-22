/* eslint-disable @typescript-eslint/no-unused-vars */

import {SizedBox, SvgIcon} from '@components';
import LogoutModal from '@components/logout-modal';
import {setLogged} from '@slices/logged';
import {accountOptions} from '@utils/data';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {RootState, useAppDispatch, useAppSelector} from 'store';
import styles from './styles';

export const More = ({navigation}: any) => {
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const {profile} = useAppSelector<any>((store: RootState) => store);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const logoutFunction = () => {
    dispatch(setLogged(false));
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          state: {
            index: 1,
            routes: [{name: 'Login'}],
          },
        },
      ],
    });
  };
  return (
    <>
      <SafeAreaView style={styles.pageWrap}>
        <KeyboardAwareScrollView
          style={styles.scrollWrap}
          keyboardShouldPersistTaps="handled">
          <View>
            {profile?.profile?.photo?.length ? (
              <Image
                style={styles.userAvi}
                source={{
                  uri: profile?.profile?.photo?.replace(/^http:/i, 'https:'),
                }}
              />
            ) : (
              <SvgIcon name="avi" size={91} />
            )}
            <SizedBox height={24} />
            <View style={styles.idBox}>
              <Text style={styles.userName}>
                {profile?.profile?.firstName} {profile?.profile?.lastName}
              </Text>
              <SvgIcon name="check" size={20} />
            </View>
            <SizedBox height={8} />
            <View style={styles.idBox}>
              <Text style={styles.idText}>@{profile?.profile?.username}</Text>
              <SvgIcon name="link" size={16} />
            </View>
          </View>
          <SizedBox height={32} />
          <View>
            {accountOptions.map((acc, i) => (
              <TouchableOpacity
                style={styles.optItem}
                onPress={() => {
                  if (acc?.icon !== 'log-out') {
                    navigation.navigate(acc?.route);
                  } else {
                    setModalVisible(true);
                  }
                }}>
                <View style={styles.optLeft}>
                  <SvgIcon name={acc?.icon} size={40} />
                  <SizedBox width={12} />
                  <View>
                    <Text style={styles.optText}>{acc?.title}</Text>
                    {acc?.desc?.length ? (
                      <>
                        <SizedBox height={4} />
                        <Text style={styles.optDesc}>{acc?.desc}</Text>
                      </>
                    ) : null}
                  </View>
                </View>
                <SvgIcon name="caret-right" size={24} />
              </TouchableOpacity>
            ))}
          </View>

          <SizedBox height={50} />
        </KeyboardAwareScrollView>
        <LogoutModal
          modalVisible={modalVisible}
          closeModal={closeModal}
          logoutFunction={logoutFunction}
        />
      </SafeAreaView>
    </>
  );
};
