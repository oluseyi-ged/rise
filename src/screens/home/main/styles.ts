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
});

export default styles;
