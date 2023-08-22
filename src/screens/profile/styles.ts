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
  optItem: {
    paddingVertical: HDP(15),
    paddingHorizontal: HDP(15),
    borderWidth: 1,
    borderRadius: HDP(4),
    borderColor: '#F3F3F3',
    marginBottom: HDP(20),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(23),
  },
  optText: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: palette.black,
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
});

export default styles;
