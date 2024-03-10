import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

interface User {
  email: string;
  password: string;
}
interface AuthenticationState {
  isLoggedIn: Boolean;
  user?: User;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: undefined,
};

export const authentication = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setIsLoggedIn(state, payload) {
      return { ...state, isLoggedIn: payload };
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
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email Already exists');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log('why this error', error);
      }
    },

    async signInUserWithEmail(payload) {
      const { email, password } = payload;
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email Already exists');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log(error);
      }
    },
    async userSignOut() {
      try {
        await firebase.auth().signOut();
      } catch (e: any) {
        console.log('Error on logout', e);
      }
    },
  }),
});
