/* eslint-disable react-native/no-inline-styles */
import {Button, SizedBox, SvgIcon} from '@components';
import {HDP} from '@helpers';
import {flash} from '@helpers/FlashMessageHelpers';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useOauthMutation} from '@services/mutationApi';
import {setAuth} from '@slices/auth';
import {setLogged} from '@slices/logged';
import {setProfile} from '@slices/profile';
import React, {FC, useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from 'store';
import style from './styles';

export const Login: FC = ({navigation}: any) => {
  const [oData, setOData] = useState<any>({});
  const dispatch = useAppDispatch();
  const [gToken, setGToken] = useState<any>('');

  const [oauth, {data, isLoading, isSuccess, isError, error, reset}] =
    useOauthMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data?.userAccount?.accountSetupStage === 'SETUP_COMPLETED') {
        dispatch(setProfile(data));
        dispatch(setLogged(true));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        });
      } else {
        console.log(data, oData);
        dispatch(setAuth(data));
        navigation.navigate('CreateProfile', {data: data, oauth: oData});
      }
    }
    if (isError) {
      console.log(error);
      //@ts-ignore
      flash.danger({
        //@ts-ignore
        description: isError?.data?.message,
      });
      reset();
    }
  }, [data, dispatch, error, isError, isSuccess, navigation, oData, reset]);

  useEffect(() => {
    if (gToken?.length) {
      auth().onAuthStateChanged(user => {
        if (user) {
          user.getIdToken().then(token => {
            console.log('first', token);
            oauth({
              idToken: token,
            });
          });
        } else {
          console.log('');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gToken]);

  const GoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn().then(result => {
        const googleCredential = auth.GoogleAuthProvider.credential(
          result?.idToken,
        );
        setOData(result?.user);
        setGToken('trigger');
        return auth().signInWithCredential(googleCredential);
      });
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('User cancelled the login flow !');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(err);
      }
    }
  };

  return (
    <SafeAreaView style={style.pageWrap}>
      <ScrollView contentContainerStyle={style.pageWrap}>
        <View style={style.upperBox}>
          <SizedBox height={80} />
          <Text style={style.welcomeTxt}>Welcome to</Text>
          <SizedBox height={12} />
          <SvgIcon name="logo" size={200} containerStyle={{height: HDP(52)}} />
        </View>
        <View>
          <View style={style.bottomBox}>
            <Text style={[style.existSpan, {textDecorationLine: 'none'}]}>
              Welcome back!
            </Text>
            <SizedBox height={11} />
            <Text
              style={[
                style.existText,
                {textAlign: 'left', alignSelf: 'flex-start'},
              ]}>
              Login now and get access to thousands of home cooked meals on
              <Text style={[style.existSpanDark, {textDecorationLine: 'none'}]}>
                {' '}
                Cheffie.App!
              </Text>
            </Text>
            <SizedBox height={21} />
            <Button
              iconName="email"
              bordered
              title="Continue with Email"
              onPress={() => navigation.navigate('Signin', {mode: 'mail'})}
            />
            <SizedBox height={14} />
            <Text style={style.orText}>or</Text>
            <SizedBox height={14} />
            <Button
              iconName="google"
              onPress={GoogleSignUp}
              loading={isLoading}
              bordered
              title="Continue with Google"
            />
            <SizedBox height={16} />
            <Button
              iconName="phone"
              bordered
              title="Continue with Phone Number"
              onPress={() => navigation.navigate('Signin', {mode: 'phone'})}
            />
            <SizedBox height={24} />
            <TouchableOpacity onPress={() => navigation.navigate('Describe')}>
              <Text style={style.existText}>
                Don't have an account?{' '}
                <Text style={style.existSpan}>Register</Text>
              </Text>
            </TouchableOpacity>
            <SizedBox height={34} />
            <TouchableOpacity>
              <Text style={style.existText}>
                By continuing, I agree to the and{' '}
                <Text style={style.existSpanDark}>Terms of Use</Text> and{' '}
                <Text style={style.existSpanDark}>Privacy Policy.</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
