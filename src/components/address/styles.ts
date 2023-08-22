import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: HDP(16),
    paddingHorizontal: HDP(14),
    borderBottomColor: '#ECEFF1',
  },
  gridLeft: {
    flexDirection: 'row',
    gap: HDP(12),
    justifyContent: 'space-between',
    // backgroundColor: '#ECEFF1',
    flex: 1,
  },
  formBox: {
    paddingHorizontal: HDP(16),
  },
  formLabel: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    marginVertical: HDP(20),
  },
  formText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HDP(16),
    padding: HDP(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#fff',
  },
  mainText: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Bold,
    paddingTop: HDP(16),
  },
  addyBox: {
    backgroundColor: '#ECEFF1',
    paddingTop: HDP(14),
    paddingBottom: HDP(16),
    paddingHorizontal: HDP(14),
    flexDirection: 'row',
    gap: HDP(30),
    borderWidth: 1,
    borderColor: '#CFD8DC',
    marginVertical: HDP(13),
    borderRadius: 4,
  },
  addyLeft: {
    flex: 1,
    gap: HDP(5),
  },
  addyTag: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Bold,
    textTransform: 'capitalize',
  },
  addyText: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    textTransform: 'capitalize',
  },
  addyWrap: {
    paddingHorizontal: HDP(16),
  },
  addyMain: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    textTransform: 'capitalize',
  },
  addCta: {
    paddingHorizontal: HDP(16),
    paddingVertical: HDP(13),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.25)',
  },
  headGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  miniLabel: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    textTransform: 'capitalize',
  },
});

export default styles;
