import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { f, database } from '../../config/firebase_config';

export default class SignUp extends React.Component {
  state = { name: '', email: '', password: '', errorMessage: null };

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
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button
          title="Allready hav an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
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
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
  },
});
