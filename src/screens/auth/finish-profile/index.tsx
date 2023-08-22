import {Button, SizedBox, SvgIcon} from '@components';
import React, {FC} from 'react';
import {Dimensions, SafeAreaView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import style from './styles';

const {width} = Dimensions.get('window');

export const FinishProfile: FC = ({navigation}: any) => {
  return (
    <SafeAreaView style={style.pageWrap}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={style.container}>
          <SizedBox height={50} />
          <SvgIcon name="party" size={250} />
          <SizedBox height={25} />
          <Text style={style.headerLabel}>Sign Up{'\n'}Successfully</Text>
          <SizedBox height={16} />
          <Text style={style.headerSub}>
            Welcome to Moola microfinance bank app
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <View style={style.bottomText}>
        <Button
          title="Proceed to Login"
          containerStyle={{width: width * 0.9}}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  );
};
