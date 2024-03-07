import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from '../../components/screens/HomeScreens';

const MainStack = createNativeStackNavigator();

export const MainStackScreens: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: true}}
      />
    </MainStack.Navigator>
  );
};
