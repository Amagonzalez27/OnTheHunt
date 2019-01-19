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
  constructor(props) {
    super(props);
    this.addToSavedJobs = this.addToSavedJobs.bind(this);
    this.addToAppliedJobs = this.addToAppliedJobs.bind(this);
  }
  addToSavedJobs(job) {
    // TODO: set up post request to saved
    console.log('selected job:', job);
  }

  addToAppliedJobs() {
    // TODO: set up post request to applied
    console.log('Sent to Applied');
  }

  render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={this.props.jobs}
        keyExtractor={(item, id) => id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobContainer}>
            <View>
              {!item.company_logo ? (
                <Image
                  source={require('../../assets/job_icon.png')}
                  style={{
                    marginLeft: 5,
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
              ) : (
                <Image
                  source={{ uri: item.company_logo }}
                  style={{
                    marginLeft: 5,
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
              )}
            </View>

            <View style={{ marginRight: 10 }}>
              <TouchableOpacity>
                <Text>{item.position}</Text>
                <Text>{item.company}</Text>
                <Text>{item.location}</Text>
              </TouchableOpacity>
            </View>
            <Button title="Save" onPress={() => this.addToSavedJobs(item)} />
            <Button title="Applied" onPress={this.addToAppliedJobs} />
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
