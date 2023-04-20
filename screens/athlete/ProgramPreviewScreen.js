import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, SectionList } from 'react-native';
import { View, Text } from 'react-native-ui-lib'
import { LargeButton } from '../../src/components/Buttons';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const testExercises = [
  { ExerciseName: "1", Descrip: "Tricep Extensions" }
];
const testExercises2 = [
  { ExerciseName: "2", Descrip: "Pullups" }
];
const test = ([testExercises, testExercises2]);

const ProgramPreviewScreen = () => {

  //Should iterate through and display exerciseName
  //Change to username if using placeholderAPI
  const renderItem = ({ item }) => (
    <Item title={item.ExerciseName} />);

  const Item = ({ title }) => {

    return (
      <View style={styles.item}>
        <Text styles={styles.ListText}>
          {title}
        </Text>
      </View>
    );
  }

  //Pulls values given from previous screen
  const route = useRoute();

  const ID = route.params.ID;
  const AD = route.params.AD;
  const setNums1 = route.params.setNums;
  const repNums1 = route.params.repNums;
  const ExerciseIds1 = route.params.exerciseIds;
  const code = route.params.code;
  const sessionKey = route.params.sessionKey;
  const routine = route.params.RoutineName;


  var exerciseIdArray = ExerciseIds1.split("/");


  const [exercise1, setExercise1] = useState([]);
  const [exercise2, setExercise2] = useState([]);
  const [exercise3, setExercise3] = useState([]);


  const fetchExercises = () => {


    //Appends exercise Id to end of appropriate API before calling 
    var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getExercise&ID=';

    var appendedAPI = api.concat(exerciseIdArray[0]);

    fetch(appendedAPI, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey.session_token
      }
    })


      .then((response) => response.json())
      .then((responseJson) => {
        //Handles the exercise number and 

        setExercise1(responseJson);

      })
      .catch((error) => {
        console.error(error);
      })
  }

  const fetchExercises2 = () => {


    //Appends exercise Id to end of appropriate API before calling 
    var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getExercise&ID=';

    var appendedAPI = api.concat(exerciseIdArray[1]);

    fetch(appendedAPI, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey.session_token
      }
    })


      .then((response) => response.json())
      .then((responseJson) => {
        //Handles the exercise number and 

        // setExercise1([exercise1],responseJson);
        setExercise2(responseJson);

      })
      .catch((error) => {
        console.error(error);
      })
  }

  const fetchExercises3 = () => {


    //Appends exercise Id to end of appropriate API before calling 
    var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getExercise&ID=';

    var appendedAPI = api.concat(exerciseIdArray[2]);

    fetch(appendedAPI, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey.session_token
      }
    })


      .then((response) => response.json())
      .then((responseJson) => {
        //Handles the exercise number and 
        setExercise3(responseJson);

        // setExercise1([exercise1],responseJson);

      })
      .catch((error) => {
        console.error(error);
      })
  }

  useEffect(() => {
    //Calls fetchExercise multiple times to return contents of exercise with given ID numbers
    fetchExercises();
    fetchExercises2();
    fetchExercises3();

    return () => {

    }
  }, [])

  const navigation = useNavigation();

  return (

    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 40, textAlign: "center", marginTop: 20, fontWeight: 'bold', color: 'black' }}>
          {routine}
        </Text>
        <ScrollView style={{ height: '80%' }}>
          <View style={{ paddingTop: '1%' }}>
            <View style={styles.item}>
              <Text style={styles.ListText}>{exercise1.ExerciseName}</Text>
            </View>
          </View>
          <View style={{ paddingTop: '1%' }}>
            <View style={styles.item}>
              <Text style={styles.ListText}>{exercise2.ExerciseName}</Text>
            </View>
          </View>
          <View style={{ paddingTop: '1%' }}>
            <View style={styles.item}>
              <Text style={styles.ListText}>{exercise3.ExerciseName}</Text>
            </View>
          </View>
          {/* <FlatList 
             style = {styles.list}
             //Change to exercises to test database data 
             data={test}
             renderItem={renderItem} 
             keyExtractor={(item, index) => index.toString()}
             stickyHeaderIndices={[0]}   
             ListHeaderComponent={() => (
              <Text style={{ fontSize: 40, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
                {routine}
              </Text>
            )}         
          />          */}
        </ScrollView>
      </View>

      <View style={{ paddingTop: '1%' }}>
        <LargeButton text="Start" onPress={() => navigation.navigate('WorkoutScreen',
          {
            exerciseNumber: 1, RoutineName: routine,
            setNums: setNums1, repNums: repNums1, exercise1: exercise1.ExerciseName,
            exercise2: exercise2.ExerciseName,
            exercise3: exercise3.ExerciseName, exerciseD1: exercise1.Descript,
            exerciseD2: exercise2.Descript, exerciseD3: exercise3.Descript,
            sessionKey: { sessionKey }, code: code, AD: AD, ID: ID
          })} />
      </View>

    </SafeAreaView >

  );
}

export default ProgramPreviewScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 5,
    flex: 1
  },
  list: {
    marginBottom: 50,
  },
  item: {
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    marginBottom: '3%',
    width: "93%"
  },
  ListText: {
    color: 'black',
    fontSize: 40,
    textAlign: 'center',
  }
});