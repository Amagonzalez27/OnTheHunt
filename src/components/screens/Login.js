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
import { Ionicons } from '@expo/vector-icons';
import { f } from '../../config/firebase_config';
import bgImage from '../../../assets/gradient_bg.jpeg';
import logo from '../../../assets/on_the_hunt_logo.png';

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errorMessage: null,
    showPass: true,
    press: false,
  };

  showPass = () => {
    if (this.state.press === false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };

  handleLogin = () => {
    const { email, password } = this.state;

    f.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation('Main'))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    return (
      <ImageBackground source={bgImage} style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.login}>Login</Text>
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
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
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
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
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

        <TouchableOpacity style={styles.btnLogin} onPress={this.handleLogin}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUp}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text style={styles.text}>Don't have an account? Sign Up</Text>
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
  login: {
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
  btnLogin: {
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
  signUp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 15,
    marginTop: 20,
  },
});
