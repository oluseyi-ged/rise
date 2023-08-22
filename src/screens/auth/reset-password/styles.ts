import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: '#F1F1F1',
    flex: 1,
    height,
  },
  container: {
    paddingHorizontal: HDP(32),
    flex: 0.9,
  },
  pageLabel: {
    fontSize: RF(20),
    fontFamily: family.Bold,
    color: palette.purpleFade,
  },
  notify: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  bottomText: {
    position: 'absolute',
    bottom: HDP(10),
    alignItems: 'center',
    width,
  },
  btnWrap: {
    flex: 0.1,
    paddingHorizontal: HDP(20),
  },
  phoneText: {
    fontSize: RF(14),
    fontFamily: family.SemiBold,
    color: palette.purple,
    textAlign: 'center',
  },
  labelBorder: {
    borderBottomWidth: 2,
    borderBottomColor: palette.purple,
    paddingBottom: HDP(18),
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    borderRadius: HDP(20),
    paddingHorizontal: HDP(15),
    flex: 1,
    height: HDP(49),
  },
  phoneCustom: {
    backgroundColor: 'red',
    height: HDP(49),
    flex: 1,
    marginBottom: 0,
  },
  phoneCode: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.purpleFade,
    textAlign: 'center',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(8),
  },
  phoneDivide: {
    height: HDP(20),
    width: HDP(0.5),
    backgroundColor: palette.purple,
    marginRight: HDP(10),
  },
  disclaim: {
    fontSize: RF(11),
    fontFamily: family.Regular,
    color: palette.blueBlack,
  },
  requirementsContainer: {
    marginTop: 10,
  },
  requirement: {
    color: 'red',
    fontSize: RF(10),
    fontFamily: family.Regular,
    marginBottom: HDP(5),
  },
});

export default style;
