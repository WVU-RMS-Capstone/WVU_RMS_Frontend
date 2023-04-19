import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput} from 'react-native';
import {Card} from 'react-native-ui-lib'
import { useNavigation, useRoute } from '@react-navigation/native';
import { LargeButton } from '../../src/components/Buttons';




  const SelectedProgramScreen = () => { 

//Pulls values given from previous screen
const route = useRoute();
const ID = route.params.ID;
const AD = route.params.AD;
const sessionKey = route.params.sessionKey;
const routine = route.params.RoutineName;

const [details, setDetails] = useState([]);
const [code, setCode] = React.useState('');

const handleCodeText = (text) => {
  setCode(text);
};

const fetchDetails = () => {
  

  const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=routineDetails&ID='
  const apiAppended = api.concat(ID);

   fetch(apiAppended, {
      headers: {
       'Authorization': 'Bearer ' + sessionKey.session_token
      }
   })
   .then((response) => response.json())
   .then((responseJson) => {
  //Sets assigned useState to the responseJson
     setDetails(responseJson);  
  
   }) 
   .catch((error) => {
     console.error(error);
   })
 }

useEffect(() => {
  //Calls fetchExercise multiple times to return contents of exercise with given ID numbers
  fetchDetails();
  return () => {

  }
}, [])


const setNums1 = details.SetNums;
const repNums1 = details.RepNums;
const ExerciseIds1 = details.ExerciseIds;

const navigation = useNavigation();
 
return (

    <SafeAreaView style={styles.container}>       
       
       <Text style={styles.titlefont}>
          {routine} </Text>

      <View style={{paddingTop: 30}}>
      <View style={styles.description}>

          <TextInput
            maxLength={6}
            style={styles.textInput}
            textAlignVertical="top"
            onChangeText={setCode}
            value={code}
          />

        
      </View>
      </View>
  
      <Text style={styles.midfont}>
          Enter STA Code Here if Required </Text> 

          <View style={{paddingTop: 30}}>
          <LargeButton  text = "Start Workout" onPress={() => navigation.navigate('ProgramPreviewScreen', 
          { exerciseNumber: 0, RoutineName: routine, 
       setNums: setNums1, repNums: repNums1 , exerciseIds: ExerciseIds1, code: code,
       sessionKey: sessionKey, AD : AD} )} />
    </View>
  
      </SafeAreaView> 

);     
}

export default SelectedProgramScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
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
  titlefont: {
    fontSize: 62,
    textAlign: 'center',
    fontWeight: 'bold'
     },

  midfont: {
    paddingTop: 25,
    fontSize: 42,
    textAlign: 'center',
     },

  font: {
    fontSize: 32,
    textAlign: 'center',
       },
  textInput: {
    fontSize: 50,
    textAlign: 'center',
    color: 'black',
    flex: 1,
  },
});