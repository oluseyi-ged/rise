import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: palette.white,
    borderRadius: HDP(8),
    padding: HDP(24),
    // position: 'absolute',
    // width,
    // alignSelf: 'center',
    // bottom: -30,
  },
  modalHeader: {
    fontSize: RF(20),
    fontFamily: family.Medium,
    color: palette.purple,
  },
  modalCTA: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn1: {
    color: palette.orange,
    fontSize: RF(14),
    fontFamily: family.Medium,
  },
  btn2: {
    color: palette.orange,
    fontSize: RF(14),
    fontFamily: family.Medium,
  },
});

export default styles;
