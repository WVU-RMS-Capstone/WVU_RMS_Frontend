import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import { TextInput } from 'react-native-gesture-handler';


function NewExerciseScreen({ navigation }) {
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
  return (
    <View style={styles.container}>
    <View style={styles.box}>  
      <Text style={styles.font}>Name:</Text>
      <TextInput style={styles.textInput}  onChangeText={setName} value={name}/>
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
        <LargeButton  text="Done" onPress={() => navigation.navigate('ATHomeScreen')} />
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
    alignSelf: 'center',
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
  }
})

export default NewExerciseScreen;
