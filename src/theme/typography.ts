import {Platform} from 'react-native';

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  Light: Platform.select({
    ios: 'IBMPlexSans-Light', // The font family name
    android: 'IBMPlexSans-Light', // The file name
  }),
  Bold: Platform.select({
    ios: 'IBMPlexSans-Bold', // The font family name
    android: 'IBMPlexSans-Bold', // The file name
  }),
  Regular: Platform.select({
    ios: 'IBMPlexSans-Regular', // The font family name
    android: 'IBMPlexSans-Regular', // The file name
  }),
  ExtraBold: Platform.select({
    ios: 'IBMPlexSans-ExtraBold', // The font family name
    android: 'IBMPlexSans-ExtraBold', // The file name
  }),
  Medium: Platform.select({
    ios: 'IBMPlexSans-Medium', // The font family name
    android: 'IBMPlexSans-Medium', // The file name
  }),
  SemiBold: Platform.select({
    ios: 'IBMPlexSans-SemiBold', // The font family name
    android: 'IBMPlexSans-SemiBold', // The file name
  }),
};
