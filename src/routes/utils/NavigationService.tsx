import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

type NavigateFunction = (name: string, params?: { [key: string]: any }) => void;

export const navigate: NavigateFunction = (name, params) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
