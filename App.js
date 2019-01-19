import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';

// import the different screens
import Loading from './components/screens/Loading';
import SignUp from './components/screens/SignUp';
import Login from './components/screens/Login';
import Home from './components/screens/Home';
import SavedJobs from './components/screens/SavedJobs';
import Applied from './components/screens/Applied';

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

export default createAppContainer(
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
