import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: HDP(4),
    flexDirection: 'row',
    height: HDP(48),
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  label: {
    fontSize: RF(10),
    color: palette.label,
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    position: 'absolute',
    backgroundColor: '#fff',
    top: HDP(-15),
    left: HDP(20),
    padding: HDP(4),
  },
  error: {
    fontSize: RF(10),
    color: '#D32F2F',
    fontFamily: family.Regular,
    alignSelf: 'flex-start',
    marginTop: HDP(5),
  },
  bordered: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  charLength: {
    position: 'absolute',
    bottom: HDP(-5),
    right: 0,
    fontSize: RF(8),
    color: palette.grey,
  },
});

export default styles;
