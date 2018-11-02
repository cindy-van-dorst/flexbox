import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  NetInfo
} from "react-native";
import * as css from "./Styles";
import { API_KEY, API_URL } from "react-native-dotenv";
import _ from "lodash";
import Modal from "react-native-modal";
import AddNote from "./AddNote";
import Loader from "./Loader";

var apiUrl = API_URL;
var apiKey = API_KEY;

export default class FlexboxDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      notes: [{ Id: " ", Note: " " }],
      note: " ",
      prio: " ",
      isModalVisible: false,
      isFetching: false,
    };

    // binding for handing it to the child component
    this.postNote = this.postNote.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
  }

  // toggle add note pop-up modal
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  // toggle loading boolean
  _toggleLoading = () => this.setState({ loading: !this.state.loading });

  // refresh with boolean
  onRefresh() {
    this.setState({ isFetching: true }, function() {
      this.getOrderedNotes();
    });
  }

  // getting the notes and ordering them with Lodash
  getOrderedNotes() {
    this._toggleLoading();
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
          notes: notes
        });
        this._toggleLoading();
        this.setState({ isFetching: false }); // double variable with loading, need to improve this
      })
      .then()
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

// based on this need to load the data or show offline (now the app crashed on network failed)
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log("Is connected, is " + (isConnected ? "online" : "offline"));
    });
  }


  render() {
    return (
      <View style={css.home_screen.container}>
        <Loader loading={this.state.loading} size="small" />

        {/* header component */}
        <View style={css.home_screen.header}>
          <Text style={css.home_screen.note_header}>Notes</Text>
        </View>

        {/* main component */}
        <View style={css.home_screen.main}>
          <FlatList
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
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
                  <Text style={css.home_screen.note_text}>
                    {item.Prio} {item.Note}
                  </Text>
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
            swipeDirection="left"
          >
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
