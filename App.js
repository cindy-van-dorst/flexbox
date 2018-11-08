/**
 * Sample React Flexbox
 *
 *
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, NetInfo } from "react-native";
import ListNotes from "./components/ListNotes";

type Props = {};
export default class App extends Component<Props> {
  render() {
    // based on this need to load the data or show offline (now the app crashed on network failed)
    const isOnline = NetInfo.isConnected.fetch();

    if (!isOnline) {
      return <Text> Offline </Text>;
    } else {
      return <ListNotes />
    }
  }
}
