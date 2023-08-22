import {HDP, RF} from '@helpers';
import {family} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: '#fff',
    flex: 1,
  },
  content: {
    paddingHorizontal: HDP(20),
  },
  text: {
    fontSize: RF(12),
    color: '#000',
    fontFamily: family.Regular,
  },
});

export default styles;
