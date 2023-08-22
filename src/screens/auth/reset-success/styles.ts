import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

const style = StyleSheet.create({
  container: {
    backgroundColor: '#13556D',
    position: 'relative',
    flex: 1,
  },
  skipView: {
    flex: 0.2,
    justifyContent: 'space-between',
  },
  swipeCont: {
    width,
    height,
  },
  swipeLabel: {
    color: palette.mutedGreen,
    fontSize: RF(28),
    textAlign: 'center',
    fontFamily: family.Bold,
  },
  swipeDesc: {
    color: palette.offWhite,
    textAlign: 'center',
    fontFamily: family.Regular,
    fontSize: RF(12),
  },
  swipeTextContainer: {
    paddingHorizontal: HDP(42),
    alignSelf: 'center',
    position: 'absolute',
    bottom: HDP(100),
  },
  btnContain: {
    paddingHorizontal: HDP(20),
    width: '100%',
    flex: 0.1,
  },
  indicator: {
    height: HDP(5),
    width: HDP(5),
    backgroundColor: '#CFE939',
    marginHorizontal: 3,
    borderRadius: 0.714286,
  },
  flowContainer: {
    width,
    flex: 0.7,
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
    color: palette.purple,
    fontFamily: family.Medium,
    fontSize: RF(16),
  },
  arrowGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proceedText: {
    color: palette.white,
    fontFamily: family.Medium,
    fontSize: RF(16),
  },
  proceedCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(7.36),
    backgroundColor: palette.purple,
    paddingHorizontal: HDP(37),
    paddingVertical: HDP(13),
    alignSelf: 'flex-end',
    borderRadius: HDP(8),
  },
});

export default style;
