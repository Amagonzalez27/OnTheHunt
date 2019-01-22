import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { WebBrowser } from 'expo';

import HTML from 'react-native-render-html';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class JobDetail extends React.Component {
  render() {
    const { goBack } = this.props.navigation;
    const {
      company,
      companyUrl,
      description,
      howToApply,
      location,
      logo,
      posted,
      title,
      type,
    } = this.props.navigation.state.params.params;

    console.log(companyUrl, 'companyUrl');
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => goBack()}>
              <View style={styles.backArrowContainer}>
                <Ionicons
                  style={styles.btngoBack}
                  name="ios-arrow-back"
                  size={26}
                  color="rgba(255, 255, 255, 0.7)"
                />
              </View>
            </TouchableOpacity>
            <View style={styles.jobContainer}>
              <Text style={styles.text}>Detail</Text>
            </View>
          </View>
          <View style={styles.jobDetail}>
            <View>
              {logo ? (
                <Image
                  style={{ height: 200 }}
                  resizeMode="contain"
                  source={{ uri: `${logo}` }}
                />
              ) : (
                <Image
                  style={{ height: 200, width: 200 }}
                  resizeMode="contain"
                  source={require('../../../assets/on_the_hunt_logo.png')}
                />
              )}
              <Text style={styles.company}>{company}</Text>
              <Text style={styles.jobHeaderText}>{location}</Text>
              <Text style={styles.jobHeaderText}>{title}</Text>
              <Text style={styles.jobHeaderText}>Posted:{posted}</Text>
              <Text style={styles.jobHeaderText}>{type}</Text>
              <Text
                style={{ color: 'blue' }}
                onPress={() => WebBrowser.openBrowserAsync(`${companyUrl}`)}
              >
                More About Us!
              </Text>
            </View>
            <View>
              <HTML html={description} />
              <Text>{howToApply}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#2c3e50',
    height: 70,
    paddingTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 17,
    textAlign: 'center',
    marginHorizontal: 50,
  },
  btngoBack: {
    marginVertical: 10,

    flex: 0,
  },
  backArrowContainer: { justifyContent: 'flex-end' },
  jobContainer: { justifyContent: 'center', paddingHorizontal: 100 },
  company: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#2c3e50',
  },
  jobHeaderText: {
    fontSize: 15,
    marginVertical: 3,
  },
  jobDetail: {
    margin: 10,
  },
});
