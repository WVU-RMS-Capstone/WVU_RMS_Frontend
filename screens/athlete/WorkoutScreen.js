import 'react-native-gesture-handler'
import React, {Component} from 'react';
import {StyleSheet, ScrollView, SafeAreaView} from 'react-native';
import {View, Text, TextField, Card, Colors, Button} from 'react-native-ui-lib'
import { WebView } from 'react-native-webview';
import { block } from 'react-native-reanimated';
import { LargeButton } from '../../src/components/Buttons';

  
function WorkoutScreen({ navigation, route }) {
 //Exercise 1
 //const route = useRoute();
 var exerciseNumber = route.params.exerciseNumber;
 const routine = route.params.RoutineName;
 const setNums = route.params.setNums.setNums;
 const repNums = route.params.repNums.repNums;
 const exercise1 = route.params.exercise1;
 const exercise2 = route.params.exercise2;
 const exercise3 = route.params.exercise3;
 const exerciseD1 = route.params.exerciseD1;
 const exerciseD2 = route.params.exerciseD2;
 const exerciseD3 = route.params.exerciseD3;
 const sessionKey = route.params.sessionKey.sessionKey;

 const setNumberArray = setNums.split("/");
 const repNumberArray = repNums.split("/");

 let exerciseName = ""; 
 let exerciseDescription = ""; 

 //Set exercise ID and Name to proper id
 if(exerciseNumber == 1){
   exerciseName = exercise1; 
   exerciseDescription = exerciseD1; 
}
else if(exerciseNumber == 2){
   exerciseName = exercise2; 
   exerciseDescription = exerciseD2; 
}
else{
   exerciseName = exercise3; 
   exerciseDescription = exerciseD3; 
}

const MyButton = () => {
  let buttonText = "";
  if(exerciseNumber < 3){
    buttonText = "Next"
  }
  else{
    buttonText = "Done"
  }
  return(
    <LargeButton  text = {buttonText} onPress={() => handlePress()}>
    </LargeButton>
  );
  }
//Handle press method ************ Check to see if length is working right
const  handlePress = () => {
  if(exerciseNumber < 3){
   
    exerciseNumber++;
    navigation.setParams( {exerciseNumber: exerciseNumber, RoutineName: routine, 
      setNums: {setNums}, repNums:{repNums}, exercise1: "Row", exercise2: "Curl",
       exercise3: "Calf Raises", sessionKey:{sessionKey}});
  }
  else {
    
    navigation.navigate('CompletedWorkoutScreen', {RoutineName: routine, sessionKey:{sessionKey}});
  }
} 


  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.titlefont}>
        {routine} </Text>
      

      <View style={{paddingTop: 30}}>
      <View style={styles.box}>  
      <Text style={styles.midfont}>{exerciseName}</Text>
      </View>
      </View>

      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 30}}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Sets: </Text>
          <Text style = {styles.titlefont}> {setNumberArray[exerciseNumber - 1]} </Text>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Reps: </Text>
          <Text style = {styles.titlefont}> {repNumberArray[exerciseNumber - 1]} </Text>
          
        </View>
      </View>

      <View style={{paddingTop: 30}}>
      <View style={styles.description}>
          <Text style={styles.font}>{exerciseDescription}</Text>

      </View>
      </View>

      <View style={{paddingTop: 30}}>
        <MyButton />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  }, 

  box: {
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 75,
    borderRadius: 15,   
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

  titlefont: {
    fontSize: 52,
    textAlign: 'center',
    fontWeight: 'bold'
     },

  midfont: {
    fontSize: 42,
    textAlign: 'center',
     },

  font: {
    fontSize: 32,
    textAlign: 'center',
       },

  smallBox: {
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    width: '40%',
    height: 115,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
  }
})

export default WorkoutScreen;
