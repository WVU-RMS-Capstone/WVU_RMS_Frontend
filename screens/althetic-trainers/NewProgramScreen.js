import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { ScrollView } from 'react-native-gesture-handler';

// EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1


function NewProgramScreen({ navigation }) {
  const [name, setName] = React.useState('');

  const handleNameChangeText = (text) => {
    setName(text);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
        underlineColorAndroid="transparent"
        placeholder="Enter Program Name"
        placeholderTextColor="#777777"
        autoCapitalize="none"
        onChangeText={setName} 
        value = {name}/>

      <View style={styles.list}>
        <ScrollView>
          <Text style={styles.exerciseContainer}>Excercise added</Text>
          <Text style={styles.exerciseContainer}>Excercise added</Text>
          <Text style={styles.exerciseContainer}>Excercise added</Text>
          <Text style={styles.exerciseContainer}>Excercise added</Text>
          <Text style={styles.exerciseContainer}>Excercise added</Text>
          </ScrollView>
      </View>

      <View style={{ flexDirection: "row", marginHorizontal: 90, justifyContent: 'space-evenly' }}>
        <View style={{ width: "80%" }}>
          <MediumButton text="Done"
            onPress={() => navigation.navigate('ATHomeScreen')} />
        </View>
        <View style={{ width: "80%" }}>
          <MediumButton text="Add Exercise"
            onPress={() => {navigation.navigate('NewExerciseScreen')}} />
        </View>
      </View>
    </View >
  );
}

export default NewProgramScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    fontSize: 40,
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginBottom: '8%',
    marginTop:'5%',
    height: "15%",
    width: "93%"
  },
  list: {
    height: "50%",
    width: "93%",
    backgroundColor: '#B9B9B9',
    alignSelf: 'center',
    marginBottom: "5%",
    borderRadius: 14
  }
  ,
  exerciseContainer: {
    width: "96%",
    fontSize: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    marginTop: '5%',
    paddingVertical: '5%',
    paddingHorizontal: 20,
    alignSelf: 'center'
  }
});