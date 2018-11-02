import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as css from "./Styles";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [{ Id: " ", Note: "fetching data..." }],
      note: "default note",
      prio: "9"
    };
  }

  render() {
    return <View style={css.add_note.container}>
        <TextInput style={css.add_note.textInputAdd} onChangeText={text => this.setState(
              { prio: text }
            )} value={this.state.text} autoFocus={true} keyboardAppearance="dark" keyboardType="numeric" />

        <TextInput 
            style={css.add_note.textInputAdd} 
            onChangeText={text => this.setState(
              { note: text }
            )} value={this.state.text} clearButtonMode="always" keyboardAppearance="dark" />

        <TouchableOpacity style={css.add_note.addButton} onPress={() => {
            this.props.method(this.state.prio, this.state.note);
            this.props._toggleModal();
          }}>
          <Text style={css.add_note.addButtonText}> Add the note</Text>
        </TouchableOpacity>
      </View>;
  }
}
