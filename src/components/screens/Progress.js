import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  DatePickerIOS,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons/';

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.icons = {
      up: 'ios-arrow-dropup',
      down: 'ios-arrow-dropdown',
    };
    this.state = {
      expanded: false,
      animation: new Animated.Value(),
    };

    this.renderPanel = this.renderPanel.bind(this);
  }

  toggle() {
    let initialValue = !this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = !this.state.expanded
        ? this.state.minHeight
        : this.state.maxHeight + this.state.minHeight;
    this.setState(state => {
      return { expanded: !state.expanded };
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
    }).start();
  }

  _setMaxHeight(event) {
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  _setMinHeight(event) {
    this.setState({
      minHeight: event.nativeEvent.layout.height,
    });
  }

  renderPanel() {
    if (this.state.expanded) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }}
        >
          <View
            style={{
              alignSelf: 'center',
              marginLeft: 10,
              borderWidth: 1,
              borderColor: '#bdbdbd',
              width: 350,
              height: 200,
              backgroundColor: '#bdbdbd',
            }}
          >
            <Text style={styles.panelText}>
              Date Applied: {this.props.dateApplied}
            </Text>
            <Text style={styles.panelText}>
              Connections: {this.props.connection}
            </Text>
            <Text style={styles.panelText}>
              Phone Screen: {this.props.phoneScreen}
            </Text>
            <Text style={styles.panelText}>
              Project Due Date: {this.props.projectDueDate}
            </Text>
            <Text style={styles.panelText}>On-site: {this.props.onsite}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    let icon = this.icons.up;

    if (this.state.expanded) {
      icon = this.icons.down;
    }

    return (
      <Animated.View>
        <View
          style={styles.progressContainer}
          onLayout={this._setMaxHeight.bind(this)}
        >
          <TouchableOpacity
            onPress={this.toggle.bind(this)}
            style={styles.progressBtn}
          >
            <Ionicons name={`${icon}`} size={28} />

            <Text style={styles.text}>Progress</Text>
          </TouchableOpacity>
        </View>
        <View onLayout={this._setMaxHeight.bind(this)}>
          {this.renderPanel()}
        </View>
      </Animated.View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  panelText: {
    fontSize: 15,
    margin: 10,
    color: '#2c3e50',
    fontWeight: '600',
    borderBottomWidth: 3,
    borderBottomColor: '#2c3e50',
  },
  progressBtn: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
