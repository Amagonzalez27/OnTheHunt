import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

import { BottomTabBar } from 'react-navigation-tabs';

// import the different screens
import Loading from './src/components/screens/Loading';
import SignUp from './src/components/screens/SignUp';
import Login from './src/components/screens/Login';
import Home from './src/components/screens/Home';
import SavedJobs from './src/components/screens/SavedJobs';
import Applied from './src/components/screens/Applied';
import JobDetail from './src/components/screens/JobDetail';
import { Ionicons } from '@expo/vector-icons/';

const TabBarComponent = props => <BottomTabBar {...props} />;

// create bottom tabs
const TabStack = createBottomTabNavigator(
  {
    Jobs: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
          <Ionicons name="ios-briefcase" size={26} color={tintColor} />
        ),
      },
    },
    Saved: {
      screen: SavedJobs,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
          <Ionicons name="ios-heart" size={26} color={tintColor} />
        ),
      },
    },
    Applied: {
      screen: Applied,
      navigationOptions: {
        tabBarIcon: ({ focused, horizontal, tintColor }) => (
          <Ionicons name="md-checkmark-circle" size={26} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fc5c65',
      style: {
        backgroundColor: '#2c3e50',
      },
      tabStyle: {
        height: 60,
        paddingTop: 10,
      },
    },
  }
);

// create app's navigation stack
const AppStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    Detail: { screen: JobDetail },
  },

  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none',
  }
);

const AuthStack = createStackNavigator(
  {
    SignUp,
    Login,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

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
