import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { f, database } from '../../config/firebase_config';
import { Ionicons } from '@expo/vector-icons';
import bgImage from '../../../assets/gradient_bg.jpeg';
import logo from '../../../assets/on_the_hunt_logo.png';

const { width: WIDTH } = Dimensions.get('window');

export default class SignUp extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    errorMessage: null,
    showPass: true,
    press: false,
  };

  createUser = (userObj, email, name) => {
    const user = {
      name,
      email,
    };

    database
      .ref('users')
      .child(userObj.uid)
      .set(user);
  };

  showPass = () => {
    if (this.state.press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  handleSignUp = () => {
    const { name, email, password } = this.state;
    f.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userObj => this.createUser(userObj.user, email, name))
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.errorMessage }));
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.signUp}>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <View>
          <Ionicons
            name="ios-person"
            size={28}
            color="rgba(255, 255, 255, 0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
        </View>
        <View>
          <Ionicons
            name="ios-person"
            size={28}
            color="rgba(255, 255, 255, 0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
        </View>
        <View>
          <Ionicons
            name="ios-lock"
            size={28}
            color="rgba(255, 255, 255, 0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity
            style={styles.btnEye}
            onPress={this.showPass.bind(this)}
          >
            <Ionicons
              name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'}
              size={26}
              color="rgba(255, 255, 255, 0.7)"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btnSignUp} onPress={this.handleSignUp}>
          <Text style={styles.text}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.login}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={styles.text}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 10,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 75,
  },
  signUp: {
    fontSize: 25,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  btnEye: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  btnSignUp: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    backgroundColor: '#fc5c65',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
    textAlign: 'center',
  },
  login: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    marginTop: 20,
  },
});
