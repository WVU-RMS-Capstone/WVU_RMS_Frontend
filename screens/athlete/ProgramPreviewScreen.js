import React from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {View, Text, TextField, Card, Colors, Button} from 'react-native-ui-lib'

import { useNavigation, useRoute } from '@react-navigation/native';

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
      {title.toUpperCase()}
      </Text>
  </View> 
  );
  }


  const ProgramPreviewScreen = () => { 

    const navigation = useNavigation();
    const route = useRoute();

    const renderItem = ({ item }) => ( <Item title={item.title} /> );
    const exercise = route.params;

  return (

    <SafeAreaView style={styles.container}>       
          <View>
              
           <FlatList 
             style = {styles.list2}
             data={testExercises} 
             renderItem={renderItem} 
             keyExtractor={(item) => item.id}
             stickyHeaderIndices={[0]}   
             ListHeaderComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'white' }}>
                Workout Title
              </Text>
            )}         
          /> 
         
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Button text70 background = {'#FFABO0'} label = "Start"
       onPress={() => navigation.navigate('WorkoutScreen', {exercise} )} />
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