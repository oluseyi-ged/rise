import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  container: {
    paddingHorizontal: HDP(32),
  },
  welcomeLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.textWhite,
    width: width * 0.7,
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
    marginBottom: HDP(8),
    textAlign: 'center',
  },
  headerSub: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: '#4C4D50',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  forgotText: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: palette.teal,
  },
  bottomText: {
    alignItems: 'center',
    width,
    marginBottom: HDP(20),
  },
  tcText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#f1f1f150',
    textAlign: 'center',
  },
  tcFade: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#009FA980',
  },
  ctaGrid: {
    flexDirection: 'row',
    gap: HDP(13),
  },
  forgotTxt: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: palette.black,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  backCta: {
    justifyContent: 'center',
    gap: HDP(2),
    paddingHorizontal: HDP(32),
    paddingVertical: HDP(10),
    alignItems: 'center',
  },
  backText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.white,
  },
  requirementsContainer: {
    marginTop: 10,
  },
  requirement: {
    color: 'red',
    fontSize: RF(13),
    fontFamily: family.Regular,
  },
  welcomeTxt: {
    fontSize: RF(20),
    fontFamily: family.Medium,
    color: palette.dark,
  },
  upperBox: {
    alignItems: 'flex-start',
    paddingVertical: HDP(50),
  },
  orText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.black,
    paddingVertical: HDP(16),
    alignSelf: 'center',
  },
  existText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.black,
    alignSelf: 'center',
    textAlign: 'center',
  },
  existSpan: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.blue,
    textDecorationLine: 'underline',
  },
  existSpanDark: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.black,
    textDecorationLine: 'underline',
  },
  checkGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(8),
    marginBottom: HDP(12),
  },
  forgotCta: {
    alignSelf: 'center',
    padding: HDP(16),
  },
  newText: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: '#71879C',
  },
  newSpan: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: palette.teal,
  },
});

export default style;
