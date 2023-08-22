import {SvgIcon} from '@components';
import {useNavigation} from '@react-navigation/native';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

interface Props {
  home?: boolean;
  label?: string;
  back?: boolean;
  other?: boolean;
  share?: boolean;
  notif?: boolean;
  backPress?: any;
}

export const Header: FC<Props> = ({
  home,
  label,
  back,
  share,
  notif,
  backPress,
}) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        {back && (
          <SvgIcon
            name="back"
            size={24}
            onPress={() => {
              if (typeof backPress === 'function') {
                backPress();
              } else {
                navigation.goBack();
              }
            }}
          />
        )}
        {home && (
          <TouchableOpacity style={styles.locView}>
            <SvgIcon name="location" size={22} />
            <Text style={styles.locText}>Lagos, Nigeria</Text>
            <SvgIcon name="loc-drop" size={22} />
          </TouchableOpacity>
        )}

        <View style={styles.headerAside}>
          {share && <SvgIcon name="share" size={24} />}
          {share && <SvgIcon name="heart" size={24} />}
          {(home || notif) && (
            <SvgIcon
              name="notif"
              onPress={() => navigation.navigate('Notifications')}
              size={24}
            />
          )}
          <SvgIcon name="avi" size={35} />
        </View>
      </View>
      <Text style={styles.headerText}>{label}</Text>
    </View>
  );
};
