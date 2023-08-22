import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  paddingWrap: {
    paddingHorizontal: HDP(16),
  },
  mainText: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Bold,
    paddingVertical: HDP(16),
  },
  pageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgBox: {
    backgroundColor: '#ECEFF1',
    height: HDP(56),
    width: HDP(56),
    borderRadius: HDP(4),
  },
  headLeft: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.dark,
  },
  userMail: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  editCta: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  subText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.dark,
    paddingBottom: HDP(13),
  },
  subRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  subItem: {
    flexDirection: 'row',
    gap: HDP(17),
    paddingVertical: HDP(16),
  },
  referMain: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.dark,
    paddingBottom: HDP(12),
  },
  referSub: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  versionText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
    alignSelf: 'center',
  },
});

export default styles;
