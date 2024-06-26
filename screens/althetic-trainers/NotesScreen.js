import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

function NotesScreen({ navigation, route }) {
  const { UID } = route.params;
  let getNotesAPI = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let getNotesAction = 'getnotes';
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      let url = `${getNotesAPI}?action=${getNotesAction}&Athlete=${UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setNotes(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getNotes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {notes != "No notes have been added yet." && (
        <View style={{ maxHeight: '75%' }}>
          <FlatList
            data={notes}
            renderItem={({ item }) =>
              <View>
                <Text style={styles.date}>Date: {item.data.Date}</Text>
                <View style={styles.noteBox}>
                  <Text>{item.data.Note}</Text>
                </View>
                <Text style={styles.signedOff}>Note Made By: {item.data.MadeBy}</Text>
              </View>
            }
          />
        </View>
      )}
      {notes == "No notes have been added yet." && (
        <Text style={styles.noNotes}>No notes have been made yet.</Text>
      )}

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('ATHomeScreen', { UID: UID })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateNotesScreen', { UID: UID })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Create Note</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  },
  noteBox: {
    backgroundColor: 'white',
    marginLeft: 50,
    marginRight: 50,
    alignItems: 'left',
    height: 100,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5
  },
  date: {
    color: '#1E3861',
    marginLeft: 50,
    marginBottom: 10
  },
  signedOff: {
    textAlign: 'right',
    marginRight: 50,
    marginTop: 10
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    justifyContent: 'center',
    width: 200,
    height: 75,
    backgroundColor: '#1E3861',
    alignSelf: 'center',
    marginBottom: 10,
    marginLeft: '10%',

    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    })
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    marginBottom: '10%'
  },
  noNotes: {
    textAlign: 'center',
    fontSize: 25,
  }
})