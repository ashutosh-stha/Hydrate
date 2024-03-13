import { Switch } from '@rneui/base';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IntervalNotifcation } from '../../utils/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../../model/store';

export const WeatherScreen = () => {
  const reminderStatus = useSelector(
    (state: RootState) => state.notifications.notificationReminder,
  );
  const dispatch = useDispatch<Dispatch>();
  const intervalNotification = new IntervalNotifcation(15);
  const [reminder, setReminder] = useState(reminderStatus);
  const onSwitchChange = (value: boolean) => {
    if (value) {
      intervalNotification.scheduleNotification();
    } else {
      intervalNotification.cancelNotification();
    }
    dispatch.notifications.setNotificationReminder(value);
    setReminder(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Weather Screen</Text>
      <Switch value={reminder} onValueChange={onSwitchChange} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
