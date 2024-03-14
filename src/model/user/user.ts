import { createModel } from '@rematch/core';
import { RootModel } from '../models';
import { Location } from '../../utils/LocationHelper';
import Weather from '../../controller/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  age: number;
  weight: number;
  activityLevel: number;
}

export type WaterIntake = {
  waterIntake: number;
  timeStamp: Date;
};

export type WeatherData = {
  current: {
    temp: number;
    humidity: number;
  };
};

interface UserState {
  user?: UserData;
  waterIntake: number;
  waterIntakeRequired: number;
  waterIntakeHistory: WaterIntake[];
  weatherInformation: string;
  weatherSubtitle: '';
}

const initialState: UserState = {
  user: undefined,
  waterIntake: 0,
  waterIntakeRequired: 0,
  waterIntakeHistory: [],
  weatherInformation: '',
  weatherSubtitle: '',
};
export const user = createModel<RootModel>()({
  state: initialState,
  reducers: {
    setUserData(state, payload) {
      return { ...state, user: payload };
    },
    setWaterIntakeRequired(state, payload) {
      return { ...state, waterIntakeRequired: payload };
    },
    setWaterIntake(state, payload) {
      return { ...state, waterIntake: payload };
    },
    setWaterIntakeHistory(state, payload) {
      return {
        ...state,
        waterIntakeHistory: payload,
      };
    },
    setWeatherInformation(state, payload) {
      return { ...state, weatherInformation: payload };
    },
    setWeatherSubtitle(state, payload) {
      return { ...state, weatherSubtitle: payload };
    },
    reset() {
      return initialState;
    },
  },
  effects: dispatch => ({
    async getUserData() {
      const [userData, waterIntakeRequired, waterIntakeHistory, waterIntake] =
        await Promise.all([
          AsyncStorage.getItem('user-data'),
          AsyncStorage.getItem('water-intake-required'),
          AsyncStorage.getItem('water-intake-history'),
          AsyncStorage.getItem('water-intake'),
        ]);
      if (userData) {
        dispatch.user.setUserData(JSON.parse(userData));
      }
      dispatch.user.setWaterIntakeRequired(
        waterIntakeRequired ? parseInt(waterIntakeRequired, 10) : 0,
      );
      dispatch.user.setWaterIntake(waterIntake ? parseInt(waterIntake, 10) : 0);
      if (waterIntakeHistory) {
        dispatch.user.setWaterIntakeHistory(JSON.parse(waterIntakeHistory));
      }
    },
    async calculateWaterIntake(payload: UserData) {
      const requiredWaterIntake = calculateWaterIntakeRequired(payload);
      dispatch.user.setUserData(payload);
      dispatch.user.setWaterIntakeRequired(requiredWaterIntake.toFixed(0));
      await Promise.all([
        AsyncStorage.setItem('user-data', JSON.stringify(payload)),
        AsyncStorage.setItem(
          'water-intake-required',
          requiredWaterIntake.toFixed(0).toString(),
        ),
      ]);
    },
    async getCurrentLocationWeather(payload: Location, rootState) {
      const weather = new Weather(rootState.httpClient.apiService);
      const response = await weather.getCurrentLocationWeather({
        lat: payload.latitude,
        lon: payload.longitude,
        exclude: 'daily,hourly,alerts,minutely',
      });
      if (response) {
        const weatherString = getTemperatureText(response.current.temp);
        let temperatureText: string = `The current temperature is ${response.current.temp}\u00b0C`;
        dispatch.user.setWeatherInformation(temperatureText);
        dispatch.user.setWeatherSubtitle(weatherString);
      }
    },
    async addWaterIntakeHistory(payload, rootState) {
      const historyList = [payload, ...rootState.user.waterIntakeHistory];
      const waterIntake = rootState.user.waterIntake;
      dispatch.user.setWaterIntakeHistory(historyList);
      await Promise.all([
        AsyncStorage.setItem(
          'water-intake-history',
          JSON.stringify(historyList),
        ),
        AsyncStorage.setItem('water-intake', waterIntake.toString()),
      ]);
    },

    async resetForNewDay() {
      try {
        const lastClearedDate = await AsyncStorage.getItem('lastClearedDate');

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (!lastClearedDate || lastClearedDate !== currentDate.toISOString()) {
          Promise.all([
            AsyncStorage.setItem('water-intake', '0'),
            AsyncStorage.setItem('water-intake-history', '[]'),
            AsyncStorage.setItem('lastClearedDate', currentDate.toISOString()),
          ]);
          dispatch.user.setWaterIntake(0);
          dispatch.user.setWaterIntakeHistory([]);
        }
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    },
  }),
});

function calculateWaterIntakeRequired(userData: UserData): number {
  const bwrMlPerKg: number = 30;
  const basicWaterRequirement: number = bwrMlPerKg * userData.weight;

  const adjustedWaterIntake: number =
    basicWaterRequirement * userData.activityLevel;

  return adjustedWaterIntake;
}

function getTemperatureText(temperature: number): string {
  if (temperature > 30) {
    return 'Stay cool, drink water to beat the heat!';
  } else if (temperature < 10) {
    return 'Stay warm, hydrata with hot drinks!';
  } else {
    return 'Stay refreshed, sip water to feel energized!';
  }
}
