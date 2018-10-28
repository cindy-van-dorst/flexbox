import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList
} from "react-native";
import * as css from "./Styles";
import { API_KEY, API_URL } from "react-native-dotenv";
import _ from "lodash";
import Modal from "react-native-modal";
import AddNote from "./AddNote";

var apiUrl = API_URL;
var apiKey = API_KEY;

export default class FlexboxDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      notes: [{ Id: " ", Note: "fetching data..." }],
      note: "Default_note",
      prio: "99",
      isModalVisible: false
    };

    // binding for handing it to the child component
    this.postNote = this.postNote.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
  }

  // add note pop-up modal
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  // getting the notes and ordering them with Lodash
  getOrderedNotes() {
    return fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        const notes = _.sortBy(responseJson, "Prio", ["desc"]); // Using Lodash to sort array by 'Prio', need to improve this
        this.setState({
          isLoading: false,
          notes: notes
        });
        console.log("ordered:" + JSON.stringify(notes));
      })
      .catch(error => {
        console.error(error);
      });
  }

  // adding a note
  postNote(postPrio, postNote) {
    console.log("postNote clicked");
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        name: "...",
        note: postNote,
        prio: postPrio
      })
    })
      .then(response => {
        if (response.ok) this.getOrderedNotes();
      })
      .catch(error => console.error("Error:", error));
  }

  // deleting a note
  deleteNote(Id) {
    console.log("deleteNote clicked");
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        Id: Id
      })
    })
      .then(response => {
        if (response.ok) this.getOrderedNotes();
      })
      .catch(error => console.error("Error:", error));
  }

  componentDidMount() {
    this.getOrderedNotes();
  }

  render() {
    return (
      <View style={css.home_screen.container}>
        {/* header component */}
        <View style={css.home_screen.header}>
          <Text style={css.home_screen.note_header}>Notes</Text>
        </View>

        {/* main component */}
        <View style={css.home_screen.main}>
          <FlatList
            data={this.state.notes}
            renderItem={({ item }) => (
              <View style={css.home_screen.note}>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert(
                      "Are you sure to delete?",
                      "the note can't be recovered",
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        {
                          text: "Delete",
                          onPress: () => this.deleteNote(item.Id),
                          style: "destructive"
                        }
                      ],
                      { cancelable: false }
                    );
                  }}
                >
                  <Text style={css.home_screen.note_text}>{item.Prio}. {item.Note}</Text>
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={({ Id }, index) => Id}
          />
        </View>

        {/* footer component */}
        <View style={css.home_footer.footer}>
          <TouchableOpacity onPress={this._toggleModal}>
            <Image
              style={css.home_footer.addNote}
              source={require("../assets/buttonAdd.png")}
            />
          </TouchableOpacity>
          <Modal 
              isVisible={this.state.isModalVisible}
              onSwipe={() => this.setState({ isModalVisible: false })}
              swipeDirection="left">
            <View style={{ flex: 0.3 }}>
              <AddNote
                method={this.postNote}
                _toggleModal={this._toggleModal}
              />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
