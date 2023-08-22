import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: HDP(16),
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: HDP(12),
  },
  headerText: {
    fontSize: RF(14),
    color: palette.dark,
    fontFamily: family.Medium,
  },
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
  },
  paddingWrap: {
    paddingHorizontal: HDP(16),
  },
  mainText: {
    fontSize: RF(12),
    color: palette.dark,
    fontFamily: family.Medium,
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
    paddingBottom: HDP(16),
  },
  foodText: {
    fontSize: RF(9),
    color: palette.dark,
    fontFamily: family.Bold,
  },
  divide: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: '#ECEFF1',
  },
  searchBox: {
    height: HDP(45),
    alignItems: 'center',
  },
  noneView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noneText: {
    fontSize: RF(9),
    color: palette.dark,
    fontFamily: family.Bold,
  },
});

export default styles;
