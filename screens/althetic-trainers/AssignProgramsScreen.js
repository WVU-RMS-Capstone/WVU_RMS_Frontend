import React from 'react';
import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, Platform, FlatList, TouchableOpacity } from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { LargeButton } from '../../src/components/Buttons';
import { getCurrentUID } from '../../FirebaseConfig';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function AssignProgramsScreen({ navigation, route }) {
  const { UID } = route.params;
  console.log(UID);
  let getProgramsAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let getProgramAction = 'fetchpremadeprograms';
  let addProgramAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let addProgramAction = 'addathleteprograms';
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  async function sendProgram() {
    let url = `${addProgramAPI}?action=${addProgramAction}&ProgramID=${selectedItems.ProgramID}&AthleteUID=${UID}`;
    console.log("Request URL: ", url);
    try {
      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text);
      return json;
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }

  }

  const sendAndContune = async () => {
    try {
      const res = await sendProgram();
      console.log(res)
      // add section to erase data from list of exercises so it doesnt stay there when AT leaves page
      navigation.navigate('ATHomeScreen', { UID: getCurrentUID() });
    } catch (error) {
      console.error("Error Recieved: ", error);
    }
  }

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${getProgramsAPI}?action=${getProgramAction}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setPrograms(json);
        setFilteredPrograms(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);


  const searchFilter = (text) => {
    if (text) {
      const updatedData = programs.filter((item) => {
        const item_data = `${item.data.Name.toUpperCase()}`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setSearch(text);
      setFilteredPrograms(updatedData);
    } else {
      setFilteredPrograms(programs)
      setSearch('')
    }
  }

  const handleSelectedItem = (item) => {
    if (selectedItems === item) {
      setSelectedItems(null);
    } else {
      setSelectedItems(item);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          clearButtonMode='always'
          placeholder='Search Exercise'
          autoCapitalize='none'
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <FlatList
        style={styles.box}
        data={filteredPrograms}
        keyExtractor={(item) => item.data.ProgramID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.ath, selectedItems === item.data ? styles.selected : null]} onPress={() => handleSelectedItem(item.data)}>
            <Text style={styles.first}>{item.data.ProgramName}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.button2}>
        <LargeButton text="Done"
          onPress={() => sendAndContune()} />
      </View>

    </SafeAreaView>
  );
}

export default AssignProgramsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 50
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  background: {
    margin: 50,
    backgroundColor: 'white',
  },
  ath: {
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    height: 50,
    borderRadius: 10,
    paddingBottom: 10,
  },
  first: {
    textAlign: 'center',
    paddingTop: 15
  },
  box: {
    marginBottom: 130
  },
  button: {
    paddingLeft: 150,
    textAlign: 'center'
  },
  button2: {
    width: "100%",
    marginTop: '10%',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignSelf: 'center',
    fontSize: 10
  },
  selected: {
    backgroundColor: 'grey'
  }
})


// function AssignProgramsScreen({ navigation, route }) {

//   const [userID, setUserID] = React.useState('');
//   const [routineID, setRoutineID] = React.useState('');
//   const [notes, setnotes] = React.useState('');

//   const createAssignedRoutine = () => {

//     // EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=
//     //assignUserRoutines&user=1&routine=1&notes=Rest&check=1
//     var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=assignUserRoutines&user=';
//     api = api + userID + '&routine=' + routineID + '&notes=' + notes + '&check=1'
//     console.log(api);
//     fetch(api, {
//       headers: {
//         'Authorization': 'Bearer ' + sessionKey
//       }
//     })

//       .catch((error) => {
//         console.error(error);
//         navigation.navigate('ATHomeScreen', { sessionKey: sessionKey });
//       })
//   }

//   const sendAndCont = () => {
//     createAssignedRoutine();
//     navigation.navigate('ATHomeScreen', { sessionKey: sessionKey });
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <View style={styles.box}>
//           <Text style={styles.font}> Routine Assignment  </Text>
//         </View>

//         <View style={{ marginTop: 30, marginBottom: 30 }}>
//           <View styles={{ marginTop: 30 }}>
//             <View style={styles.box} >
//               <Text style={styles.font}>User ID:</Text>
//               <TextInput style={styles.textInput2} onChangeText={setUserID} value={userID} />
//             </View>
//           </View>

//           <View styles={{ marginTop: 30 }}>
//             <View style={styles.box} >
//               <Text style={styles.font}>Routine Id:</Text>
//               <TextInput style={styles.textInput2} onChangeText={setRoutineID} value={routineID} />
//             </View>
//           </View>

//           <View styles={{ paddingTop: 50 }}>
//             <View style={styles.box} >
//               <Text style={styles.font}>Notes:</Text>
//               <TextInput style={styles.textInput2} onChangeText={setnotes} value={notes} />
//             </View>
//           </View>
//         </View>

//         <View style={{ paddingTop: 30 }}>
//           <LargeButton text="Done" onPress={() => sendAndCont()} />
//         </View>
//       </View>
//     </SafeAreaView>

//   );
// }

// export default AssignProgramsScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   textInput: {
//     alignSelf: 'center',
//     backgroundColor: '#D9D9D9',
//     borderRadius: 14,
//     fontSize: 40,
//     paddingVertical: "1%",
//     paddingHorizontal: "5%",
//     marginBottom: '8%',
//     marginTop: '5%',
//     height: "15%",
//     width: "93%"
//   },
//   font: {
//     fontSize: 32,
//     marginRight: 10,
//   },
//   textInput2: {
//     fontSize: 24,
//     flex: 1,
//   },
//   smallBox: {
//     borderRadius: 5,
//     padding: 10,
//     width: '32%',
//     height: 103,
//     borderRadius: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D9D9D9',

//   },
//   box: {
//     borderRadius: 5,
//     padding: 10,
//     width: '90%',
//     height: 75,
//     borderRadius: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     textAlign: 'center',
//     alignSelf: 'center',
//     fontSize: 30,
//     fontWeight: '500',
//     backgroundColor: '#D9D9D9',
//   },
// });