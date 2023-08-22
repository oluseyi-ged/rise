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
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useAppDispatch} from 'store';
import style from './styles';

export const Describe: FC = ({navigation}: any) => {
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
        description: error?.data?.message,
      });
      reset();
    }
  }, [data, dispatch, error, isError, isSuccess, navigation, oData, reset]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        // '586721565558-sp80bmg69pihmpn9rumv58v1qahr6bd5.apps.googleusercontent.com',
        '586721565558-b9vkec3tbfmsaba0rfgcr06a99dl6rco.apps.googleusercontent.com',
    });
  }, []);

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
        console.log(result);
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
      <View />
      <View>
        <View style={style.upperBox}>
          <Text style={style.welcomeTxt}>Welcome top</Text>
          <SizedBox height={12} />
          <SvgIcon name="logo" size={200} containerStyle={{height: HDP(52)}} />
        </View>
        <SizedBox height={52} />
        <View style={style.bottomBox}>
          <Button
            iconName="email"
            bordered
            title="Continue with Email"
            onPress={() => navigation.navigate('Signup', {mode: 'mail'})}
          />
          <SizedBox height={16} />
          <Button
            iconName="google"
            bordered
            title="Continue with Google"
            onPress={GoogleSignUp}
            loading={isLoading}
          />
          <SizedBox height={16} />
          <Button
            iconName="phone"
            bordered
            title="Continue with Phone Number"
            onPress={() => navigation.navigate('Signup', {mode: 'phone'})}
          />
          <SizedBox height={24} />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={style.existText}>
              Already have an account?{' '}
              <Text style={style.existSpan}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <SizedBox height={68} />
      </View>
      <View style={style.optFloat}>
        <Text style={style.floatText}>Are you #kitchenpreneur? </Text>
        <TouchableOpacity>
          <Text style={style.floatSub}>Start here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
