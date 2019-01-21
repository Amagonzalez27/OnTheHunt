import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
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
      expanded: true,
      date: new Date(),
      animation: new Animated.Value(),
    };
  }

  toggle() {
    let initialValue = this.state.expanded
        ? this.state.maxHeight + this.state.minHeight
        : this.state.minHeight,
      finalValue = this.state.expanded
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

  render() {
    let icon = this.icons.down;
    let today = this.state.date;
    let dd = today.getDate();
    let mm = today.getMonth();
    let yyyy = today.getFullYear();
    console.log(mm);

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = mm + 1;
    today = mm + '/' + dd + '/' + yyyy;

    if (this.state.expanded) {
      icon = this.icons.up;
    }

    return (
      <Animated.View>
        <View
          style={styles.progressContainer}
          onLayout={this._setMaxHeight.bind(this)}
        >
          <TouchableOpacity onPress={this.toggle.bind(this)}>
            <Text style={styles.text}>
              <Ionicons name={`${icon}`} size={28} />
              Progress
            </Text>
          </TouchableOpacity>
        </View>
        <View onLayout={this._setMaxHeight.bind(this)} />
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
  },
});
