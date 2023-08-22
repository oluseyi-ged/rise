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
    alignSelf: 'center',
  },
  headerLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.green,
    textAlign: 'center',
  },
  headerSub: {
    fontSize: RF(16),
    fontFamily: family.Medium,
    color: '#696A6C',
    textAlign: 'center',
  },
  bottomText: {
    alignItems: 'center',
    width,
    marginBottom: HDP(20),
  },
});

export default style;
