import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  hueBg: {
    paddingTop: HDP(70),
    paddingBottom: HDP(30),
    paddingHorizontal: HDP(20),
  },
  paddingWrap: {
    paddingHorizontal: HDP(20),
  },
  mainText: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Bold,
    paddingVertical: HDP(16),
  },
  welcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#333333',
  },
  nameText: {
    fontSize: RF(20),
    fontFamily: family.Regular,
    color: '#333333',
  },
  headAside: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  referBtn: {
    backgroundColor: palette.teal,
    padding: HDP(8),
    borderRadius: HDP(16),
  },
  referTxt: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.white,
    alignSelf: 'center',
  },
  balBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.80)',
    borderRadius: HDP(10),
    padding: HDP(15),
    borderWidth: HDP(1),
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxHeader: {
    flexDirection: 'row',
    gap: HDP(10),
  },
  balText: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  balance: {
    fontSize: RF(32),
    fontFamily: family.Medium,
    color: '#333',
  },
  divide: {
    height: HDP(2),
    width: width * 0.5,
    backgroundColor: '#71879C1A',
    marginVertical: HDP(20),
  },
  plRow: {
    flexDirection: 'row',
    gap: HDP(5),
  },
  plText: {
    fontSize: RF(15),
    fontFamily: family.Medium,
    color: '#71879C',
  },
  indRow: {
    flexDirection: 'row',
    gap: HDP(6),
  },
  indicate: {
    width: HDP(12),
    height: HDP(7),
    backgroundColor: palette.teal,
    borderRadius: HDP(5.04),
  },
  unindicate: {
    width: HDP(7),
    height: HDP(7),
    backgroundColor: '#71879C33',
    borderRadius: HDP(5.04),
  },
  addCta: {
    flexDirection: 'row',
    gap: HDP(9),
    alignItems: 'center',
    padding: HDP(16),
    borderRadius: HDP(5),
    borderWidth: 1,
    borderColor: '#71879C33',
    justifyContent: 'center',
  },
  addText: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: palette.teal,
  },
  plansHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plansMain: {
    fontSize: RF(18),
    fontFamily: family.Regular,
    color: palette.black,
  },
  plansSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(5),
  },
  plansSub: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: '#94A1AD',
  },
  plansDesc: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  addInv: {
    backgroundColor: 'rgba(113, 135, 156, 0.10)',
    borderRadius: HDP(15),
    width: width * 0.5,
    height: HDP(243),
    justifyContent: 'center',
    marginRight: HDP(20),
  },
  addInvText: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: '#333333',
    width: '70%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  helpCta: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: HDP(12),
    shadowColor: '#00000090',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: HDP(12),
    elevation: 5,
    justifyContent: 'space-between',
  },
  helpLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(10),
  },
  helpText: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#171C22',
  },
  quoteBox: {
    backgroundColor: palette.teal,
    borderRadius: HDP(15),
    padding: HDP(20),
  },
  quoteHeader: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: '#fff',
  },
  divideMini: {
    height: HDP(2),
    width: width * 0.1,
    backgroundColor: '#fff',
    marginVertical: HDP(20),
  },
  quote: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#fff',
  },
  citeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  citeText: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: '#fff',
  },
  modalHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalHeadText: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: '#000',
  },
  modalSub: {
    fontSize: RF(15),
    fontFamily: family.Regular,
    color: '#71879C',
    alignSelf: 'center',
  },
  introItem: {
    flexDirection: 'row',
    gap: HDP(20),
    marginBottom: HDP(24),
    alignItems: 'flex-start',
  },
  introBold: {
    fontSize: RF(15),
    fontFamily: family.Bold,
    color: '#000',
    marginBottom: HDP(6),
  },
  introSub: {
    fontSize: RF(13),
    fontFamily: family.Regular,
    color: '#71879C',
  },
  bannerImg: {
    height: HDP(243),
    width: width * 0.5,
    borderRadius: HDP(15),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    paddingHorizontal: HDP(16),
    paddingBottom: HDP(18),
    borderRadius: HDP(15),
  },
  overlayText: {
    color: 'white',
    fontSize: RF(14),
    fontFamily: family.Bold,
  },
  overlayDesc: {
    color: 'white',
    fontSize: RF(14),
    fontFamily: family.Regular,
  },
  itemId: {
    gap: HDP(5),
    marginBottom: HDP(10),
  },
});

export default styles;
