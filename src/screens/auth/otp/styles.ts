import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  pageWrap: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: palette.white,
  },
  welcomeTxt: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.blue,
  },
  upperBox: {
    alignItems: 'flex-start',
    paddingHorizontal: HDP(32),
  },
  descTxt: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
    lineHeight: 24,
  },
  underlineStyleBase: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: HDP(8),
    color: '#000',
  },
  resendText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
    lineHeight: 24,
  },
  resendSpan: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.blue,
  },
});

export default style;
