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
import EditNote from "./EditNote";
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
      isEditModalVisible: false,
      isFetching: false
    };

    // binding for handing it to the child component
    this.postNote = this.postNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this._toggleModal = this._toggleModal.bind(this);
    this._toggleEditModal = this._toggleEditModal.bind(this);
  }

  // toggle add note pop-up modal
  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  // toggle edit note pop-up modal
  _toggleEditModal = () =>
    this.setState({ isEditModalVisible: !this.state.isEditModalVisible });

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
  //      name: "...",
        note: postNote,
        prio: postPrio
      })
    })
      .then(response => {
        if (response.ok) this.getOrderedNotes();
      })
      .catch(error => console.error("Error:", error));
  }

  // update a note
  updateNote(id, prio, note) {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify({
        Id: id,
  //      Name: "...",
        Prio: prio,
        Note: note
      })
    })
      .then(response => {
        if (response.ok) this.getOrderedNotes();
      })
      .catch(error => console.error("Error:", error));
  }

  // deleting a note
  deleteNote(Id) {
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

  GetItem(id, prio, note) {
    //Alert.alert(item);
    this._toggleEditModal();
    this.setState({
      id: id,
      prio: prio,
      note: note
    });
  }

  deleteAlert(id) {
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
          onPress: () => this.deleteNote(id),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  }

  componentDidMount() {
    this.getOrderedNotes();
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
            keyExtractor={({ Id }, index) => Id}
            data={this.state.notes}
            renderItem={({ item }) => (
              <View style={css.home_screen.note}>
                <Text
                  style={css.home_screen.note_text}
                  onPress={this.deleteAlert.bind(this, item.Id)}
                >
                  {item.Prio} {item.Note}
                </Text>

                {/*  starting the edit note function */}

                <TouchableOpacity
                  onPress={this.GetItem.bind(
                    this,
                    item.Id,
                    item.Prio,
                    item.Note
                  )}
                >
                  <Image
                    style={css.home_screen.editNote}
                    source={require("../assets/buttonEdit.png")}
                  />
                </TouchableOpacity>

                <Modal
                  isVisible={this.state.isEditModalVisible}
                  onSwipe={() => this.setState({ isEditModalVisible: false })}
                  swipeDirection="left"
                >
                  <View style={{ flex: 0.3 }}>
                    <EditNote
                      // big todo here to attach the update function (start with also passing the ID)
                      updateMethod={this.updateNote}
                      id={this.state.id}
                      prio={this.state.prio}
                      note={this.state.note}
                      _toggleEditModal={this._toggleEditModal}
                    />
                  </View>
                </Modal>
                {/*  ending the edit note function */}
              </View>
            )}
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
