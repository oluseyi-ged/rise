import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  scrollWrap: {
    paddingHorizontal: HDP(24),
  },
  container: {
    flex: 1,
    width,
    alignSelf: 'center',
    bottom: 30,
  },
  pageWelcome: {
    flexDirection: 'row',
    gap: HDP(10),
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: RF(20),
    fontFamily: family.Regular,
    color: palette.fadeBlack,
  },
  welcomeName: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.dark,
  },
  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(10),
    justifyContent: 'space-between',
  },
  skipView: {
    flex: 0.1,
    justifyContent: 'space-between',
  },
  swipeCont: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeLabel: {
    color: palette.dark,
    fontSize: RF(20),
    fontFamily: family.Bold,
    textAlign: 'center',
  },
  swipeDesc: {
    color: palette.black,
    fontFamily: family.Medium,
    fontSize: RF(13),
    textAlign: 'center',
  },
  swipeTextContainer: {
    paddingHorizontal: HDP(30),
  },
  btnContain: {
    paddingHorizontal: HDP(20),
    width: '100%',
    flex: 0.1,
    justifyContent: 'space-between',
    // backgroundColor: 'green',
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
    flex: 0.25,
    // backgroundColor: 'red',
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
    fontSize: RF(16),
  },
  proceedCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    backgroundColor: palette.green,
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(16),
    borderRadius: HDP(16),
    justifyContent: 'center',
  },
  ctaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    paddingHorizontal: HDP(45),
    marginTop: HDP(20),
    marginBottom: HDP(17),
  },
  skipText: {
    color: palette.black,
    fontFamily: family.Regular,
    fontSize: RF(14),
    textDecorationLine: 'underline',
  },
  indicate: {
    height: HDP(5),
    width: HDP(40),
    backgroundColor: '#2BD87C',
    justifyContent: 'center',
    borderRadius: HDP(100),
  },
  unindicate: {
    height: HDP(5),
    backgroundColor: '#E9E9E9',
    width: HDP(40),
    justifyContent: 'center',
    borderRadius: HDP(100),
  },
  proBox: {
    backgroundColor: '#F2FCF5',
    borderRadius: HDP(8),
    padding: HDP(16),
    paddingBottom: HDP(24),
    gap: HDP(20),
  },
  proGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proLabel: {
    color: palette.dark,
    fontFamily: family.Regular,
    fontSize: RF(14),
  },
  proValue: {
    color: '#018C66',
    fontFamily: family.Bold,
    fontSize: RF(14),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  soonBox: {
    backgroundColor: '#fff',
    width: width * 0.7,
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: HDP(30),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(10),
  },
  soonText: {
    fontSize: RF(10),
    fontFamily: family.Bold,
    color: palette.dark,
  },
});

export default style;
