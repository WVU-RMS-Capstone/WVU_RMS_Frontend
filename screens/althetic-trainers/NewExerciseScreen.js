import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import { Dropdown } from '../../src/components/Dropdown';
import { PickerIOS } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


function NewExerciseScreen({ navigation, route }) {

  const [video, setVideo] = useState('');
  const [cover, setCover] = useState('');
  const [name, setName] = useState(null);
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [part, setParts] = useState('');
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(null);

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/workout.php";
  let action = 'createexercise';

  async function sendRequest() {
    let url = `${api}?action=${action}&Video=${video}&Cover=${cover}&Name=${name}&Description=${description}&Sets=${sets}&Reps=${reps}&BodyPart=${part}`;
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
      <View style={styles.container}>
        <View style={{ marginHorizontal: '30%' }}>
          <TouchableOpacity onPress={selectCoverImg}>
            {cover ? (
              <Image
                source={{ uri: cover }}
                style={styles.coverImg}
              />
            ) : (
              <Text style={[styles.coverButton, { backgroundColor: 'white' }]}>
                Cover
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.whitespace}></Text>

        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={name}
          placeholder='Name'
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={video}
          placeholder='Video Link'
          onChangeText={setVideo}
        />

        <TextInput
          style={[styles.descrit, { backgroundColor: 'white' }]}
          value={description}
          placeholder='Description'
          onChangeText={setDescription}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.number, { backgroundColor: 'white' }]}
            value={sets}
            placeholder='Sets'
            onChangeText={setSets}
          />
          <TextInput
            style={[styles.number, { backgroundColor: 'white' }]}
            value={reps}
            placeholder='Reps'
            onChangeText={setReps}
          />
        </View>

        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          value={part}
          placeholder='Body Part'
          onChangeText={setParts}
        />

        <Text style={styles.whitespace}></Text>

        <LargeButton
          text="Done" onPress={() => sendAndContune()}
        />

      </View>
    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
    // paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    // width: '50%',
  },
  rowInput: {
    borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginTop: 4,
    width: '40%',
    height: 90,
    textAlign: 'center',
  },
  coverButton: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    marginTop: 4,
    width: 150,
    height: 90,
    textAlign: 'center',
  },
  whitespace: {
    marginBottom: 30,
  },
  descrit: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    textAlignVertical: 'top',
    // width: '50%',
  },
  number: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 4,
    width: '40%',
    height: 60,
    textAlign: 'justify',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    color: 'white',
    borderWidth: 1,
  },
  coverImg: {
    width: '50%',
    height: 50,
    borderRadius: 15,
  },
  video: {
    // width: '100%',
    // height: 200,
  },
  // box: {
  //   borderRadius: 5,
  //   padding: 10,
  //   width: '90%',
  //   height: 75,
  //   borderRadius: 15,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   textAlign: 'center',
  //   alignSelf: 'center',
  //   fontSize: 30,
  //   fontWeight: '500',
  //   backgroundColor: '#D9D9D9',
  // },
  // description: {
  //   borderRadius: 5,
  //   padding: 10,
  //   width: '90%',
  //   height: 75,
  //   borderRadius: 15,
  //   flexDirection: 'row',
  //   alignSelf: 'center',
  //   backgroundColor: '#D9D9D9',
  // },
  // font: {
  //   fontSize: 32,
  //   marginRight: 10,
  // },
  // textInput: {
  //   fontSize: 24,
  //   flex: 1,
  // },
  // smallBox: {
  //   borderRadius: 5,
  //   padding: 10,
  //   width: '40%',
  //   height: 103,
  //   borderRadius: 15,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#D9D9D9',
  // },
})

export default NewExerciseScreen;
