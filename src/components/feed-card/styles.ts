import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  questionBox: {
    borderWidth: 1,
    borderColor: palette.gray,
    borderRadius: HDP(6),
    paddingHorizontal: HDP(20),
    paddingTop: HDP(7),
    paddingBottom: HDP(24.87),
    marginBottom: HDP(20),
    backgroundColor: '#fff',
    shadowColor: '#00000070',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  questionImg: {
    width: '100%',
    height: HDP(177),
    resizeMode: 'cover',
  },
  questionLabel: {
    fontSize: RF(12),
    color: palette.green,
    fontFamily: family.SemiBold,
  },
  questionDate: {
    fontSize: RF(10),
    color: '#000',
    fontFamily: family.Regular,
  },
  question: {
    fontSize: RF(14),
    color: '#000',
    fontFamily: family.Bold,
  },
  answer: {
    fontSize: RF(12),
    color: '#000',
    fontFamily: family.Regular,
  },
  questionPatient: {
    fontSize: RF(10),
    color: '#000',
    fontFamily: family.Regular,
  },
  questionCta: {
    fontSize: RF(10),
    color: palette.purple,
    fontFamily: family.Medium,
  },
  btn: {
    borderWidth: 1,
    borderColor: palette.purple,
    borderRadius: HDP(4),
    paddingVertical: HDP(4.1),
    paddingHorizontal: HDP(12),
  },
  dotBlack: {
    backgroundColor: '#000',
    borderRadius: HDP(100),
    width: HDP(4),
    height: HDP(4),
  },
  qaBox: {
    borderWidth: 1,
    borderColor: palette.gray,
    borderRadius: HDP(6),
    paddingHorizontal: HDP(20),
    paddingTop: HDP(7),
    paddingBottom: HDP(24.87),
    marginBottom: HDP(20),
    backgroundColor: '#FAE2F633',
  },
});

export default styles;
