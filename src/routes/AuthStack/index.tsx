import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CreateProfile,
  Describe,
  FinishProfile,
  ForgotPassword,
  Login,
  Otp,
  Phone,
  Pin,
  ResetPassword,
  ResetSuccess,
  SelfieScreen,
  Signin,
  Signup,
} from '@screens';
import {verticalAnimation} from '@utils';
import React from 'react';

const AuthStack = createNativeStackNavigator();
const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator initialRouteName="Describe">
      <AuthStack.Screen
        name="Login"
        component={Login}
        // @ts-ignore
        options={verticalAnimation}
      />
      <AuthStack.Screen
        name="Signup"
        component={Signup}
        // @ts-ignore
        options={verticalAnimation}
      />
      <AuthStack.Screen
        name="Signin"
        component={Signin}
        // @ts-ignore
        options={verticalAnimation}
      />
      <AuthStack.Screen
        name="Describe"
        component={Describe}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Otp"
        component={Otp}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Phone"
        component={Phone}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Pin"
        component={Pin}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ResetSuccess"
        component={ResetSuccess}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="SelfieScreen"
        component={SelfieScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="FinishProfile"
        component={FinishProfile}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreens;
