
import {StyleSheet} from "react-native";


export const colors = {
  "primary": 'black',
  "secondary": 'grey',
  "background": 'lightgrey',
  "note": 'white',
 };

export const values = {
  "font_body": "AppleSDGothicNeo-Regular",
  "font_body_size": 16,
  "font_title_size": 27,
  "tiny_icon_size": 22,
  "small_icon_size": 40,
  "large_icon_size": 110,
};


export const home_screen = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: "black",
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'stretch'
    },
    header: {
      flex: .8,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      paddingTop: 5,
      paddingLeft: 20,
    },
    main: {
      flex: 7,
      backgroundColor: colors.background,
      paddingTop: 10,
    },     
    note: {
      backgroundColor: colors.note,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      marginBottom: 5,
    },
    note_header: {
      color: "white",
      fontSize: values.font_title_size,
      fontFamily: values.font_body,
    },
    note_text: {
      color: "black",
      fontSize: values.font_body_size,
      fontFamily: values.font_body,
    },
    note_input: {
      color: "black",
      fontSize: values.font_body_size,
      fontFamily: values.font_body,
      height: 40, 
      borderColor: "black", 
      borderWidth: 1,
      backgroundColor: colors.note,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      marginLeft: 15,
      marginRight: 15,
      marginTop: 5,
      marginBottom: 5,
    },
  });

  export const home_footer = StyleSheet.create(
    {
      footer: {
        flex: .8,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.background,
        paddingTop: 20, 
      },          
      addNote: {
        width: 30, 
        height: 30, 
        opacity: 0.3,
      },   
    });

    export const add_note = StyleSheet.create(
      {
        container: {
          flex: 1,
          backgroundColor: colors.background,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
          padding: 20, 
          borderRadius: 8,
        },
        textInputAdd: {
          height: 40, 
          margin: 5,
          borderColor: colors.secondary, 
          borderWidth: 1,
          backgroundColor: colors.note,
          paddingHorizontal: 10,
        },   
        addButton: {
          backgroundColor: colors.secondary,
          padding: 10,
          margin: 5,
          height: 40,
       }, 
       addButtonText:{
        color: 'white',
        fontFamily: values.font_body,
     }       
      });
  




