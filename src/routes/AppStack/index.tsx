import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TabsStackScreens} from '@routes/Tabs';
import {
  GoalAmount,
  GoalDate,
  GoalPlan,
  PlanSuccess,
  Projections,
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
        name="GoalAmount"
        component={GoalAmount}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="GoalPlan"
        component={GoalPlan}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="GoalDate"
        component={GoalDate}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="Projections"
        component={Projections}
        options={{
          headerShown: false,
        }}
      />
      <AppStack.Screen
        name="PlanSuccess"
        component={PlanSuccess}
        options={{
          headerShown: false,
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
