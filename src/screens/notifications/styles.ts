import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HDP(32),
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifLeft: {
    fontSize: RF(18),
    color: palette.blueBlack,
    fontFamily: family.Bold,
  },
  notifRight: {
    fontSize: RF(10),
    color: palette.purple,
    fontFamily: family.Bold,
  },
  notifBox: {
    backgroundColor: '#FAFFFF',
    marginVertical: HDP(14),
    paddingVertical: HDP(25),
    paddingHorizontal: HDP(20),
    borderRadius: HDP(10),
  },
  dateText: {
    fontSize: RF(14),
    color: palette.blueBlack,
    fontFamily: family.Bold,
    marginBottom: HDP(14),
  },
  notifItem: {
    flexDirection: 'row',
    gap: HDP(21),
    marginBottom: HDP(11),
  },
  propName: {
    fontSize: RF(10),
    color: palette.purple,
    fontFamily: family.Regular,
    marginBottom: HDP(2),
  },
  actionTime: {
    fontSize: RF(8),
    color: palette.purpleFade,
    fontFamily: family.Regular,
  },
  actionName: {
    fontSize: RF(12),
    color: palette.purpleFade,
    fontFamily: family.Bold,
  },
  actionWord: {
    fontSize: RF(12),
    color: palette.purpleFade,
    fontFamily: family.Regular,
  },
});

export default styles;
