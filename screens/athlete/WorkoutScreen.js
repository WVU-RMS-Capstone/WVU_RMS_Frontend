import React, {useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Card, WebView} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function WorkoutScreen({ navigation, route}) {
  const { programID } = route.params;
  console.log(programID);

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'getprogramexercises';

  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
}

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  }
})



// function WorkoutScreen({ navigation, route }) {
//  //Exercise 1
//  //const route = useRoute();
//  var exerciseNumber = route.params.exerciseNumber;
//  var first = route.params.first;
//  var code = route.params.code;
//  var AD = route.params.AD;
//  var ID = route.params.ID;
//  const routine = route.params.RoutineName;
//  const setNums = route.params.setNums;
//  const repNums = route.params.repNums;
//  const exercise1 = route.params.exercise1;
//  const exercise2 = route.params.exercise2;
//  const exercise3 = route.params.exercise3;
//  const exerciseL1 = route.params.exerciseL1;
//  const exerciseL2 = route.params.exerciseL2;
//  const exerciseL3 = route.params.exerciseL3;
//  const exerciseD1 = route.params.exerciseD1;
//  const exerciseD2 = route.params.exerciseD2;
//  const exerciseD3 = route.params.exerciseD3;
//  const sessionKey = route.params.sessionKey.sessionKey;
//  console.log(sessionKey);
//  console.log("hi");

//  const setNumberArray = setNums.split("/");
//  const repNumberArray = repNums.split("/");


//  // EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=startAct&routineId=1&assignId=
//  const fetchStartAct = () => {

//   const api =  'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=startAct&routineId='
//   const apiId = api.concat(ID);
//   const apiIDPlus = apiId.concat('&assignId=');
//   const adi = apiIDPlus.concat(AD);


//   fetch(adi, {
//      headers: {
//       'Authorization': 'Bearer ' + sessionKey.session_token
//      }
//   })

//   .catch((error) => {
//     console.error(error);
//     {navigation.navigate('AthleteHomeScreen')}
     
//   })
// }
// //Required becuase of hook implementations

// useEffect(() => {
//   fetchStartAct();
//   return () => {

//   }
// }, [])

//  let exerciseName = ""; 
//  let exerciseDescription = ""; 
//  let exerciseLink = "";

//  //Set exercise ID and Name to proper id
//  if(exerciseNumber == 1){
//    exerciseName = exercise1; 
//    exerciseDescription = exerciseD1; 
//    exerciseLink = exerciseL1; 
// }
// else if(exerciseNumber == 2){
//    exerciseName = exercise2; 
//    exerciseDescription = exerciseD2; 
//    exerciseLink = exerciseL2; 
// }
// else{
//    exerciseName = exercise3; 
//    exerciseDescription = exerciseD3; 
//    exerciseLink = exerciseL3; 
// }



//   const MyVideo = () => {

//     if(exerciseLink){
//     return(
//       <View style = {{height: 150}}> 
//       <WebView 
//           style={{height: 400, width: 300, paddingBotton: 100, alignSelf: 'center'}}
//           javaScriptEnabled={true}
//           source={{ uri: exerciseLink }}/> 
//   </View>
//     );
//     }
//   }

// //Shows signoff box if program was assigned
// const [showButton, setShowButton] = useState(false);

// const toggleButton = () => {
//     setShowButton(!showButton); 
//   };



// const MyPrevButton = () => {
//   return(
//   <View style = {{marginTop: 10}}> 
//     {showButton &&  <LargeButton  text = "Previous" onPress={() => handlePrevPress()}>
//     </LargeButton> }
// </View>
//   );
//   }
// const MyButton = () => {
//   let buttonText = "";
//   if(exerciseNumber < 3){
//     buttonText = "Next"
//   }
//   else{
//     buttonText = "Done"
//   }
//   return(
//     <LargeButton  text = {buttonText} onPress={() => handlePress()}>
//     </LargeButton>
//   );
//   }
// //Handle press method ************ Check to see if length is working right
// const  handlePress = () => {
//   if(exerciseNumber == 1){
//     exerciseNumber++;
//     toggleButton();
   
    
//     navigation.setParams( {exerciseNumber: exerciseNumber, RoutineName: routine, 
//       setNums: setNums, repNums:repNums, exercise1: exercise1, exercise2: exercise2,
//        exercise3: exercise3, sessionKey:{sessionKey}, code: code, AD: AD, first: 2});
//   }
//   else if(exerciseNumber == 2 ){
  
//     exerciseNumber++;
//     navigation.setParams( {exerciseNumber: exerciseNumber, RoutineName: routine, 
//       setNums: setNums, repNums:repNums, exercise1: exercise1, exercise2: exercise2,
//        exercise3: exercise3, sessionKey:{sessionKey}, code: code, AD: AD, first: 2});
//   }
//   else {
//     navigation.navigate('CompletedWorkoutScreen', {RoutineName: routine, sessionKey: sessionKey, code:code, AD: AD});
//   }
// } 

// const  handlePrevPress = () => {
//   if(exerciseNumber == 2){
  
//     exerciseNumber--;
//     navigation.setParams( {exerciseNumber: exerciseNumber, RoutineName: routine, 
//       setNums: setNums, repNums:repNums, exercise1: exercise1, exercise2: exercise2,
//        exercise3: exercise3, sessionKey:sessionKey, code: code, AD: AD});
//        toggleButton();
//   }
//   else if(exerciseNumber == 3){
 
//     exerciseNumber--;
//     navigation.setParams( {exerciseNumber: exerciseNumber, RoutineName: routine, 
//       setNums: setNums, repNums:repNums, exercise1: exercise1, exercise2: exercise2,
//        exercise3: exercise3, sessionKey:sessionKey, code: code, AD: AD});
//   }
//   else {
    
//     navigation.navigate('CompletedWorkoutScreen', {RoutineName: routine, sessionKey:{sessionKey}, code:code, AD: AD});
//   }
// } 


//   return (
//     <SafeAreaView style={styles.container}>
             
//       <Text style={styles.titlefont}>
//         {routine} </Text>
        
//         {MyVideo()}

//       <View style={{paddingTop: 20}}>
       
//       <View style={styles.box}>  
//       <Text style={styles.midfont}>{exerciseName}</Text>
//       </View>
//       </View>

//       <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 20}}>
//         <View style={styles.smallBox} >
//           <Text style={styles.font}>Sets: </Text>
//           <Text style = {styles.midfont}> {setNumberArray[exerciseNumber - 1]} </Text>
//         </View>
//         <View style={styles.smallBox} >
//           <Text style={styles.font}>Reps: </Text>
//           <Text style = {styles.midfont}> {repNumberArray[exerciseNumber - 1]} </Text>
          
//         </View>
//       </View>

//       <View style={{paddingTop: 20}}>
//       <View style={styles.description}>
//           <Text style={styles.font}>{exerciseDescription}</Text>

//       </View>
//       </View>
      
//       <View style={{paddingTop: 10}}> 

//       <MyPrevButton />

//       </View>
//       <View style={{paddingTop: 20}}>
       
//         <MyButton />
//         </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10,
//   }, 
//   vidContainer:{
//     alignSelf: 'center',
//     paddingRight: 500,
//     marginTop: 15,
//     marginBottom: 15,
//     width: 300,
//     height: 50,
//   },
//   box: {
//     textAlign: 'center',
//     borderRadius: 5,
//     padding: 10,
//     width: '90%',
//     height: 65,
//     borderRadius: 15,   
//     alignSelf: 'center',
//     backgroundColor: '#D9D9D9',
//   },

//  description: {
//     borderRadius: 5,
//     padding: 10,
//     width: '90%',
//     height: 143,
//     borderRadius: 15,
//     flexDirection: 'row',
//     alignSelf: 'center',
//     backgroundColor: '#D9D9D9',
//   },

//   titlefont: {
//     fontSize: 52,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginTop: -40
//      },

//   midfont: {
//     fontSize: 30,
//     textAlign: 'center',
//      },

//   font: {
//     fontSize: 20,
//     textAlign: 'center',
//        },

//   smallBox: {
//     textAlign: 'center',
//     borderRadius: 5,
//     padding: 10,
//     width: '40%',
//     height: 80,
//     borderRadius: 15,
//     backgroundColor: '#D9D9D9',
//   }
// })

// export default WorkoutScreen;
