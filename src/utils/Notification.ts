import notifee, {
  AndroidLaunchActivityFlag,
  IntervalTrigger,
  TimeUnit,
  TriggerType,
} from '@notifee/react-native';

export class IntervalNotifcation {
  private notificatinIdKey: string = 'interval_notification_id';

  constructor(private hour: number) {
    notifee.requestPermission();
  }

  async scheduleNotification() {
    console.log(this.hour);
    const trigger: IntervalTrigger = {
      type: TriggerType.INTERVAL,
      interval: this.hour,
      timeUnit: TimeUnit.MINUTES,
    };

    const channelId = await notifee.createChannel({
      id: 'water-reminder',
      name: 'Drink Water',
    });

    await notifee.createTriggerNotification(
      {
        id: this.notificatinIdKey,
        title: 'Drink you water',
        body: "It's your time to drink",
        android: {
          channelId: channelId,
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
          },
        },
      },
      trigger,
    );
  }

  async cancelNotification() {
    await notifee.cancelNotification(this.notificatinIdKey);
  }
}
