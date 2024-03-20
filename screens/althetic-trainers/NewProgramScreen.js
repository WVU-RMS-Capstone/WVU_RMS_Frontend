import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Touchable } from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { LargeButton } from '../../src/components/Buttons';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'

// EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1


function NewProgramScreen({ navigation, route }) {
  // let sessionKey = route.params.sessionKey;
  // const [name, setName] = React.useState('');
  // const [reps1, setReps1] = React.useState('');
  // const [sets1, setSets1] = React.useState('');
  // const [id1, setid1] = React.useState('');
  // const [reps2, setReps2] = React.useState('');
  // const [sets2, setSets2] = React.useState('');
  // const [id2, setid2] = React.useState('');
  // const [reps3, setReps3] = React.useState('');
  // const [sets3, setSets3] = React.useState('');
  // const [id3, setid3] = React.useState('');
  // const [visible, setVisible] = React.useState('');

  // const [assignID, setAssignID] = React.useState('');
  // const [data, setData] = React.useState('');

  // const handleNameChangeText = (text) => {
  //   setName(text);
  // };

  // const createNewRoutine = () => {
  //   var ids = id1 + '/' + id2 + '/' + id3;
  //   var sets = sets1 + '/' + sets2 + '/' + sets3;
  //   var reps = reps1 + '/' + reps2 + '/' + reps3;
  //   // EXAMPLE: https://createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1
  //   const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=';
  //   var finalName = api.concat(name);
  //   var repapi = finalName.concat('&IDs=');
  //   var repsapi = repapi.concat(ids);
  //   repsapi = repsapi + '&reps=' + reps + '&sets=' + sets + '&visible=' + visible;
  //   console.log(repsapi);
  //   fetch(repsapi, {
  //     headers: {
  //       'Authorization': 'Bearer ' + sessionKey
  //     }
  //   })

  //     .then((response) => {
  //       let res = response.json();
  //       return res;
  //     })
  //     .then((json) => {

  //       setData(json);

  //     })

  //     .catch((error) => {
  //       console.error(error);
  //     })
  // }

  // const sendAndCont = () => {
  //   createNewRoutine();
  //   console.log(data);
  //   navigation.navigate('ATHomeScreen', { sessionKey: sessionKey });
  // }

  const [cover, setCover] = useState('');
  const [program, setProgram] = useState('');
  const [exercises, setExercises] = useState([]);
  const [data, setData] = useState([]);
  const [selectImage, setSelectImage] = useState('');

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'createprogram';

  async function sendRequest() {
    let url = `${api}?action=${action}&Cover=${cover}&ProgramName=${program}&Exercise=${exercises}`;
    console.log("Request URL: ", url);
    try {
      const response = await fetch(url);
      const text = await response.text();
      const json = JSON.parse(text);
      setData(json);
      return json;
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  }

  const sendAndContune = async () => {
    try {
      const res = await sendRequest();
      console.log(res)
      navigation.navigate('ATHomeScreen');
    } catch (error) {
      console.error("Error Recieved: ", error);
    }
  }

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      setSelectImage(response.assets[0].uri)
      console.log(response);
    });
  };



  const selectCoverImg = React.useCallback((type, options) => {
    try {
      // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      // if (status != 'granted') {
      //   return;
      // }

      const result = ImagePicker.launchImageLibrary(options, setResponse);

      if (!result.cancelled) {
        setCover(result.uri);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row]}>
        <TouchableOpacity style={styles.coverImg} onPress={() => {
          ImagePicker();
        }}>
          <Text>Insert Cover</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={program}

          placeholder='Program Name'
          onChangeText={setProgram}
        />
      </View>

      <FlatList
        style={styles.box}
        data={[
          { key: 'RDL' },
          { key: 'Lateral Band Movements' },
          { key: 'Box Jumps' },
          { key: 'Step Downs' }
        ]}
        exercise={data}
        renderItem={({ item }) =>
          <View style={styles.exercise}>
            <Text style={styles.exerciseText}>{item.key}</Text>
          </View>
        }
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={() => sendAndContune()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExercisesScreen')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Exercises</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView >

  );
}

export default NewProgramScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'

  },
  coverImg: {
    backgroundColor: 'white',
    width: '40%',
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input: {
    height: 40,
    marginTop: 30,
    borderRadius: 15,
    width: '40%',
    textAlign: 'center',
  },
  box: {
    backgroundColor: 'white',
    margin: 30,
    marginBottom: 50,
    borderRadius: 15
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    paddingBottom: 15,
    paddingVertical: 5,
    justifyContent: 'flex-end',
    width: 150,
    height: 60,
    backgroundColor: '#1E3861',
    alignSelf: 'center',

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
    // fontWeight: "500",
    textAlign: 'center',
    // paddingVertical: "1%",
  },
  exercise: {
    borderRadius: 15,
    borderColor: "#757575",
    marginTop: 15,
    justifyContent: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#1E3861',
    alignSelf: 'center',

    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    })
  },
  exerciseText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  }
});