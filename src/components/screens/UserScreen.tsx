import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Color from '../../assets/colors';
import { ControlledTextInput } from '../../commonComponents/ControlledTextInput';
import { Chip } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ActionButton } from '../../commonComponents/ActionButton';
import { isEmpty, toNumber } from 'lodash';
import { Dispatch, RootState } from '../../model/store';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from '@rneui/base';
import { IntervalNotifcation } from '../../utils/Notification';
import { extractDigits } from '../../utils/helperFunctions';

const ActivityLevels = [
  { name: 'Sedentary', value: 1.0 },
  { name: 'Light', value: 1.1 },
  { name: 'Moderate', value: 1.4 },
  { name: 'Active', value: 1.8 },
  { name: 'Very Active', value: 2.0 },
];

export const UserScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const userStateData = useSelector((state: RootState) => {
    return state.user;
  });
  const { waterIntakeRequired, user } = userStateData;
  const reminderStatus = useSelector(
    (state: RootState) => state.notifications.notificationReminder,
  );
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [ageError, setAgeError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [activityLevel, setActivityLevel] = useState<any>(
    ActivityLevels[0].value,
  );

  useEffect(() => {
    dispatch.user.getUserData();
  }, [dispatch.user]);

  useEffect(() => {
    setAge(user?.age.toString() || '');
    setWeight(user?.weight.toString() || '');
    setActivityLevel(user?.activityLevel || ActivityLevels[0].value);
  }, [user]);

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

  const calculateWaterAmount = () => {
    const isAgeEmpty = isEmpty(age);
    const isWeightEmpty = isEmpty(weight);
    setWeightError(isWeightEmpty);
    setAgeError(isAgeEmpty);
    if (isAgeEmpty || isWeightEmpty) {
      return null;
    }
    dispatch.user.calculateWaterIntake({
      age: toNumber(age),
      weight: toNumber(weight),
      activityLevel,
    });
  };

  const getTitle = useCallback(() => {
    if (waterIntakeRequired && waterIntakeRequired > 0) {
      return `To stay hydrated your body needs ${waterIntakeRequired} ml of water per day.`;
    }
    return 'Please provide age, weight, and activity level for water calculation';
  }, [waterIntakeRequired]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <>
          <View style={styles.titleContainer}>
            <Text style={styles.titleStyle}>{getTitle()}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.inputViewContainer}>
              <ControlledTextInput
                title="Age"
                keyboardType="numeric"
                value={age}
                onChange={setAge}
                maxLength={2}
                placeholder="Age"
                parseValue={extractDigits}
                error={ageError}
                errorMessage="Enter age"
                container={styles.inputContainer}
              />
              <ControlledTextInput
                title="Weight"
                keyboardType="numeric"
                value={weight}
                onChange={setWeight}
                error={weightError}
                maxLength={3}
                parseValue={extractDigits}
                placeholder="Weight"
                container={styles.inputContainer}
                errorMessage="Enter weight"
              />
            </View>
            <Text style={styles.activityTitleStyle}>Activity Level</Text>
            <View style={styles.chipContainer}>
              {ActivityLevels.map(({ name, value }) => {
                return (
                  <Chip
                    key={`${name}_${value}`}
                    type={value === activityLevel ? undefined : 'outline'}
                    title={name}
                    containerStyle={styles.chipStyle}
                    onPress={() => {
                      setActivityLevel(value);
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.switchContainerStyle}>
              <Text style={[styles.activityTitleStyle, styles.reminderStyle]}>
                Remind Me
              </Text>
              <Switch value={reminder} onValueChange={onSwitchChange} />
            </View>
          </View>
        </>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior="padding">
        <ActionButton
          title="Calculate"
          onPress={() => {
            calculateWaterAmount();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingTop: 16,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.PRIMARY_TEXT_COLOR,
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 14,
  },
  chipStyle: {
    marginHorizontal: 4,
    marginVertical: 6,
    width: '30%',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  activityTitleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    color: Color.PRIMARY_TEXT_COLOR,
  },
  inputViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 0.48,
  },
  switchContainerStyle: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderStyle: {
    marginBottom: 0,
  },
});
