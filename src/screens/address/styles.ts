import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  userName: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.dark,
  },
  userMail: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  pageHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paddingWrap: {
    paddingHorizontal: HDP(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HDP(20),
    paddingHorizontal: HDP(16),
    gap: HDP(16),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width,
  },
  headerText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.dark,
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
    alignItems: 'flex-start',
    marginBottom: HDP(16),
  },
  addyLeft: {
    flex: 1,
    gap: HDP(5),
  },
  addyNew: {
    flexDirection: 'row',
    gap: HDP(16),
    alignItems: 'center',
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
  addyCta: {
    backgroundColor: '#ECEFF1',
    width: width * 0.3,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingVertical: HDP(9),
    paddingHorizontal: HDP(16),
    gap: HDP(7),
    borderRadius: HDP(4),
    position: 'absolute',
    bottom: HDP(-35),
    right: HDP(15),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  ctaText: {
    fontSize: RF(12),
    color: palette.dark,
    fontFamily: family.Regular,
  },
});

export default styles;
