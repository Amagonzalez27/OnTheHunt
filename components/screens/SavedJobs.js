import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class SavedJobs extends React.Component {
  addToAppliedJobs() {
    //TODO: add to applied list
    console.log('Applied');
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
          <Text>Saved Jobs</Text>
        </View>

        <View style={styles.jobContainer}>
          <View>
            <Image
              source={require('../../assets/job_icon.png')}
              style={{
                marginLeft: 5,
                width: 50,
                height: 50,
                borderRadius: 25,
              }}
            />
          </View>

          <View style={{ marginRight: 10 }}>
            <TouchableOpacity>
              <Text>Position</Text>
              <Text>Compan</Text>
              <Text>Location</Text>
            </TouchableOpacity>
          </View>
          <Button title="Applied" onPress={this.addToAppliedJobs} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jobContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderColor: 'red',
    borderWidth: 1,
  },
});
