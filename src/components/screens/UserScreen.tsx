import React, { useCallback, useState } from 'react';
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

const ActivityLevels = [
  { name: 'Sedentary', value: 1.0 },
  { name: 'Light', value: 1.1 },
  { name: 'Moderate', value: 1.4 },
  { name: 'Active', value: 1.8 },
  { name: 'Very Active', value: 2.0 },
];

export const UserScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const waterIntakeRequired = useSelector((state: RootState) => {
    return state.user.waterIntakeRequired;
  });
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [ageError, setAgeError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [activityLevel, setActivityLevel] = useState<any>(
    ActivityLevels[0].value,
  );

  const validateInput = () => {
    setAgeError(isEmpty(age));
    setWeightError(isEmpty(weight));
    calculateWaterAmount();
  };

  const calculateWaterAmount = () => {
    if (ageError || weightError) {
      return null;
    }
    dispatch.user.calculateWaterIntake({
      age: toNumber(age),
      weight: toNumber(weight),
      activityLevel,
    });
  };

  const getTitle = useCallback(() => {
    if (waterIntakeRequired) {
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
            <ControlledTextInput
              title="Age"
              keyboardType="numeric"
              value={age}
              onChange={setAge}
              maxLength={2}
              error={ageError}
              errorMessage="Enter age"
            />
            <ControlledTextInput
              title="Weight"
              keyboardType="numeric"
              value={weight}
              onChange={setWeight}
              error={weightError}
              maxLength={3}
              errorMessage="Enter weight"
            />
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
          </View>
        </>
      </KeyboardAwareScrollView>
      <KeyboardAvoidingView behavior="padding">
        <ActionButton
          onPress={() => {
            validateInput();
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 20,
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.PRIMARY_TEXT_COLOR,
  },
  bodyContainer: {
    marginHorizontal: 20,
    marginTop: 16,
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
});
