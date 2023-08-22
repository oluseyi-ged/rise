import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  scrollWrap: {
    paddingHorizontal: HDP(24),
  },
  pageWelcome: {
    flexDirection: 'row',
    gap: HDP(10),
    alignItems: 'center',
  },
  userAvi: {
    width: HDP(40),
    height: HDP(40),
    borderRadius: HDP(100),
    backgroundColor: '#CCDDE2',
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
  optBox: {
    alignSelf: 'flex-start',
    width: width * 0.4,
    borderRadius: HDP(9),
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(19),
    // height: HDP(186),
  },
  payGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: HDP(16),
    justifyContent: 'center',
  },
  optIcon: {
    alignSelf: 'flex-start',
    borderLeftWidth: 2,
    paddingLeft: HDP(12),
  },
  optName: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.dark,
    paddingLeft: HDP(12),
  },
  optDesc: {
    fontSize: RF(7),
    fontFamily: family.Regular,
    color: palette.dark,
    paddingLeft: HDP(12),
  },
  optCta: {
    fontSize: RF(10),
    fontFamily: family.Bold,
    color: palette.dark,
    paddingLeft: HDP(12),
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

export default styles;
