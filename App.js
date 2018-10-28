/**
 * Sample React Flexbox
 * 
 *
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FlexboxDemo from './components/FlexboxDemo';



type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <FlexboxDemo />
    );
  }
}

