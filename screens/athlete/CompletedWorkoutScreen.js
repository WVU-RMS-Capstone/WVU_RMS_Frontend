import 'react-native-gesture-handler'
import React, {Component} from 'react';
import {StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib'

function CompletedWorkoutScreen({ navigation, route }) {
  const routine = route.params.RoutineName;
  const sessionKey = route.params.sessionKey.sessionKey;

  var notes = "";
  var signOffCode = "";

//   const submitNotes = () => {
  
//     var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=endActSign&notes=' 
//     var notesAPI = api.concat(notes);
//     var codeAPI = notesAPI.concat('&code=')
//     var completeAPI = codeAPI.concat(signOffCode)
  
//     fetch(completeAPI, {
//        headers: {
//         'Authorization': 'Bearer ' + sessionKey
//        }
//     })
   
//     .catch((error) => {
//       console.error(error);
//     })
//   }
  
//  useEffect(() => {

//   submitNotes();

// }, [])


  const [value, onChangeText] = React.useState('');

  return (

    <SafeAreaView style = {styles.container}>
    <View>
        <Text style={styles.title}>
              Program {routine} Completed
            </Text>
      <View> 
      <TextInput
        style = {styles.searchbar}
        value = {value}
        placeholder = 'Enter Notes Here'
        placeholderTextColor={ '#D3D3D3'}
        onChangeText={text => onChangeText(text)}>

    </TextInput>
      <Button text70 background= {'#FFABO0'} label = "Notes"
       onPress={() => navigation.navigate('NotesScreen')} />
    </View>
    <TextInput
        style = {styles.searchbar}
        value = {value}
        placeholder = 'Enter AT Signoff Code Here'
        placeholderTextColor={ '#D3D3D3'}
        onChangeText={text => onChangeText(text)}>

    </TextInput>
    <View style = {styles.buttonn}>
      <Button label = "AT sign off"
        onPress={() => navigation.navigate('AthleteHomeScreen')} />
        </View>
    </View>
    </SafeAreaView>
  );
}

export default CompletedWorkoutScreen;

const styles = StyleSheet.create({
  
  container: {
    marginTop: 45,
    padding: 5,
    flex: 1
  },
  title:{
    fontSize: 30, 
    textAlign: "center",
    fontWeight:'bold', 
    color: 'white',
    marginBottom: 50

  },
  searchbar: {
    marginTop: 50,
    height: 100,
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: '#051515',
    backgroundColor: 'white',
    margin: 5,
    marginBottom: 20
  },
  buttonn:{
    
  }
});