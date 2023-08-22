import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    // gap: HDP(1),
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputContainer: {
    flex: 1,
    fontSize: RF(14),
    paddingVertical: 0,
    // marginTop: HDP(5),
  },
  label: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
  },
  error: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  bvnLength: {
    position: 'absolute',
    bottom: HDP(-5),
    right: 0,
    fontSize: RF(8),
    color: palette.grey,
  },
});

export default styles;
