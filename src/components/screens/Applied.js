import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { database } from '../../config/firebase_config';
import { deleteJob, fetchUsersJobs } from '../../store';

class Applied extends React.Component {
  removeJob(jobId) {
    const userId = this.props.currentUser.uid;
    this.props.deleteJob(jobId);
    database
      .ref('jobs')
      .child(userId)
      .child(jobId)
      .remove();
  }

  render() {
    const usersAppliedJobs = Object.keys(this.props.selectedJobs)
      .map(key => this.props.selectedJobs[key])
      .filter(job => job.applied);

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
          <Text>Applied Jobs</Text>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={usersAppliedJobs}
          keyExtractor={(item, id) => id.toString()}
          renderItem={({ item }) => (
            <View style={styles.jobContainer}>
              <View>
                {!item.company_logo ? (
                  <Image
                    source={require('../../../assets/job_icon.png')}
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

              <Button title="Remove" onPress={() => this.removeJob(item.id)} />
            </View>
          )}
        />
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
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  selectedJobs: state.usersSelectedJobs,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  deleteJob: jobId => dispatch(deleteJob(jobId)),
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Applied);
