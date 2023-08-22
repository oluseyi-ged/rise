import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
  },
  container: {
    paddingHorizontal: HDP(24),
  },
  welcomeLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.textWhite,
    width: width * 0.7,
    textAlign: 'center',
    alignSelf: 'center',
  },
  headerLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
    textAlign: 'center',
  },
  headerSub: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: '#98989A',
    textAlign: 'center',
  },
  welcomeSub: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.mutedGreen,
    width: width * 0.7,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: HDP(5),
  },
  forgotText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: '#4C4D50',
  },
  bottomText: {
    alignItems: 'center',
    width,
    marginBottom: HDP(20),
  },
  tcText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#f1f1f150',
    textAlign: 'center',
  },
  tcFade: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#009FA980',
  },
  ctaGrid: {
    flexDirection: 'row',
    gap: HDP(13),
  },
  forgotTxt: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: palette.black,
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
  backCta: {
    justifyContent: 'center',
    gap: HDP(2),
    paddingHorizontal: HDP(32),
    paddingVertical: HDP(10),
    alignItems: 'center',
  },
  backText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.white,
  },
  modalLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.dark,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.fadeBlack,
    marginTop: HDP(8),
    textAlign: 'center',
  },
  spanTxt: {
    color: palette.green,
  },
  phoneCta: {
    backgroundColor: palette.green,
    borderRadius: HDP(8),
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: HDP(20),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(16),
    alignItems: 'center',
  },
  bvnCta: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.green,
    borderRadius: HDP(8),
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: HDP(20),
    flexDirection: 'row',
    justifyContent: 'center',
    gap: HDP(16),
    alignItems: 'center',
  },
  phoneText: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.white,
  },
  bvnText: {
    fontSize: RF(14),
    fontFamily: family.Medium,
    color: palette.dark,
  },
  phoneBold: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.white,
  },
  bvnBold: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.green,
  },
  drawer: {
    width: HDP(60),
    height: HDP(4),
    backgroundColor: '#696A6C',
    borderRadius: HDP(100),
    alignSelf: 'center',
  },
  amtGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputStyle: {
    backgroundColor: 'transparent',
    height: HDP(70),
    borderWidth: 0,
    flexShrink: 3,
    paddingHorizontal: 0,
    marginTop: HDP(15),
  },
  textStyle: {
    color: '#2BD87C',
    fontSize: RF(35),
    fontFamily: family.Bold,
  },
  errored: {
    fontSize: RF(10),
    color: '#800000',
    fontFamily: family.Regular,
    alignSelf: 'center',
    marginTop: HDP(5),
  },
  downloadHeader: {
    height: HDP(150),
    backgroundColor: '#000',
    paddingTop: HDP(25),
    paddingBottom: HDP(51),
  },
  downloadtext: {
    color: palette.white,
    fontFamily: family.Bold,
    fontSize: RF(20),
    textAlign: 'center',
  },
  payTab: {
    backgroundColor: '#F8F8F8',
    borderColor: '#DBDBDB',
    borderWidth: 1,
    paddingHorizontal: HDP(15),
    paddingVertical: HDP(20),
    borderRadius: HDP(12),
    alignItems: 'center',
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: RF(12),
    color: 'black',
    fontFamily: family.Medium,
  },
  disclaimerDet: {
    fontSize: RF(12),
    color: 'black',
    marginTop: HDP(10),
    fontFamily: family.Regular,
    textAlign: 'center',
  },
  otherBorder: {
    borderBottomColor: '#DBDBDB',
    borderBottomWidth: 1,
    paddingBottom: HDP(16),
    marginBottom: HDP(21),
    paddingHorizontal: HDP(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  otherLeft: {
    fontSize: RF(10),
    color: '#455A64',
    fontFamily: family.Regular,
  },
  otherRight: {
    fontSize: RF(10),
    color: '#455A64',
    fontFamily: family.Bold,
  },
  disclaimerSection: {
    paddingVertical: HDP(22),
    paddingHorizontal: HDP(22),
  },
  acctName: {
    fontSize: RF(10),
    color: '#34C759',
    fontFamily: family.Bold,
  },
  acctErr: {
    fontSize: RF(10),
    color: 'red',
    fontFamily: family.Regular,
  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: HDP(24),
  },
  transTitle: {
    fontSize: RF(24),
    fontFamily: family.SemiBold,
    color: '#24B467',
    textAlign: 'center',
    flex: 1,
  },
  transGrid: {
    alignItems: 'center',
  },
  transNum: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
  },
  transId: {
    fontSize: RF(16),
    fontFamily: family.SemiBold,
    color: palette.fadeBlack,
  },
  lightText: {
    fontSize: RF(16),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  extraBox: {
    backgroundColor: '#ECF1FE',
    paddingVertical: HDP(18),
    width: width * 0.9,
    borderRadius: HDP(8),
  },
  payBorder: {
    paddingBottom: HDP(16),
    paddingHorizontal: HDP(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payLeft: {
    fontSize: RF(12),
    color: '#455A64',
    fontFamily: family.Regular,
  },
  payRight: {
    fontSize: RF(12),
    color: '#3C76F1',
    fontFamily: family.Medium,
  },
  underlineStyleBase: {
    backgroundColor: '#F6F6F6',
    borderWidth: 1,
    borderRadius: HDP(8),
    color: '#000',
    borderColor: '#E9E9E9',
  },
  sentHead: {
    fontSize: RF(24),
    color: '#1F2024',
    fontFamily: family.Bold,
    width: width * 0.7,
    textAlign: 'center',
  },
  sentDet: {
    fontSize: RF(16),
    color: '#696A6C',
    fontFamily: family.Medium,
    textAlign: 'center',
  },
  shareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(10),
    backgroundColor: '#ECF1FE',
    paddingVertical: HDP(8),
    paddingHorizontal: HDP(16),
    borderRadius: HDP(4),
  },
  shareTxt: {
    fontSize: RF(14),
    color: '#3C76F1',
    fontFamily: family.Medium,
    textAlign: 'center',
    paddingTop: HDP(2),
  },
  contained: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: HDP(200),
    height: HDP(200),
    borderRadius: HDP(1000),
    borderWidth: HDP(18),
    borderColor: '#D5F7E5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dot: {
    width: HDP(50),
    height: HDP(50),
    borderRadius: HDP(1000),
    backgroundColor: '#2BD87C',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: HDP(11.5),
    justifyContent: 'center',
  },
  quickItem: {
    backgroundColor: '#F6F6F6',
    paddingHorizontal: HDP(10),
    paddingVertical: HDP(5),
    borderRadius: HDP(4),
  },
  quickText: {
    fontSize: RF(14),
    color: '#BABABB',
    fontFamily: family.Bold,
  },
});

export default style;