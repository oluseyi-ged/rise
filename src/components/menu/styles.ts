import {RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  navText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: '#94A1AD',
  },
  navActive: {
    fontSize: RF(8),
    fontFamily: family.Bold,
    color: palette.blue,
  },
});

export default styles;
