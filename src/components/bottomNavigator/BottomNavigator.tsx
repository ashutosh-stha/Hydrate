import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  HOME_SCREEN,
  USER_SCREEN,
  WEATHER_SCREEN,
} from '../../routes/constants/Routes';
import { HomeScreen } from '../screens/HomeScreens';
import { UserScreen } from '../screens/UserScreen';
import { WeatherScreen } from '../screens/WeatherScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '../../assets/colors';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const tabIcon = (color: string, size: number = 20, name: string) => {
    return <MaterialCommunityIcons name={name} color={color} size={size} />;
  };
  return (
    <BottomTab.Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => tabIcon(color, size, 'home'),
        }}
      />
      <BottomTab.Screen
        name={USER_SCREEN}
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) =>
            tabIcon(color, size, 'face-man-profile'),
        }}
      />
      <BottomTab.Screen
        name={WEATHER_SCREEN}
        component={WeatherScreen}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({ color, size }) => tabIcon(color, size, 'cloud'),
        }}
      />
    </BottomTab.Navigator>
  );
};
