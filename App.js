import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { f, auth, database } from './config/firebase_config.js';

import { createStackNavigator } from 'react-navigation';

import Login from './components/screens/Login';

const MainStack = createStackNavigator({
  Login: { screen: Login },
  // Profile: { screen: ProfileScreen },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
    };

    // this.registerUser('testing3@email.com', 'fakepassword', 'John Doe');

    f.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('LOGGED IN', user);
      } else {
        console.log('LOGGED OUT');
      }
    });
  }

  registerUser(email, password, name) {
    console.log(email, password, name);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userObj => {
        console.log(email, password, userObj);
      })
      .catch(error => console.log('error logging in', error));
  }

  /**
   *  auth
      .signOut()
      .then(() => console.log('Logged out successful...'))
      .catch(error => console.log('Error:', error));
   */
  render() {
    if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <View
            style={{
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 27 }}>Welcome</Text>
            <View style={{ margin: 20 }} />
            <Button
              onPress={() => this.setState({ isLoggedIn: false })}
              title="Logout"
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Login onLoginPress={() => this.setState({ isLoggedIn: true })} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
