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
    width: '33.3%',
    backgroundColor: palette.teal,
    height: HDP(10),
    borderTopLeftRadius: HDP(10),
    borderBottomLeftRadius: HDP(10),
  },
  spanText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: '#71879C',
    marginBottom: HDP(3),
  },
  spanAmt: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: '#000',
  },
  spanDate: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#333333',
  },
  spanBox: {
    paddingVertical: HDP(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amtGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: HDP(28),
    borderBottomColor: '#71879C33',
    borderBottomWidth: 1,
  },
  infoBox: {
    flexDirection: 'row',
    padding: HDP(10),
    backgroundColor: 'rgba(113, 135, 156, 0.05)',
    borderRadius: HDP(8),
    gap: HDP(17),
  },
  infoText: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  extraText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: '#71879C',
    textAlign: 'center',
  },
  projects: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  projText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: '#333333',
  },
  invBox: {
    backgroundColor: '#94A1AD',
    height: HDP(9),
    width: HDP(9),
    borderRadius: HDP(100),
  },
  retBox: {
    backgroundColor: '#0898A0',
    height: HDP(9),
    width: HDP(9),
    borderRadius: HDP(100),
  },
  projGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(6),
  },
  amtRight: {
    fontSize: RF(17),
    fontFamily: family.Regular,
    color: '#71879C',
    flex: 1,
  },
  amtLeft: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: '#333333',
  },
});

export default styles;
