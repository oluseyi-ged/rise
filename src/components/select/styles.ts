import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: HDP(8),
    height: HDP(48),
    flexDirection: 'row',
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    marginBottom: HDP(10),
  },
  label: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  error: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  selectView: {
    borderRadius: HDP(8),
    paddingVertical: HDP(14),
    height: HDP(48),
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  selectText: {
    fontSize: RF(10),
    color: palette.blueBlack,
    fontFamily: family.Regular,
  },
  selectDropdown: {
    backgroundColor: palette.offWhite,
    borderWidth: 0,
    marginBottom: HDP(10),
  },
});

export default styles;
