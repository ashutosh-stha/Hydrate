import { createModel } from '@rematch/core';
import { RootModel } from '../models';

interface UserData {
  age: number;
  weight: number;
  activityLevel: number;
}

export type WaterIntake = {
  waterIntake: number;
  timeStamp: Date;
};

interface UserState {
  user?: UserData;
  waterIntake: number;
  waterIntakeRequired: number;
  waterIntakeHistory: WaterIntake[];
}

const API_KEY = 'b2f173c9d6ea72ea21364abd12336fb8';

const initialState: UserState = {
  user: undefined,
  waterIntake: 0,
  waterIntakeRequired: 0,
  waterIntakeHistory: [],
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
    addWaterIntakeHistory(state, payload) {
      return {
        ...state,
        waterIntakeHistory: [payload, ...state.waterIntakeHistory],
      };
    },
  },
  effects: dispatch => ({
    calculateWaterIntake(payload: UserData) {
      const requiredWaterIntake = calculateWaterIntakeRequired(payload);
      dispatch.user.setUserData(payload);
      dispatch.user.setWaterIntakeRequired(requiredWaterIntake.toFixed(0));
    },
	getCurrentLocationWeather() {}
  }),
});
function calculateWaterIntakeRequired(userData: UserData): number {
  // Basic Water Requirement (BWR) formula: BWR = 30 ml/kg
  const bwrMlPerKg: number = 30;
  const basicWaterRequirement: number = bwrMlPerKg * userData.weight;

  // Adjusted Water Intake: Adjusted Water Intake = BWR × Activity Factor
  const adjustedWaterIntake: number =
    basicWaterRequirement * userData.activityLevel;

  return adjustedWaterIntake;
}
