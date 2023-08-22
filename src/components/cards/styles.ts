import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  miniBox: {
    borderRadius: HDP(7),
    paddingHorizontal: HDP(16),
    paddingTop: HDP(16),
    paddingBottom: HDP(24.87),
    marginBottom: HDP(20),
    backgroundColor: palette.textWhite,
    flexDirection: 'row',
    gap: HDP(16),
    width: width * 0.7,
    height: HDP(140),
  },

  miniImg: {
    width: '40%',
    height: '100%',
    borderRadius: HDP(5),
    backgroundColor: palette.purpleFade,
  },
  propName: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.purpleFade,
  },
  propAddy: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: '#13556D70',
  },
  addyGrid: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  propStar: {
    fontSize: RF(14),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    fontWeight: '700',
  },
  propRent: {
    fontSize: RF(10),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    fontWeight: '700',
  },
  fullRent: {
    fontSize: RF(16),
    fontFamily: family.Bold,
    color: palette.mutedGreen,
    marginBottom: HDP(5),
  },
  subRent: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.purpleFade,
  },
  rentSub: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.mutedGreen,
    fontWeight: '700',
  },
  topView: {
    height: HDP(111),
    width: '100%',
    backgroundColor: palette.purpleFade,
    borderRadius: HDP(10),
  },
  fullImg: {
    width: '100%',
    height: '100%',
    borderRadius: HDP(10),
    backgroundColor: palette.purpleFade,
  },
  feeBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: palette.purple,
    padding: HDP(10),
    borderRadius: HDP(5),
    borderTopRightRadius: HDP(0),
  },
  availText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.green,
    fontWeight: '700',
  },
  proText: {
    fontSize: RF(6),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    fontWeight: '700',
  },
  faved: {
    position: 'absolute',
    top: 0,
    padding: HDP(10),
    zIndex: 9999,
  },
  fullBox: {
    marginBottom: HDP(16),
  },
  imgBanner: {
    height: HDP(198),
    width: '70%',
    borderTopLeftRadius: HDP(4),
    borderTopRightRadius: HDP(4),
  },
  imgFlex: {
    height: HDP(95),
    borderTopLeftRadius: HDP(4),
    borderBottomRightRadius: HDP(4),
  },
  imgGrid: {
    flexDirection: 'row',
    gap: HDP(8),
  },
  imgSide: {
    gap: HDP(8),
    flex: 1,
  },
  kitchenName: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: palette.dark,
    fontWeight: '600',
  },
  rateBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratetext: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  imgWide: {
    width: width * 0.7,
    height: HDP(160),
    borderRadius: HDP(4),
  },
  detsFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  floatLike: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: HDP(5),
    borderRadius: HDP(100),
    padding: HDP(5),
    right: HDP(10),
  },
});

export default styles;
