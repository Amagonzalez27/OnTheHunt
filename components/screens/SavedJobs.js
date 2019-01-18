import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

export default class SavedJobs extends React.Component {
  render() {
    console.log('INSIDE RENDER');
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
      </View>
    );
  }
}

const styles = StyleSheet.create({});
