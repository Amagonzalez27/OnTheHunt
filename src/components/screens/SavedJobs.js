import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { database } from '../../config/firebase_config';
import { fetchUsersJobs, addToJobList } from '../../store';

class SavedJobs extends React.Component {
  addToAppliedJobs(job) {
    const userId = this.props.currentUser.uid;
    const jobObj = {
      ...job,
      candidate: userId,
      saved: false,
      applied: true,
    };
    this.props.addMyJob(jobObj);
    // add a job to user's file
    database
      .ref('jobs')
      .child(userId)
      .child(job.id)
      .set(jobObj);
  }

  render() {
    const usersSavedJobs = Object.keys(this.props.selectedJobs)
      .map(key => this.props.selectedJobs[key])
      .filter(job => job.saved);
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.text}>Saved Jobs</Text>
          </View>
        </View>
        {usersSavedJobs.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.message}>
              Head back to Jobs to start saving
            </Text>
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            data={usersSavedJobs}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({ item }) => (
              <View style={styles.jobContainer}>
                <View style={styles.jobDetails}>
                  <View style={styles.jobLogo}>
                    {!item.company_logo ? (
                      <Image
                        source={require('../../../assets/on_the_hunt_logo.png')}
                        resizeMode="contain"
                        style={styles.onTheHuntLogo}
                      />
                    ) : (
                      <Image
                        source={{ uri: item.company_logo }}
                        resizeMode="contain"
                        style={styles.hasCompanyLogo}
                      />
                    )}
                  </View>

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
                    <Text>{item.position}</Text>
                    <Text>{item.company}</Text>
                    <Text>{item.location}</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.addToAppliedJobs(item)}
                  >
                    <Text style={styles.textBtn}>Applied</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: { flex: 1, backgroundColor: '#e0e0e0' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  message: {
    fontSize: 18,
    color: '#fc5c65',
    textAlign: 'center',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  jobContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    backgroundColor: '#eeeeee',
  },
  jobDetails: {
    flexDirection: 'row',
    width: 250,
  },

  buttonsContainer: {
    marginTop: 10,
    marginRight: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#fc5c65',
    backgroundColor: '#fc5c65',
    borderRadius: 25,
    paddingVertical: 10,
    width: 100,
  },
  textBtn: {
    textAlign: 'center',
  },
  jobLogo: {
    justifyContent: 'flex-start',
    width: 80,
  },
  onTheHuntLogo: {
    marginLeft: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  hasCompanyLogo: {
    marginLeft: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

const mapStateToProps = state => ({
  selectedJobs: state.usersSelectedJobs,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
  addMyJob: job => dispatch(addToJobList(job)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedJobs);
