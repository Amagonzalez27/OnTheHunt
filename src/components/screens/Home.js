import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { f, auth } from '../../config/firebase_config';
import Jobs from './Jobs';

import { getUser, fetchJobs, fetchUsersJobs } from '../../store';
import { connect } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import Logo from '../../../assets/on_the_hunt_logo.png';

const { width: WIDTH } = Dimensions.get('window');

class Home extends React.Component {
  state = { description: '', location: '' };

  async componentDidMount() {
    try {
      const { currentUser } = f.auth();
      await this.props.getUserInfo(currentUser);
      await this.props.getMyJobs(currentUser.uid);
    } catch (error) {
      console.log('Error finding user:', error);
    }
  }

  signOut() {
    auth
      .signOut()
      .then(() => console.log('Logged out successful...'))
      .catch(error => console.log('Error:', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.text}>Jobs</Text>
          </View>
          <TouchableOpacity
            style={styles.btnSignout}
            onPress={this.signOut.bind(this)}
          >
            <View style={styles.signOutIcon}>
              <Ionicons
                name="ios-log-out"
                size={26}
                color="rgba(255, 255, 255, 0.7)"
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <View style={styles.searchBarDetails}>
            <View style={styles.input}>
              <TextInput
                styl={styles.jobInput}
                autoCapitalize="none"
                placeholder="Job title..."
                placeholderTextColor="rgba(33,33,33,0.7)"
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
              />
            </View>
            <View style={styles.input}>
              <TextInput
                styl={styles.jobInput}
                autoCapitalize="none"
                placeholderTextColor="rgba(33,33,33,0.7)"
                placeholder="Location..."
                onChangeText={text => this.setState({ location: text })}
                value={this.state.location}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.getJobs(this.state.description, this.state.location);
              this.setState({
                description: '',
                location: '',
              });
            }}
          >
            <Text style={styles.btnText}>Hunt</Text>
          </TouchableOpacity>
        </View>
        {this.props.jobs.length ? (
          <Jobs jobs={this.props.jobs} navigation={this.props.navigation} />
        ) : (
          <Image style={styles.logo} source={Logo} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  header: {
    backgroundColor: '#2c3e50',
    height: 70,
    paddingTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  headerTextContainer: { justifyContent: 'center', paddingHorizontal: 150 },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 17,
    textAlign: 'center',
  },
  btnSignout: {
    justifyContent: 'flex-end',
    flex: 0,
  },
  signOutIcon: { justifyContent: 'flex-end' },
  searchBar: {
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBarDetails: {
    marginLeft: 20,
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: '#F8FFF8',
    borderRadius: 25,
    width: WIDTH - 150,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  jobInput: {
    color: 'black',
    fontSize: 25,
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#fc5c65',
    backgroundColor: '#fc5c65',
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 40,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  btnText: { color: 'white', fontSize: 15, fontWeight: 'bold' },

  logo: {
    width: 265,
    height: 265,
    alignSelf: 'center',
    marginVertical: 150,
  },
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  jobs: state.jobs,
});

const mapDisptachToProps = dispatch => ({
  getUserInfo: userId => dispatch(getUser(userId)),
  getJobs: (description, location) =>
    dispatch(fetchJobs(description, location)),
  getMyJobs: id => dispatch(fetchUsersJobs(id)),
});

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(Home);
