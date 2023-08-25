import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  paddingWrap: {
    paddingHorizontal: HDP(20),
    flex: 1,
    justifyContent: 'space-around',
  },
  mainText: {
    fontSize: RF(20),
    color: '#222222',
    textAlign: 'center',
    fontFamily: family.Regular,
    marginBottom: HDP(10),
  },
  subText: {
    fontSize: RF(15),
    color: '#71879C',
    textAlign: 'center',
    fontFamily: family.Regular,
    marginBottom: HDP(10),
  },
});

export default styles;
