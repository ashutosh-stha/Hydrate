import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import * as Routes from '../../routes/constants/Routes';
import { HomeScreen } from '../screens/HomeScreens';
import { UserScreen } from '../screens/UserScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Colors from '../../assets/colors';
import { Button } from '@rneui/themed';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../model/store';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const dispatch = useDispatch<Dispatch>();
  const tabIcon = (color: string, size: number = 20, name: string) => {
    return <MaterialCommunityIcons name={name} color={color} size={size} />;
  };

  const renderLogoutButton = () => {
    return (
      <Button
        title={'Logout'}
        onPress={() => {
          dispatch.authentication.userSignOut();
        }}
        type="clear"
      />
    );
  };

  return (
    <BottomTab.Navigator
      initialRouteName={Routes.HOME_SCREEN}
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY_COLOR,
        headerTitle: 'Hydrate',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 30,
        },
        headerRight: renderLogoutButton,
      }}>
      <BottomTab.Screen
        name={Routes.HOME_SCREEN}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => tabIcon(color, size, 'home'),
        }}
      />
      <BottomTab.Screen
        name={Routes.USER_SCREEN}
        component={UserScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) =>
            tabIcon(color, size, 'face-man-profile'),
        }}
      />
    </BottomTab.Navigator>
  );
};
