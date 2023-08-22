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
    paddingTop: HDP(16),
  },
  bannerImg: {
    width: width,
    height: HDP(194),
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
  slant: {
    width: width * 2,
    alignSelf: 'center',
    backgroundColor: 'white',
    height: HDP(50),
    transform: [{rotate: '5deg'}],
    position: 'absolute',
    bottom: HDP(-30),
  },
  logoImg: {
    width: HDP(64),
    height: HDP(64),
    alignSelf: 'center',
    resizeMode: 'cover',
    backgroundColor: '#FFFFFF50',
    borderRadius: HDP(100),
    position: 'absolute',
    left: HDP(16),
    top: HDP(-60),
  },
  miniBio: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniText: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    textTransform: 'capitalize',
  },
  mapBg: {
    width: HDP(45),
    height: HDP(45),
    borderWidth: 1,
    borderColor: palette.blue,
    justifyContent: 'center',
  },
  addyGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HDP(30),
    justifyContent: 'space-between',
  },
  addyText: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
    flex: 1,
  },
  divide: {
    borderBottomColor: '#ECEFF1',
    borderBottomWidth: HDP(8),
    paddingBottom: HDP(16),
    marginBottom: HDP(16),
  },
  listStyle: {
    gap: HDP(25),
    paddingLeft: HDP(16),
    marginRight: HDP(16),
    paddingBottom: HDP(17),
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    paddingRight: HDP(20),
  },
  dateText: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Regular,
  },
  dateGrid: {
    position: 'relative',
  },
  dateLine: {
    position: 'absolute',
    bottom: HDP(-18),
    zIndex: 99999,
    backgroundColor: '#140F41',
    height: HDP(3),
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  dishImg: {
    width: HDP(105),
    height: HDP(105),
    resizeMode: 'cover',
    borderRadius: 3,
    backgroundColor: '#000000050',
  },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: HDP(16),
    paddingVertical: HDP(18),
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
    alignItems: 'center',
  },
  soldOut: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FFCDD2',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(2),
    borderRadius: HDP(4),
    marginBottom: HDP(15),
  },
  lessThanTen: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFECB3',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(2),
    borderRadius: HDP(4),
    marginBottom: HDP(15),
  },
  greaterThanTen: {
    backgroundColor: '#E8F5E9',
    borderColor: '#C8E6C9',
    borderWidth: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: HDP(12),
    paddingVertical: HDP(2),
    borderRadius: HDP(4),
    marginBottom: HDP(15),
  },
  gText: {
    fontSize: RF(7),
    color: '#1B5E20',
    fontFamily: family.Bold,
  },
  sText: {
    fontSize: RF(7),
    color: '#B71C1C',
    fontFamily: family.Bold,
  },
  lText: {
    fontSize: RF(7),
    color: '#FF6F00',
    fontFamily: family.Bold,
  },
  dishText: {
    fontSize: RF(10),
    color: palette.dark,
    fontFamily: family.Bold,
    marginBottom: HDP(6),
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
  dishInner: {
    margin: HDP(16),
    borderBottomWidth: 1,
    paddingBottom: HDP(20),
    borderBottomColor: '#ECEFF1',
  },
  innerText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: palette.dark,
    marginBottom: HDP(8),
  },
  dishAdd: {
    padding: HDP(16),
  },
  uncheckText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: '#90A4AE',
  },
  lineGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: HDP(16),
    borderBottomWidth: 1,
    paddingBottom: HDP(16),
    marginBottom: HDP(16),
    borderBottomColor: '#ECEFF1',
  },
  textBlue: {
    fontSize: RF(10),
    fontFamily: family.Bold,
    color: palette.blue,
  },
  sizeGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: HDP(8),
    justifyContent: 'space-between',
    paddingHorizontal: HDP(16),
    paddingVertical: HDP(12),
  },
  qBtn: {
    flexDirection: 'row',
    gap: HDP(24),
    paddingVertical: HDP(12),
    paddingHorizontal: HDP(16),
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#BBDEFB',
    alignSelf: 'flex-start',
    borderRadius: HDP(2),
  },
  ctaSection: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: HDP(13),
    alignSelf: 'center',
    paddingVertical: HDP(15),
    marginBottom: HDP(30),
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qText: {
    fontSize: RF(16),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  ctaBtn: {
    flex: 1,
  },
  floatCta: {
    backgroundColor: palette.blue,
    position: 'absolute',
    bottom: HDP(30),
    width: width * 0.95,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(10),
    justifyContent: 'space-between',
  },
  floatText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: palette.white,
  },
  topCta: {
    backgroundColor: palette.white,
    padding: HDP(10),
    borderRadius: HDP(100),
  },
  topOptions: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 50,
    zIndex: 99999,
    paddingHorizontal: HDP(8),
    width,
  },
});

export default styles;
