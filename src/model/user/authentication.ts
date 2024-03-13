import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IntervalNotifcation } from '../../utils/Notification';

interface User {
  email: string;
  password: string;
}
interface AuthenticationState {
  isLoggedIn: Boolean;
  user?: User;
  invalidCredentialsMessage: string;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: undefined,
  invalidCredentialsMessage: '',
};

export const authentication = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setIsLoggedIn(state, payload) {
      return { ...state, isLoggedIn: payload };
    },
    setInvalidCredentialsMessage(state, payload: string) {
      return { ...state, invalidCredentialsMessage: payload };
    },
  },
  effects: dispatch => ({
    initialize() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          dispatch.authentication.setIsLoggedIn(true);
        } else {
          dispatch.authentication.setIsLoggedIn(false);
        }
      });
    },
    async createUserWithEmail(payload) {
      const { email, password } = payload;
      dispatch.authentication.setInvalidCredentialsMessage('');
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          dispatch.authentication.setInvalidCredentialsMessage(
            'Email Already exists',
          );
        } else {
          dispatch.authentication.setInvalidCredentialsMessage(
            'Error signing up',
          );
        }
      }
    },

    async signInUserWithEmail(payload) {
      const { email, password } = payload;
      dispatch.authentication.setInvalidCredentialsMessage('');
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error: any) {
        console.log('error', error.code);
        dispatch.authentication.setInvalidCredentialsMessage(
          'Invalid credentials',
        );
      }
    },
    async userSignOut() {
      try {
        await firebase.auth().signOut();
        dispatch.user.reset();
        await AsyncStorage.clear();
        new IntervalNotifcation(2).cancelNotification();
      } catch (e: any) {
        console.log('Error on logout', e);
      }
    },
  }),
});
