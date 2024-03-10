import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { MainStackScreens } from './stacks/MainStacks';

const RootStack = createNativeStackNavigator();

export const RootStackScreen: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen
        name="Main"
        component={MainStackScreens}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};
