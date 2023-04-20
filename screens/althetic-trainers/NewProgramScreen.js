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
    <View style={{ marginVertical: '20%' }}>
      <TextInput style={styles.textInput}
        underlineColorAndroid="transparent"
        placeholder="Enter Program Name"
        placeholderTextColor="#777777"
        autoCapitalize="none"
        onChangeText={setName} 
        value = {name}/>

      <View style={{ height: "70%",width: "93%", backgroundColor: '#A9A9A9', alignSelf: 'center', marginBottom:"5%", borderRadius: 14 }}>
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
  textInput: {
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    fontSize: 40,
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginBottom: 50,
    height: "20%",
    width: "93%"
  }
  ,
  exerciseContainer:{
    width:"96%",
    fontSize:50, 
    backgroundColor:'#D9D9D9', 
    borderRadius: 14, 
    marginTop:50, 
    paddingVertical:40, 
    paddingHorizontal:20,
    alignSelf:'center'
  }
});