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
  pageName: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    textAlign: 'center',
  },
  optText: {
    fontSize: RF(16),
    fontFamily: family.SemiBold,
    color: palette.green,
  },
  bonusGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(29),
  },
  bonusItem: {
    backgroundColor: palette.white,
    borderRadius: HDP(10),
    shadowColor: '#00000070',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: HDP(15),
    width: width * 0.4,
  },
  bonusTitle: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  bonusAmt: {
    fontSize: RF(20),
    color: palette.green,
  },
  bigRefer: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.dark,
    textAlign: 'center',
  },
  referText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.fadeBlack,
    textAlign: 'center',
    alignSelf: 'center',
    width: width * 0.8,
  },
  ctaSection: {
    flexDirection: 'row',
    gap: HDP(10),
    alignItems: 'center',
    alignSelf: 'center',
  },
  referCodeBox: {
    gap: HDP(16),
    alignItems: 'center',
    backgroundColor: palette.mutedGreen,
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(16),
    borderRadius: HDP(16),
    width: width * 0.8,
  },
  codeText: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.green,
  },
  referCode: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.dark,
  },
  copyView: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: HDP(8),
  },
});

export default styles;
