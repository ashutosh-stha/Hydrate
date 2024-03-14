import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Image,
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
import Images from '../../assets/images';
import LocationHelper, { Location } from '../../utils/LocationHelper';
import { isEmpty } from 'lodash';

const WATER_INTAKE_BUTTON = [75, 100, 125, 150, 175, 200];

export const HomeScreen = () => {
  const dispatch = useDispatch<Dispatch>();

  const {
    waterIntakeRequired: waterGoal,
    waterIntake,
    waterIntakeHistory,
    weatherInformation,
    weatherSubtitle,
  } = useSelector((state: RootState) => state.user);

  const [progress, setProgress] = useState<number>(0);
  const [location, setLocation] = useState<Location | undefined>();

  const getLocation = async () => {
    try {
      const locations = await new LocationHelper().getCurrentLocation();
      setLocation(locations);
    } catch (e) {
      console.log('Error retrieving location', e);
    }
  };

  const calculateProgress = useCallback(() => {
    if (waterGoal > 0) {
      setProgress(waterIntake / waterGoal);
    }
  }, [waterIntake, waterGoal]);

  useEffect(() => {
    dispatch.user.resetForNewDay();
    getLocation();
  }, [dispatch.user]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  useEffect(() => {
    if (location) {
      dispatch.user.getCurrentLocationWeather(location);
    }
  }, [dispatch.user, location]);

  const addWaterIntake = (water: number) => {
    const intake = waterIntake + water;
    dispatch.user?.setWaterIntake(intake);
    dispatch.user?.addWaterIntakeHistory({
      waterIntake: water,
      timeStamp: new Date(),
    });
  };

  const renderEmptyContainer = () => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={Images.DRINK_WATER} style={styles.drinkWaterImage} />
        <Text style={styles.emptyText}>Drink your water</Text>
      </View>
    );
  };
  const { width: deviceWidth } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.weatherContainer,
            isEmpty(weatherInformation) && styles.displayNone,
          ]}>
          <Text style={styles.weatherText}>{weatherInformation}</Text>
          <Text style={styles.weatherSubtitle}>{weatherSubtitle}</Text>
        </View>
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
          contentContainerStyle={styles.flatListContainer}
          renderItem={({ item }: { item: WaterIntake }) => (
            <HistoryItem
              waterIntake={item.waterIntake}
              timeStamp={item.timeStamp}
            />
          )}
          ListEmptyComponent={renderEmptyContainer}
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
  },
  emptyText: {
    color: PRIMARY_TEXT_COLOR,
    fontSize: 16,
  },
  drinkWaterImage: {
    height: 70,
    width: 70,
    marginBottom: 20,
  },
  weatherText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  weatherSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 6,
  },
  weatherContainer: {
    marginBottom: 10,
  },
  displayNone: {
    display: 'none',
  },
});
