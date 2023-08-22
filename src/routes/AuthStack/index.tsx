import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CreateProfile, FinishProfile, Login, Pin, Signup} from '@screens';
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
