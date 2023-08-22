import {HDP, RF} from '@helpers';
import {color, family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: HDP(24),
  },
  formView: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: HDP(20),
  },
  button: {
    width: '85%',
    alignSelf: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  bottomText: {
    alignItems: 'center',
    width,
    marginBottom: HDP(20),
  },
  wordCount: {
    color: color['Neutral/Neutral-400'],
    position: 'absolute',
    bottom: -13,
    right: 29,
    fontSize: RF(12),
    fontFamily: family.Regular,
  },
  headerLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
    marginBottom: HDP(8),
    textAlign: 'center',
  },
  headerSub: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: '#4C4D50',
    textAlign: 'center',
  },
  preview: {
    width: HDP(327),
    height: HDP(439),
  },
  cameraBox: {
    borderRadius: HDP(16),
    width: HDP(327),
    height: HDP(439),
    alignSelf: 'center',
    overflow: 'hidden',
    borderColor: '#6CCF00',
    position: 'relative',
  },
  cameraCrop: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    borderWidth: HDP(60),
    borderColor: 'rgba(215, 215, 215, 0.2)',
  },
});

export {styles};
