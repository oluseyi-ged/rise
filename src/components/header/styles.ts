import {HDP, RF} from '@helpers';
import {family, palette} from '@theme';
import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: HDP(20),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.9,
    marginBottom: HDP(5),
  },
  headerAside: {
    flexDirection: 'row',
    gap: HDP(10),
  },
  headerText: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.purpleFade,
    fontWeight: '700',
  },
  locView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locText: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.purple,
    marginLeft: HDP(5),
  },
});

export default styles;
