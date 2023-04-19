import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {View, Text} from 'react-native-ui-lib'
import { LargeButton } from '../../src/components/Buttons';

import { useNavigation, useRoute } from '@react-navigation/native';



const testExercises = [
  {id: "1", title: "Tricep Extensions", reps: "10" },
  {id: "2", title: "Tricep Pulls", reps: "10"},
  {id: "3", title: "Pushups", reps: "10"},
  {id: "4", title: "Triceps Exercise", reps : "10"},
];

const Item = ({ title }) => {
  return(
  <View style={styles.item}> 
      <Text color = {'white'}> 
      {title}
      </Text>
  </View> 
  );
  }

const ProgramPreviewScreen = () => { 

  //Pulls values given from previous screen
  const route = useRoute();
  const ExerciseIds = route.params.exerciseIds;
  const sessionKey = route.params.sessionKey;
  const routine = route.params.RoutineName;
  const setNums = route.params.setNums;
  const repNums = route.params.repNums;

  const exerciseIdArray = ExerciseIds.split("/");

  const [exercise1, setExercise1] = useState([]);
  const [exercise2, setExercise2] = useState([]);
  const [exercise3, setExercise3] = useState([]);
  const [exercise4, setExercise4] = useState([]);

  var exerciseId = exerciseIdArray[0];
  var counter = 1;

  //Exercise flag for if their is a fourth variable
  var fourthExercise = 0;
  const fetchExercises = () => {

  //Appends exercise Id to end of appropriate API before calling 
  var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getExercise&ID=';
  var appendedAPI = api.concat(exerciseId);

    fetch(appendedAPI, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey.session_token
      }
    })

  //   var testapi = 'https://jsonplaceholder.typicode.com/users'
  //   fetch(testapi, {
      
  //  })
    .then((response) => response.json())
    .then((responseJson) => {
      //Handles the exercise number and 
      if( counter == 1){
        setExercise1(responseJson);
        console.log("First");
        console.log(exerciseId);
        console.log(exercise1.ExerciseName);
        exerciseId = exerciseIdArray[1];
        counter++;
      }
      if( counter == 2){
        setExercise2(responseJson);
        console.log("Second");
        console.log(exerciseId);
        console.log(exercise2.ExerciseName);
        exerciseId = exerciseIdArray[2];
        counter++;
      }
      if( counter == 3){
        setExercise3(responseJson);
        console.log("Third");
        console.log(exerciseId);
        console.log(exercise3.ExerciseName);
        counter++;
      }
      // else {
      //   setExercise4(responseJson);
      //   fourthExercise = 1;
      // }
    

    }) 
    .catch((error) => {
      console.error(error);
    })
  }

    

  useEffect(() => {
    //Calls fetchExercise multiple times to return contents of exercise with given ID numbers
  for(let i = 0; i < 3; i++){
      fetchExercises();
  }
    
    return () => {

    }
  }, [])

  //Trying to combine the Jsons into one object so flatlist can still be used (Isn't working rn)
  // const exerciseList = Object.assign(exercise1, exercise2, exercise3);

    //Too handle routines with different amounts of exercises
  //   if(fourthExercise == 1){
  //      exerciseList = Object.assign(exercise1, exercise2, exercise3, exercise4)
  //   }


      const navigation = useNavigation();
  
      //Should iterate through and display exerciseName
      //Change to username if using placeholderAPI
      const renderItem = ({ item }) => ( 
      <Item title={item.ExerciseName} /> );
  

    return (

      <SafeAreaView style={styles.container}>       
            <View>
                
            <FlatList 
              style = {styles.list2}
              //Change to exercises to test database data 
              data={exercise1} 
              renderItem={renderItem} 
              keyExtractor={(item) => item.ExerciseId}
              stickyHeaderIndices={[0]}   
              ListHeaderComponent={() => (
                <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
                  {routine}
                </Text>
              )}         
            /> 
          
            </View>
            <View style={{paddingTop: 30}}>
            <LargeButton  text = "Start" onPress={() => navigation.navigate('WorkoutScreen', 
            { exerciseNumber: 1, RoutineName: routine, 
        setNums: {setNums}, repNums:{repNums}, exercise1: "Row", exercise2: "Curl", 
        exercise3: "Calf Raises", exerciseD1: "Description of Exercise 1", 
        exerciseD2: "Description of Exercise 2", exerciseD3: "Description of Exercise 3", 
        sessionKey: {sessionKey}} )} />
      </View>
    
        </SafeAreaView> 

  );     
}

export default ProgramPreviewScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 5,
    flex: 1
  },
  item: {
    backgroundColor: "#627D98",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  }
});