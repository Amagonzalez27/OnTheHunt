import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

// import the different screens
import Loading from './src/components/screens/Loading';
import SignUp from './src/components/screens/SignUp';
import Login from './src/components/screens/Login';
import Home from './src/components/screens/Home';
import SavedJobs from './src/components/screens/SavedJobs';
import Applied from './src/components/screens/Applied';

// create bottom tabs
const TabStack = createBottomTabNavigator({
  Jobs: { screen: Home },
  Saved: { screen: SavedJobs },
  Applied: { screen: Applied },
});

// create app's navigation stack
const AppStack = createStackNavigator(
  {
    Home: { screen: TabStack },
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator({
  SignUp,
  Login,
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading,
      Main: AppStack,
      SignUp: AuthStack,
      Login: AuthStack,
    },
    {
      initialRouteName: 'Loading',
    }
  )
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
