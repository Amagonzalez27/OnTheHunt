import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';

export default class Jobs extends React.Component {
  state = {
    jobposts: [
      {
        id: 1,
        company: 'Amazon',
        position: 'Sr. Software Engineer',
        location: 'New York',
        logo:
          'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0pjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35f6201e9066caf57547d2dd9d911004edfa8437/01-sticker-mule-logo-dark-stacked.png',
      },
      {
        id: 2,
        company: 'Google',
        position: 'Sr. Software Engineer',
        location: 'San Francisco',
        logo:
          "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckphIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--1a26026cec79788af423dad61c5fff565c9786fc/we're_hiring_shared_image_3.jpg",
      },
    ],
  };

  addToSavedJobs() {
    // TODO: set up post request to saved
    console.log('Sent to Saved');
  }

  addToAppliedJobs() {
    // TODO: set up post request to applied
    console.log('Sent to Applied');
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.state.jobposts}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobContainer}>
            <View>
              <Image
                source={{
                  uri: item.logo,
                }}
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
                <Text>{item.position}</Text>
                <Text>{item.company}</Text>
                <Text>{item.location}</Text>
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={() => this.addToSavedJobs} />
            <Button title="Applied" onPress={() => this.addToAppliedJobs} />
          </View>
        )}
      />
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
