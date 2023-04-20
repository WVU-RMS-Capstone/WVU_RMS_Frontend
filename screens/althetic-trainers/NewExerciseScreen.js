import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from '../../src/components/Dropdown';
import {PickerIOS} from '@react-native-picker/picker';


function NewExerciseScreen({ navigation }) {
  const bodyParts = ['Abdomen', 'Ankles', 'Arms', 'Back', 'Buttocks', 'Calves', 'Chest', 'Elbows', 'Feet', 'Forearms', 'Hips', 'Knees', 'Legs', 'Neck', 'Shoulders', 'Thighs', 'Wrists'];
  let sessionKey = 'ecad2432f0c7df5d74b29e405f7cbbcdeb731e9897c7f26a1669a92547359b10';
  const [name, setName] = React.useState('');
  const [sets, setSets] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [description, setDescription] = React.useState('');
 
  const handleNameChangeText = (text) => {
    setName(text);
  };
  const handleSetsChangeText = (text) => {
    setSets(text);
  };
  const handleRepsChangeText = (text) => {
    setReps(text);
  };
  const handleDescriptionChangeText = (text) => {
    setDescription(text);
  };

  const createNewExercise = () => {
      const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=addExercise&name=';
      var finalName = api.concat(name);
      var youTubeLink = finalName.concat('&link=https://www.youtube.com/watch?v=T_l0AyZywjU&description=')
      var finalDescription = youTubeLink.concat(description);
      fetch(finalDescription, {
        headers: {
          'Authorization': 'Bearer ' + sessionKey
         }
      })
      .catch((error) => {
        console.error(error);
      })
  }
 
  const sendAndContune = () => {
    createNewExercise();
    navigation.navigate('ATHomeScreen');
  }
  return (
    <View style={styles.container}>
      
    <View style={styles.box}>  
      <Text style={styles.font}>Name:</Text>
      <TextInput style={styles.textInput}  onChangeText={setName} value={name}/>
      </View>

      <View style={{paddingTop: 30, zIndex:5}}>
      <View style={styles.box }>  
        <Text style={styles.font}>Body Part:</Text>
        <Dropdown options={bodyParts} />
      </View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 30}}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Sets:</Text>
          <TextInput style={styles.textInput} onChangeText={setSets} value={sets}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Reps:</Text>
          <TextInput style={styles.textInput} onChangeText={setReps} value={reps}/>
        </View>
      </View>

      <View style={{paddingTop: 30}}>
      <View style={styles.description}>
          <Text style={styles.font}>Description:</Text>
          <TextInput
            style={styles.textInput}
            textAlignVertical="top"
            multiline={true}
            onChangeText={setDescription}
            value={description}
          />
      </View>
      </View>

      <View style={{paddingTop: 30}}>
        <LargeButton  text="Done" onPress={() => sendAndContune()} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 40,
  }, 
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    fontSize: 16,
  },
  box: {
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 75,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign:'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    backgroundColor: '#D9D9D9',
  },
 description: {
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 153,
    borderRadius: 15,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  font: {
    fontSize: 32,
    marginRight: 10,
  },
  textInput: {
    fontSize: 24,
    flex: 1,
  },
  smallBox: {
    borderRadius: 5,
    padding: 10,
    width: '40%',
    height: 103,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
})

export default NewExerciseScreen;
