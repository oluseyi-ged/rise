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

  mainView: {
    alignSelf: 'center',
  },
  userName: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: '#2F2F2F',
    textAlign: 'center',
  },
  userTag: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: '#828282',
    textAlign: 'center',
  },
  bottomCta: {
    position: 'absolute',
    bottom: HDP(30),
    width: width * 0.9,
    alignSelf: 'center',
  },

  userAvi: {
    width: HDP(90),
    height: HDP(90),
    borderRadius: HDP(100),
    backgroundColor: '#CCDDE2',
    alignSelf: 'center',
  },
  idBox: {
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: HDP(8),
  },
  idText: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: palette.fadeBlack,
  },
  optItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HDP(24),
    borderWidth: 1,
    padding: HDP(16),
    borderRadius: HDP(8),
    borderColor: '#D5F7E5',
  },
  optLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optText: {
    fontSize: RF(14),
    fontFamily: family.SemiBold,
    color: palette.dark,
  },
  optDesc: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: '#98989A',
    fontWeight: '400',
  },
  sectionText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.blueBlack,
  },
});

export default styles;
