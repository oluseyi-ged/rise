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
  limLabel: {
    fontSize: RF(16),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  limGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: HDP(24),
    flex: 1,
  },
  limKey: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.fadeBlack,
    flex: 1,
  },
  limValue: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: '#018C66',
  },
  bottomCta: {
    width: width * 0.9,
    alignSelf: 'center',
  },
});

export default styles;
