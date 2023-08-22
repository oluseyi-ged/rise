import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  paddingWrap: {
    paddingHorizontal: HDP(16),
  },
  mainText: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Bold,
    paddingVertical: HDP(16),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: HDP(20),
    paddingTop: HDP(50),
    paddingBottom: HDP(20),
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
  },
  headerText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.dark,
  },
  bannerImg: {
    width: width * 0.9,
    height: HDP(510),
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  gridImg: {
    width: HDP(65),
    height: HDP(65),
    resizeMode: 'cover',
    borderRadius: HDP(100),
  },
  foodGrid: {
    alignItems: 'center',
    gap: HDP(8),
  },
  foodText: {
    fontSize: RF(9),
    color: palette.dark,
    fontFamily: family.Bold,
  },
  itemName: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Bold,
  },
  itemAmt: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Bold,
  },
  itemCtaBtn: {},
  itemCta: {
    flexDirection: 'row',
    gap: HDP(16),
    backgroundColor: '#E3F2FD',
    borderColor: '#BBDEFB',
    borderWidth: 1,
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(8),
    alignSelf: 'flex-start',
    borderRadius: 2,
  },
  itemGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  itemCtaText: {
    fontSize: RF(12),
    color: palette.dark,
    fontFamily: family.Regular,
  },
  addressBox: {
    // marginHorizontal: HDP(16),
    borderTopWidth: 2,
    borderTopColor: '#ECEFF1',
    borderBottomWidth: 2,
    borderBottomColor: '#ECEFF1',
    paddingVertical: HDP(19),
  },
  addyBold: {
    fontSize: RF(16),
    color: palette.dark,
    fontFamily: family.Bold,
    marginBottom: HDP(13),
  },
  addyCtaGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: HDP(50),
  },
  addyCtaText: {
    flex: 1,
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Regular,
    textTransform: 'capitalize',
  },
  addySpan: {
    fontSize: RF(11),
    color: palette.blue,
    fontFamily: family.Bold,
  },
  feeBox: {
    gap: HDP(15),
    borderBottomWidth: 2,
    borderBottomColor: '#ECEFF1',
    paddingVertical: HDP(19),
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  feeLeft: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Regular,
  },
  feeRight: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Bold,
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
  addCta: {
    paddingHorizontal: HDP(16),
    paddingVertical: HDP(13),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.25)',
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
  emptyText: {
    alignSelf: 'center',
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: palette.dark,
  },
});

export default styles;
