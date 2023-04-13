import 'react-native-gesture-handler'
import React, {Component} from 'react';
import {StyleSheet, ScrollView, TextInput, SafeAreaView} from 'react-native';
import {View, Text, TextField, Card, Colors, Button} from 'react-native-ui-lib'
import { WebView } from 'react-native-webview';
import { block } from 'react-native-reanimated';

//Session token should be a global variable???? 

/* fetch('https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=userinfo', {
	headers: {
		'Authorization': 'Bearer ' + session_token
	}
})
.then(response => {
// Send a get request to obtain the users assigned workouts and store them in the assigned program array.

})
.catch(error => {
// Navigate user back to login screen

});   */

//Handle press method ************ Check to see if length is working right



function CompletedWorkoutScreen({ navigation }) {
  
  const [value, onChangeText] = React.useState('');

  return (

    <SafeAreaView style = {styles.container}>
    <View>
        <Text style={styles.title}>
              Program Completed!!! (Name)
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