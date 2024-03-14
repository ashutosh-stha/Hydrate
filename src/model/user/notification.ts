import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IntervalNotifcation } from '../../utils/Notification';

interface NofifcationsState {
  notificationReminder: boolean;
}

const initialState: NofifcationsState = {
  notificationReminder: false,
};

const intervalNotification = new IntervalNotifcation(2);

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

    async setIntervalNotificationReminder() {
      try {
        await intervalNotification.scheduleNotification();
        await AsyncStorage.setItem('notification-reminder', 'true');
      } catch (e) {
        console.error('Problem setting up reminder', e);
      }
    },

    async cancelNotificationReminder() {
      try {
        await intervalNotification.cancelNotification();
        await AsyncStorage.setItem('notification-reminder', 'false');
      } catch (e) {
        console.error('Problem setting up reminder', e);
      }
    },
  }),
});
