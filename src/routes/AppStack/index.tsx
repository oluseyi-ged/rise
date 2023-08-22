import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabsStackScreens} from '@routes/Tabs';
import {
  Account,
  Address,
  AddressVerification,
  Bills,
  BvnVerified,
  Cart,
  ChangePassword,
  ChangePin,
  Email,
  Favs,
  Help,
  IDVerification,
  Kitchen,
  Kitchens,
  Limits,
  More,
  Notifications,
  Personal,
  PrivacyPolicy,
  Profile,
  Referrals,
  RequestMoney,
  ResetPin,
  Security,
  SendMoney,
  Statements,
  Terms,
  VerifyIdentity,
} from '@screens';

import React from 'react';

const AppStack = createNativeStackNavigator();
const AppStackScreens = () => {
  return (
    <AppStack.Navigator initialRouteName={'AppHome'}>
      <AppStack.Screen
        name="AppHome"
        component={TabsStackScreens}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="AppBills"
        component={Bills}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Kitchens"
        component={Kitchens}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Kitchen"
        component={Kitchen}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ChangePin"
        component={ChangePin}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="ResetPin"
        component={ResetPin}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Statements"
        component={Statements}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Security"
        component={Security}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="AppMore"
        component={More}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Referrals"
        component={Referrals}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Limits"
        component={Limits}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="RequestMoney"
        component={RequestMoney}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="SendMoney"
        component={SendMoney}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="IDVerify"
        component={VerifyIdentity}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="BvnVerified"
        component={BvnVerified}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="addressVerify"
        component={AddressVerification}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="idVerification"
        component={IDVerification}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Personal"
        component={Personal}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Email"
        component={Email}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Address"
        component={Address}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Favs"
        component={Favs}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
