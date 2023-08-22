import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    flex: 1,
    height,
  },
  container: {
    flex: 1,
    width,
  },
  skipView: {
    flex: 0.1,
    justifyContent: 'space-between',
  },
  swipeCont: {
    width,
    alignItems: 'center',
  },
  swipeLabel: {
    fontSize: RF(20),
    fontFamily: family.Medium,
  },
  swipeDesc: {
    color: palette.dark,
    fontFamily: family.Regular,
    fontSize: RF(15),
  },
  swipeTextContainer: {
    paddingHorizontal: HDP(20),
  },
  btnContain: {
    paddingHorizontal: HDP(20),
    width: '100%',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: HDP(100),
  },
  indicator: {
    height: HDP(10),
    width: HDP(10),
    backgroundColor: '#D9D9D9',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  flowContainer: {
    width,
    // height,
  },
  skipBtn: {
    position: 'absolute',
    right: 0,
    marginTop: Platform.OS === 'ios' ? HDP(54) : HDP(24),
    paddingHorizontal: HDP(21),
  },
  arrowNext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    backgroundColor: palette.purpleFade,
    paddingHorizontal: HDP(30),
    paddingVertical: HDP(13),
    alignSelf: 'flex-end',
    borderRadius: HDP(8),
  },
  arrowBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    borderColor: palette.purple,
    borderWidth: 1,
    paddingHorizontal: HDP(30),
    paddingVertical: HDP(12),
    alignSelf: 'flex-end',
    borderRadius: HDP(8),
  },
  arrowText: {
    color: palette.white,
    fontFamily: family.Medium,
    fontSize: RF(16),
  },
  arrowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proceedText: {
    color: palette.textWhite,
    fontFamily: family.Bold,
    fontSize: RF(12),
  },
  proceedCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    backgroundColor: palette.blue,
    paddingHorizontal: HDP(37),
    paddingVertical: HDP(12),
    borderRadius: HDP(4),
    justifyContent: 'center',
  },
  ctaGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width,
    marginTop: HDP(25),
  },
  skipText: {
    color: palette.dark,
    fontFamily: family.Bold,
    fontSize: RF(10),
  },
  indicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: palette.blue,
    justifyContent: 'center',
    borderRadius: HDP(10),
  },
  unindicate: {
    height: HDP(6),
    width: HDP(6),
    backgroundColor: '#71879C33',
    justifyContent: 'center',
    borderRadius: HDP(10),
  },
  onbImg: {
    height: HDP(300),
    width: HDP(300),
    marginTop: HDP(50),
  },
  floatSkip: {
    position: 'absolute',
    top: HDP(50),
    zIndex: 1000,
    right: HDP(10),
  },
  ctaBtn: {
    backgroundColor: 'rgba(113, 135, 156, 0.10)',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    padding: HDP(16),
    gap: HDP(30),
    alignItems: 'center',
    borderRadius: HDP(5),
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ctaText: {
    fontFamily: family.Bold,
    fontSize: RF(15),
  },
  inBox: {
    backgroundColor: '#71879C1A',
  },
});

export default style;
