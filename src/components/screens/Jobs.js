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
import { database } from '../../config/firebase_config';
import { connect } from 'react-redux';

import { fetchUsersJobs } from '../../store';

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.addToSavedJobs = this.addToSavedJobs.bind(this);
    this.addToAppliedJobs = this.addToAppliedJobs.bind(this);
  }
  addToSavedJobs(job) {
    const userId = this.props.currentUser.uid;
    const jobObj = {
      ...job,
      candidate: userId,
      saved: true, // when user selects save
      applied: false,
    };
    // add a job to user's file
    database
      .ref('jobs')
      .child(userId)
      .child(job.id)
      .set(jobObj);
  }

  addToAppliedJobs(job) {
    const userId = this.props.currentUser.uid;
    const jobObj = {
      ...job,
      candidate: userId,
      saved: false,
      applied: true,
    };
    // add a job to user's file
    database
      .ref('jobs')
      .child(userId)
      .child(job.id)
      .set(jobObj);
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
            <Button title="Save" onPress={() => this.addToSavedJobs(item)} />
            <Button
              title="Applied"
              onPress={() => this.addToAppliedJobs(item)}
            />
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

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);
