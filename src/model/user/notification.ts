import { createModel } from '@rematch/core';
import notifee from '@notifee/react-native';
import { RootModel } from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NofifcationsState {
  notificationReminder: boolean;
}

const initialState: NofifcationsState = {
  notificationReminder: false,
};

export const notifications = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setNotificationReminder(state, payload: boolean) {
      return { ...state, notificationReminder: payload };
    },
  },
  effects: dispatch => ({
    async initialize() {
      try {
        const reminder = await AsyncStorage.getItem('notification-reminder');
        dispatch.notifications.setNotificationReminder(reminder === 'true');
      } catch (e) {
        console.error('Problem getting reminder', e);
      }
    },

    async setNotificationReminder(payload: boolean) {
      try {
        await AsyncStorage.setItem('notification-reminder', `${payload}`);
      } catch (e) {
        console.error('Problem setting up reminder', e);
      }
    },
  }),
});
