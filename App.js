import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

// import the different screens
import Loading from './components/screens/Loading';
import SignUp from './components/screens/SignUp';
import Login from './components/screens/Login';
import Main from './components/screens/Main';

// create our app's navigation stack
const AppStack = createStackNavigator({
  Home: Main,
});

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
