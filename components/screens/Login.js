import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { f, database, auth } from 'firebase';

export default class Login extends React.Component {
  render() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 27, alignSelf: 'center' }}>Login</Text>
        <View style={{ margin: 7 }} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="Email-address"
          selectionColor="#7a42f4"
        />
        <View style={{ margin: 7 }} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.props.onLoginPress}
        >
          <Text style={styles.buttonText}>Sign-In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: 'black',
    fontSize: 40,
    width: 400,
    borderColor: '#7a42f4',
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: '#7a42f4',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
});
