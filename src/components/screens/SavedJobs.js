import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchUsersJobs } from '../../store';

class SavedJobs extends React.Component {
  async componentDidMount() {
    const userId = this.props.currentUser.uid;
    await this.props.getMyJobs(userId);
  }
  addToAppliedJobs() {
    //TODO: add to applied list
    console.log('Applied');
  }

  render() {
    console.log('THE INTENDED ARRAY OF JOBS:', this.props.selectedJobs);
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

        <FlatList
          style={{ flex: 1 }}
          data={this.props.selectedJobs}
          keyExtractor={(item, id) => item.id.toString()}
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
              <Button
                title="Applied"
                onPress={() => this.addToAppliedJobs(item)}
              />
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
});

const mapStateToProps = state => ({
  selectedJobs: state.usersSelectedJobs,
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  getMyJobs: userId => dispatch(fetchUsersJobs(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedJobs);
