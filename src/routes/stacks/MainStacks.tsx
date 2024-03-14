import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BOTTOM_TAB_NAVIGATOR, LOGIN_SCREEN } from '../constants/Routes';
import { BottomTabNavigator } from '../../components/bottomNavigator/BottomNavigator';
import { LoginScreen } from '../../components/screens/LoginScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../model/store';

const MainStack = createNativeStackNavigator();

export const MainStackScreens: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.authentication.isLoggedIn,
  );
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <>
          <MainStack.Screen
            name={BOTTOM_TAB_NAVIGATOR}
            component={BottomTabNavigator}
          />
        </>
      ) : (
        <MainStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      )}
    </MainStack.Navigator>
  );
};
