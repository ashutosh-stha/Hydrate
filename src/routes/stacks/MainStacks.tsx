import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BOTTOM_TAB_NAVIGATOR } from '../constants/Routes';
import { BottomTabNavigator } from '../../components/bottomNavigator/BottomNavigator';

const MainStack = createNativeStackNavigator();

export const MainStackScreens: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName={BOTTOM_TAB_NAVIGATOR}>
      <MainStack.Screen
        name={BOTTOM_TAB_NAVIGATOR}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </MainStack.Navigator>
  );
};
