import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

type NavigateFunction = (name: string, params?: { [key: string]: any }) => void;

export const navigate: NavigateFunction = (name, params) => {
  console.log('isReady', navigationRef.isReady());
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
