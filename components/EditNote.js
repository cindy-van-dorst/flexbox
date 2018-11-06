import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import * as css from "./Styles";

export default class EditNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      prio: this.props.prio,
      note: this.props.note,
    };
  }

  render() {
    return <View style={css.add_note.container}>
        <TextInput 
            style={css.add_note.textInputAdd}  
            onChangeText={(prio) => this.setState({prio})}
            value={this.state.prio} clearButtonMode="always" keyboardAppearance="dark" keyboardType="numeric" />

        <TextInput 
            style={css.add_note.textInputAdd} 
            onChangeText={(note) => this.setState({note})}
            value={this.state.note} clearButtonMode="always" keyboardAppearance="dark" />

        <TouchableOpacity 
            style={css.add_note.addButton} 
            onPress={() => {
            this.props.updateMethod(this.state.id, this.state.prio, this.state.note);
            this.props._toggleEditModal();
          }}>
          <Text style={css.add_note.addButtonText}> Save the note</Text>
        </TouchableOpacity>
      </View>;
  }
}
