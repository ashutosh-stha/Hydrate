import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '../../model/store';
import { Chip } from '@rneui/themed';
import {
  LIGHt_PRIMARY_COLOR,
  PRIMARY_COLOR,
  PRIMARY_TEXT_COLOR,
} from '../../assets/colors';
import { WaterIntake } from '../../model/user/user';
import { HistoryItem } from '../../commonComponents/HistoryItem';

const WATER_INTAKE_BUTTON = [75, 100, 125, 150, 175, 200];

export const HomeScreen = () => {
  const dispatch = useDispatch<Dispatch>();
  const waterGoal = useSelector(
    (state: RootState) => state.user.waterIntakeRequired,
  );
  const waterIntake = useSelector((state: RootState) => {
    return state.user?.waterIntake;
  });
  const waterIntakeHistory = useSelector(
    (state: RootState) => state.user?.waterIntakeHistory,
  );

  const [progress, setProgress] = useState<number>(0);

  const calculateProgress = useCallback(() => {
    if (waterGoal > 0) {
      setProgress(waterIntake / waterGoal);
    }
  }, [waterIntake, waterGoal]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  const addWaterIntake = (water: number) => {
    const intake = waterIntake + water;
    dispatch.user?.setWaterIntake(intake);
    dispatch.user?.addWaterIntakeHistory({
      waterIntake: water,
      timeStamp: new Date(),
    });
  };

  const { width: deviceWidth } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={[styles.rowDirection, styles.headerContainer]}>
          <Text style={styles.goalStyle}>{`Daily Goal: ${waterGoal}ml`}</Text>
          <Text style={styles.remainingStyle}>{`${waterIntake}ml`}</Text>
        </View>
        <Progress.Bar
          width={deviceWidth - 30}
          height={15}
          indeterminate={false}
          progress={progress}
          animated
          style={styles.progressBar}
          borderRadius={10}
        />
        <Text style={styles.goalStyle}>Log Water</Text>
        <View style={[styles.rowDirection, styles.wrapContainer]}>
          {WATER_INTAKE_BUTTON.map(water => {
            return (
              <Chip
                key={water}
                title={`${water}ml`}
                onPress={() => {
                  addWaterIntake(water);
                }}
                containerStyle={styles.chipContainerStyle}
                titleStyle={styles.remainingStyle}
                buttonStyle={{ backgroundColor: LIGHt_PRIMARY_COLOR }}
              />
            );
          })}
        </View>
        <Text style={styles.goalStyle}>History</Text>
        <FlatList
          data={waterIntakeHistory}
          renderItem={({ item }: { item: WaterIntake }) => (
            <HistoryItem
              waterIntake={item.waterIntake}
              timeStamp={item.timeStamp}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    paddingHorizontal: 20,
    flex: 1,
  },
  progressBar: {
    alignSelf: 'center',
    marginVertical: 8,
    marginBottom: 20,
  },
  rowDirection: {
    flexDirection: 'row',
  },
  headerContainer: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goalStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: PRIMARY_TEXT_COLOR,
  },
  remainingStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: PRIMARY_TEXT_COLOR,
  },
  wrapContainer: {
    flexWrap: 'wrap',
    marginTop: 16,
    marginBottom: 16,
  },
  chipContainerStyle: {
    marginHorizontal: 3,
    marginVertical: 6,
    width: '30%',
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
});
