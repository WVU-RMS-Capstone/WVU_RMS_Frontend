import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { LargeButton } from '../../src/components/Buttons';
import * as ImagePicker from 'expo-image-picker';

function NewExerciseScreen({ navigation, route }) {
  const { UID } = route.params;

  const [video, setVideo] = useState('');
  const [cover, setCover] = useState('');
  const [name, setName] = useState(null);
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [part, setParts] = useState('');
  const [data, setData] = useState([]);
  const [picture, setPicture] = useState('');
  const [updatePicture, setUpdatePicture] = useState(false);
  const [bodyPart, setBodyPart] = useState([]);
  const [showCreateInput, setShowCreateInput] = useState(false);

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'createexercise';
  let getExerciseAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let getExerciseAction = 'fetchallexercises';

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${getExerciseAPI}?action=${getExerciseAction}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        // console.log(json);
        const bodyPartsData = json.map((exercise, index) => ({ key: index, value: exercise.data.BodyPart }));
        setBodyPart(bodyPartsData);
        console.log(bodyPartsData);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);

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
    if (video != "" && name != "" && sets != "" && reps != "" && part != "") {

      try {
        const res = await sendRequest();
        console.log(res)
        navigation.navigate('ATHomeScreen', { UID: UID });

      } catch (error) {
        console.error("Error Recieved: ", error);
      }
    } else {
      if (video == "") {
        alert("Missing Input on Video");
      } else if (name == "") {
        alert("Missing Input on Name");
      } else if (sets == "") {
        alert("Missing Input on Sets");
      } else if (reps == "") {
        alert("Missing Input on Reps");
      } else if (part == "") {
        alert("Missing Input on Body Part");
      }
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
      <View style={styles.coverButton}>
        <TouchableOpacity style={styles.defaultcover} onPress={() => {
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
        autoCapitalize='sentences'
        multiline={true}
        onChangeText={setDescription}
        returnKeyType='done'
        blurOnSubmit={true}
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

      <SelectList
        data={bodyPart.concat('Create new body part')}
        setSelected={(val) => setParts(val)}
        onSelect={() => {
          console.log(part);
          if (part === 'Create new body part') {
            setShowCreateInput(true);
            setParts("")
            console.log("hello");
          } else {
            // setParts(selectedItem);
            setShowCreateInput(false);
          }
        }}
        boxStyles={{ marginTop: 5, backgroundColor: 'white', marginHorizontal: '5%' }}
        dropdownStyles={{ marginHorizontal: '5%' }}
        placeholder='Select Body Part'
        save="value"
      />

      {showCreateInput && (
        <TextInput
          style={[styles.input, { backgroundColor: 'white', marginTop: '5%' }]}
          value={part}
          placeholder='Enter new body part'
          onChangeText={setParts}
        />
      )}
      <View style={{ marginTop: '10%' }}>
        <LargeButton
          text="Done"
          onPress={() => sendAndContune()}
        />
      </View>

    </SafeAreaView >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
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
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 5,
    padding: 10,
    width: '90%',
  },
  rowInput: {
    borderColor: 'gray',
    borderRadius: 15,
    padding: 20,
    marginTop: 4,
    width: '40%',
    height: 90,
    textAlign: 'center',
  },
  coverButton: {
    justifyContent: 'center',
    alignItems: 'center'

  },
  whitespace: {
    marginBottom: 30,
  },
  descrit: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: '5%',
    marginVertical: 5,
    padding: 10,
    textAlignVertical: 'top',
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
  defaultcover: {
    backgroundColor: 'white',
    width: '45%',
    height: 150,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    width: '45%',
    height: 150,
    borderRadius: 15,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'

  }
})

export default NewExerciseScreen;
