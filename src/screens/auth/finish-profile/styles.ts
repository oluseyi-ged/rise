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
    justifyContent: 'center',
    marginTop: HDP(50),
  },
  headerLabel: {
    fontSize: RF(20),
    fontFamily: family.Regular,
    color: '#222',
    textAlign: 'center',
    width: width * 0.6,
    alignSelf: 'center',
  },
  headerSub: {
    fontSize: RF(15),
    fontFamily: family.Medium,
    color: '#71879C',
    textAlign: 'center',
    width: width * 0.6,
    alignSelf: 'center',
  },
  bottomText: {
    alignItems: 'center',
    width,
    marginBottom: HDP(20),
  },
});

export default style;
