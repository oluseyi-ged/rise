import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
  },
  span: {
    backgroundColor: '#71879C1A',
    height: HDP(10),
    borderRadius: HDP(10),
  },
  spanInner: {
    width: '66.6%',
    backgroundColor: palette.teal,
    height: HDP(10),
    borderTopLeftRadius: HDP(10),
    borderBottomLeftRadius: HDP(10),
  },
  spanText: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  spanBox: {
    paddingVertical: HDP(10),
  },
  label: {
    fontSize: RF(17),
    fontFamily: family.Bold,
    color: '#222222',
  },
});

export default styles;
