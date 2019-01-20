import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { f, auth } from '../../config/firebase_config';
import Jobs from './Jobs';

import { getUser, fetchJobs, fetchUsersJobs } from '../../store';
import { connect } from 'react-redux';

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
        <View
          style={{
            height: 70,
            paddingTop: 30,
            backgroundColor: 'white',
            borderColor: 'lightgrey',
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text>Jobs</Text>
          <Button title="SignOut" onPress={this.signOut.bind(this)} />
        </View>
        <View style={styles.searchBar}>
          <View
            style={{
              marginLeft: 20,
              justifyContent: 'space-around',
              flexDirection: 'column',
            }}
          >
            <TextInput
              styl={styles.jobInput}
              autoCapitalize="none"
              placeholder="Description..."
              onChangeText={text => this.setState({ description: text })}
              value={this.state.description}
            />
            <TextInput
              styl={styles.jobInput}
              autoCapitalize="none"
              placeholder="Location..."
              onChangeText={text => this.setState({ location: text })}
              value={this.state.location}
            />
          </View>
          <Button
            title="Start the Hunt"
            onPress={() => {
              this.props.getJobs(this.state.description, this.state.location);
              this.setState({
                description: '',
                location: '',
              });
            }}
          />
        </View>
        <Jobs jobs={this.props.jobs} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: 'red',
    borderWidth: 1,
  },

  searchBar: {
    backgroundColor: 'orange',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 20,
  },
  jobInput: {
    color: 'black',
    padding: 28,
    fontSize: 25,
    marginBottom: 30,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    backgroundColor: '#7a42f4',
    justifyContent: 'center',
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
