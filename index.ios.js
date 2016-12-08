/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import NavIndex from './app/NavIndex';

export default class breeze extends Component {
  render() {
    return (
     <NavIndex />
    );
  }
}


AppRegistry.registerComponent('breeze', () => breeze);
