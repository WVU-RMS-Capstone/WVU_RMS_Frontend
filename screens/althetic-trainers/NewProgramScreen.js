import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Touchable, Image } from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { LargeButton } from '../../src/components/Buttons';
import * as ImagePicker from 'expo-image-picker';

function NewProgramScreen({ navigation, route }) {
  const { UID, exercises } = route.params;
  console.log(exercises);
  const [program, setProgram] = useState('');
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState('');
  const [updatePicture, setUpdatePicture] = useState(false);

  let programAPi = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let programAction = 'createprogram';
  let exerciseAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let exerciseAction = 'addprogramexercises';

  async function sendProgram() {
    if (program != "") {
      let url = `${programAPi}?action=${programAction}&Cover=${picture}&ProgramName=${program}`;
      console.log("Request URL: ", url);
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text);
        const json = JSON.parse(text);
        setData(json);
        return json;
      } catch (error) {
        console.error("Error Fetching Data: ", error);
      }
    } else {
      console.log("Program Name Not Entered.");
      alert("Program Name Not Entered. Try Again.");
    }
  }

  async function sendExercises(programID) {
    const workoutObj = {};
    const exerciseIDs = exercises.map(item => item.ID);
    for (let i = 0; i < exerciseIDs.length; i++) {
      let index = i + 1;
      workoutObj[`Workout${index}`] = exerciseIDs[i];
    }
    let url = `${exerciseAPI}?action=${exerciseAction}&ProgramID=${programID}&${Object.entries(workoutObj).map(([key, value]) => `${key}=${value}`).join("&")}&WorkoutCount=${exercises.length}`;
    console.log("Request URL: ", url);
    try {
      const response = await fetch(url);
      const text = await response.text();
      console.log(text);
      const json = JSON.parse(text);
      setData(json);
      return json;
    } catch (error) {
      console.error("Error Fetching Data: ", error);
    }
  }



  const sendAndContune = async () => {
    try {
      const res = await sendProgram();
      if (typeof res == "number") {
        const res2 = await sendExercises(res);
        console.log(res2)
        console.log(res)
        // add section to erase data from list of exercises so it doesnt stay there when AT leaves page
        navigation.navigate('ATHomeScreen', { UID: UID });
      }
    } catch (error) {
      console.error("Error Recieved: ", error);
    }
  }

  const HandleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setPicture(result.assets[0].uri);
      setUpdatePicture(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.row]}>
        <TouchableOpacity style={styles.coverImg} onPress={() => {
          setUpdatePicture(true);
          HandleImagePicker();
        }}>
          {picture ? (
            <Image
              style={styles.img}
              source={{ uri: picture }}
            />
          ) : (
            <Text>Insert Cover</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={program}
          placeholder='Program Name'
          onChangeText={setProgram}
        />
      </View>
      <View>
        <FlatList
          style={styles.box}
          data={exercises}
          renderItem={({ item }) =>
            <View style={styles.exercise}>
              <Text style={styles.exerciseText}>{item.Name}</Text>
            </View>
          }
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => sendAndContune()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AddExercise')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Exercises</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export const ExerciseContext = React.createContext();
export default NewProgramScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'

  },
  coverImg: {
    backgroundColor: 'white',
    width: '40%',
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '40%',
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  input: {
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    width: '40%',
    textAlign: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 15,
    maxHeight: '80%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '10%'
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    justifyContent: 'center',
    width: 200,
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