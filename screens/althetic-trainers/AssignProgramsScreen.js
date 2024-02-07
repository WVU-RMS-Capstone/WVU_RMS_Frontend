import React from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { LargeButton } from '../../src/components/Buttons';

// EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1


function AssignProgramsScreen({ navigation, route }) {
  const sessionKey = route.params.sessionKey;


  const [userID, setUserID] = React.useState('');
  const [routineID, setRoutineID] = React.useState('');
  const [notes, setnotes] = React.useState('');

const createAssignedRoutine= () => {

  // EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=
  //assignUserRoutines&user=1&routine=1&notes=Rest&check=1
  var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=assignUserRoutines&user=';
  api = api + userID + '&routine=' + routineID + '&notes=' + notes + '&check=1'
  console.log(api);
  fetch(api, {
    headers: {
      'Authorization': 'Bearer ' + sessionKey
     }
  })
  
  .catch((error) => {
    console.error(error);
    navigation.navigate('ATHomeScreen', {sessionKey: sessionKey});
  })
}

const sendAndCont = () => {
  createAssignedRoutine();
  navigation.navigate('ATHomeScreen', {sessionKey: sessionKey});
}

  return (
    <SafeAreaView style={styles.container}>
        <View>
        <View style = {styles.box}>
     <Text style = {styles.font}> Routine Assignment  </Text>
     </View>

    <View style={{marginTop: 30, marginBottom: 30}}>
        <View styles = {{marginTop: 30}}> 
        <View style={styles.box} >
          <Text style={styles.font}>User ID:</Text>
          <TextInput style={styles.textInput2} onChangeText={setUserID} value={userID}/>
        </View>
        </View>

        <View styles = {{marginTop: 30}}> 
        <View style={styles.box} >
          <Text style={styles.font}>Routine Id:</Text>
          <TextInput style={styles.textInput2} onChangeText={setRoutineID} value={routineID}/>
        </View>
        </View>

        <View styles = {{paddingTop: 50}}> 
        <View style={styles.box} >
          <Text style={styles.font}>Notes:</Text>
          <TextInput style={styles.textInput2} onChangeText={setnotes} value={notes}/>
        </View>
        </View>
        </View>
      
      <View style={{paddingTop: 30}}>
        <LargeButton  text="Done" onPress={() => sendAndCont()} />
        </View>
        </View>
        </SafeAreaView>
 
  );
}
    
export default AssignProgramsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',    
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
  font: {
    fontSize: 32,
    marginRight: 10,
  },
  textInput2: {
    fontSize: 24,
    flex: 1,
  },
  smallBox: {
    borderRadius: 5,
    padding: 10,
    width: '32%',
    height: 103,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    
  },
  box: {
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 75,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign:'center',
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '500',
    backgroundColor: '#D9D9D9',
  },
});