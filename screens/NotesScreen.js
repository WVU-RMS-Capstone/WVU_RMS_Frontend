import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

function NotesScreen({ navigation, route }) {
  const { UID } = route.params;
  // let getNotesAPI = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  // let getNotesAction = 'getnotes';
  // const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   const getNotes = async () => {
  //     let url = `${getNotesAPI}?action=${getNotesAction}&AthleteUID=${UID}`;
  //     console.log(url);
  //     try {
  //       const response = await fetch(url);
  //       const text = await response.text(); // Get the raw response text
  //       const json = JSON.parse(text); // Parse the text as JSON
  //       console.log(json);
  //       setNotes(json);
  //       return json;
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   getNotes();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={styles.date}>Date: ______</Text>
      <View style={styles.noteBox}>
        <Text>Note</Text>
      </View>
      <Text style={styles.signedOff}>Signed Off By: </Text> */}
      <FlatList
        // style={styles.box}
        data={
          [
            { key: 'Devin A' },
            { key: 'Dan B' },
            { key: 'Dominic C' },
            { key: 'Jackson D' },
            { key: 'James E' },
            { key: 'Joel F' },
            { key: 'John G' },
            { key: 'Jillian H' },
            { key: 'Jimmy I' },
            { key: 'Julie J' },
          ]}
        renderItem={({ item }) =>
          <View>
            <Text style={styles.date}>Date: ______</Text>
            <View style={styles.noteBox}>
              <Text>{item.key}</Text>
            </View>
            <Text style={styles.signedOff}>Note Made By: </Text>
          </View>
        }
      />
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('ATHomeScreen')}>
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
    alignItems: 'center',
    // textAlign: 'left',
    height: 100,
    borderRadius: 15
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
    width: 150,
    height: 75,
    backgroundColor: '#1E3861',
    alignSelf: 'center',
    marginBottom: 10,

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
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '10%'
  }
})

// function NotesScreen() {
//   const [value, onChangeText] = React.useState('');
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

//       <TextInput
//         editable
//         autoFocus
//         multiline
//         numberOfLines={4}
//         placeholder='Enter Notes'
//         onChangeText={text => onChangeText(text)}
//         value={value}
//         style={{padding: 10}}
//       />
//    <Button title="Submit"
//         onPress={null} />
//     </View>
//   );
// }

// export default NotesScreen;