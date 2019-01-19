import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  onSubmit() {
    console.log('Going to make a fetch request Git Hub');
    fetch();
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
          <TextInput
            style={styles.searchFeild}
            placeholder="Position..."
            onSubmitEditing={this.onSubmit}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{ color: '#fff' }}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchFeild}
            placeholder="Location..."
            onSubmitEditing={this.onSubmit}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={{ color: '#fff' }}>Search</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={this.state.jobposts}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                justifyContent: 'space-evenly',
                alignItems: 'center',
                flexDirection: 'row',
                paddingVertical: 10,
              }}
            >
              <View>
                <Image
                  source={{
                    uri: item.logo,
                  }}
                  style={{
                    marginLeft: 5,
                    width: 100,
                    height: 100,
                    borderRadius: 50,
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
            </View>
          )}
        />
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
    marginBottom: 20,
    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#7a42f4',
  },
  searchFeild: {
    width: 5,
    color: 'black',
    flex: 1,
    padding: 28,

    fontSize: 20,
    height: 20,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    backgroundColor: '#7a42f4',
    justifyContent: 'center',
  },
});
