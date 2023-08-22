import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.teal,
    paddingVertical: HDP(70),
  },
  image: {
    marginVertical: 'auto',
  },
  splashText: {
    color: palette.white,
    fontSize: RF(18),
    fontFamily: family.Regular,
    width: width * 0.7,
    textAlign: 'center',
  },
  splashMini: {
    color: palette.white,
    fontSize: RF(12),
    fontFamily: family.Regular,
    width: width * 0.7,
    textAlign: 'center',
  },
});

export default style;
