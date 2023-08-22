/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import {NavMenu} from '@components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '@screens';
import {Dimensions, Platform, View} from 'react-native';
const {width, height} = Dimensions.get('window');

const Tabs = createBottomTabNavigator();

export const TabsStackScreens = () => {
  return (
    <View
      style={{
        width,
        height: Platform.OS === 'android' ? height - 30 : height - 15,
      }}>
      <Tabs.Navigator
        tabBar={props => <NavMenu {...props} />}
        // @ts-ignore
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
        initialRouteName="Home">
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Plans" component={Home} />
        <Tabs.Screen name="Wallet" component={Home} />
        <Tabs.Screen name="Feed" component={Home} />
        <Tabs.Screen name="Account" component={Home} />
      </Tabs.Navigator>
    </View>
  );
};
