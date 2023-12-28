import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import store from './redux/store';
import { Loading } from './components';

function MainApp(): React.JSX.Element {
  const stateGolbal = useSelector(state => state)
  console.log("STATE GLOBAL", stateGolbal)
  return (
    <>
    <NavigationContainer>
      <Router />
    </NavigationContainer>
    {stateGolbal.loading && <Loading/>}
    </>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
