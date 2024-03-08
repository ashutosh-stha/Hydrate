import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './src/routes/RootStackScreen';
import { Provider } from 'react-redux';
import { store } from './src/model/store';

class App extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    store.dispatch.httpClient.intializeHttpClient();
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
