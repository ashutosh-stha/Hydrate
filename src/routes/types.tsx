import { StackActionType } from '@react-navigation/native';

export type NavigateProps = {
  (name: string, params?: unknown): void;
};

export type ResetProps = {
  index: number;
  routes: any[];
};

export type NavigateResetProp = {
  ({}: ResetProps): void;
};

export type GenericNavigationProps = {
  navigate: NavigateProps;
  reset: NavigateResetProp;
  setOptions: (options: Partial<unknown>) => void;
  goBack: () => StackActionType;
};
