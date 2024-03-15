import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './src/routes/RootStackScreen';
import { Provider } from 'react-redux';
import { store } from './src/model/store';
import { navigationRef } from './src/routes/utils/NavigationService';
import SplashScreen from 'react-native-splash-screen';

class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  async componentDidMount() {
    await Promise.all([
      store.dispatch.httpClient.intializeHttpClient(),
      store.dispatch.authentication.initialize(),
      store.dispatch.notifications.initialize(),
    ]);
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <RootStackScreen />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
