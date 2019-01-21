import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { database } from '../../config/firebase_config';
import { connect } from 'react-redux';

import { fetchUsersJobs, addToJobList } from '../../store';

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
    this.props.addMyJob(jobObj);
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
    this.props.addMyJob(jobObj);
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
        renderItem={({ item }) => {
          let title = item.title;
          let company = item.company;
          if (title.length > 19) title = title.substring(0, 19);
          if (company.length > 15) company = company.substring(0, 15);
          return (
            <View style={styles.jobContainer}>
              <View style={styles.jobDetailContainer}>
                <View style={styles.jobLogo}>
                  {!item.company_logo ? (
                    <Image
                      source={require('../../../assets/on_the_hunt_logo.png')}
                      resizeMode="contain"
                      style={{
                        marginLeft: 5,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                      }}
                    />
                  ) : (
                    <Image
                      source={{ uri: item.company_logo }}
                      resizeMode="contain"
                      style={{
                        marginLeft: 5,
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                      }}
                    />
                  )}
                </View>

                <View style={{ flex: 2 }}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('Detail', {
                        params: {
                          title: item.title,
                          company: item.company,
                          description: item.description,
                          location: item.location,
                          url: item.url,
                          howToapply: item.how_to_apply,
                          posted: item.created_at,
                          companyUrl: item.company_url,
                          type: item.type,
                          logo: item.company_logo,
                        },
                      })
                    }
                  >
                    <Text>{title}</Text>
                    <Text>{company}</Text>
                    <Text>{item.location}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.addToSavedJobs(item)}
                >
                  <Text style={styles.text}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.addToAppliedJobs(item)}
                >
                  <Text style={styles.text}>Applied</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  jobContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    backgroundColor: '#eeeeee',
  },

  buttonsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#fc5c65',
    backgroundColor: '#fc5c65',
    borderRadius: 25,
    paddingVertical: 10,
    width: 100,
    margin: 5,
  },
  text: {
    textAlign: 'center',
  },
  jobDetailContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jobLogo: {
    justifyContent: 'flex-start',
    flex: 1,
    marginLeft: 10,
  },
});

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  addMyJob: job => dispatch(addToJobList(job)),
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs);
