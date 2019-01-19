import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import { f } from '../../config/firebase_config';
import Jobs from './Jobs';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      location: '',
      description: '',
      jobs: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { currentUser } = f.auth();
    this.setState({ currentUser });
  }

  onSubmit() {
    const { description, location } = this.state;

    let url = `https://jobs.github.com/positions.json?description=${description}&location=${location}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          description: '',
          location: '',
          jobs: data,
        });
      })
      .catch(error => console.log(error));
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
              onChangeText={description => this.setState({ description })}
              value={this.state.description}
            />
            <TextInput
              styl={styles.jobInput}
              autoCapitalize="none"
              placeholder="Location..."
              onChangeText={location => this.setState({ location })}
              value={this.state.location}
            />
          </View>
          <Button title="Start the Hunt" onPress={this.onSubmit} />
        </View>
        <Jobs jobs={this.state.jobs} />
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
