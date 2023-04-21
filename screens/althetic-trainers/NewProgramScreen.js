import React from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView } from 'react-native';
import { MediumButton } from '../../src/components/Buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { LargeButton } from '../../src/components/Buttons';

// EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1


function NewProgramScreen({ navigation, route }) {
  let sessionKey = route.params.sessionKey;
  const [name, setName] = React.useState('');
  const [reps1, setReps1] = React.useState('');
  const [sets1, setSets1] = React.useState('');
  const [id1, setid1] = React.useState('');
  const [reps2, setReps2] = React.useState('');
  const [sets2, setSets2] = React.useState('');
  const [id2, setid2] = React.useState('');
  const [reps3, setReps3] = React.useState('');
  const [sets3, setSets3] = React.useState('');
  const [id3, setid3] = React.useState('');
  const [visible, setVisible] = React.useState('');

  const [assignID, setAssignID] = React.useState('');

  const handleNameChangeText = (text) => {
    setName(text);
  };

  const createNewRoutine= () => {
    var ids = id1 + '/' + id2 + '/' + id3;
    var sets = sets1 + '/' + sets2 + '/' + sets3;
    var reps = reps1 + '/' + reps2 + '/' + reps3;
    // EXAMPLE: https://createRoutine&name=Legs1&IDs=4/11/13&reps=10/10/10&sets=3/4/5&visible=1
    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=createRoutine&name=';
    var finalName = api.concat(name);
    var repapi = finalName.concat('&IDs=');
    var repsapi = repapi.concat(ids);
    repsapi = repsapi + '&reps=' + reps + '&sets=' + sets + '&visible=' + visible;
    console.log(repsapi);
    fetch(repsapi, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey
       }
    })
    
    .catch((error) => {
      console.error(error);
    })
}

const sendAndCont = () => {
  createNewRoutine();
  navigation.navigate('ATHomeScreen', {sessionKey: sessionKey});
}

  return (
    <SafeAreaView style={styles.container}>
      <TextInput style={styles.textInput}
        underlineColorAndroid="transparent"
        placeholder="Enter Program Name"
        placeholderTextColor="#777777"
        autoCapitalize="none"
        onChangeText={setName} 
        value = {name}/>
    <View style={{flexDirection: "column", justifyContent: "space-evenly"}}>
      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 0}}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Ex ID:</Text>
          <TextInput style={styles.textInput2} onChangeText={setid1} value={id1}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Sets:</Text>
          <TextInput style={styles.textInput2} onChangeText={setSets1} value={sets1}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Reps:</Text>
          <TextInput style={styles.textInput2} onChangeText={setReps1} value={reps1}/>
        </View>
      </View>


      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 20}}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Ex ID:</Text>
          <TextInput style={styles.textInput2} onChangeText={setid2} value={id2}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Sets:</Text>
          <TextInput style={styles.textInput2} onChangeText={setSets2} value={sets2}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Reps:</Text>
          <TextInput style={styles.textInput2} onChangeText={setReps2} value={reps2}/>
        </View>
      </View>


      <View style={{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 20}}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Ex ID:</Text>
          <TextInput style={styles.textInput2} onChangeText={setid3} value={id3}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Sets:</Text>
          <TextInput style={styles.textInput2} onChangeText={setSets3} value={sets3}/>
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Reps:</Text>
          <TextInput style={styles.textInput2} onChangeText={setReps3} value={reps3}/>
        </View>
      </View>
    
      <View style = {{flexDirection: "row", justifyContent: "space-evenly", paddingTop: 20}}> 
        <View style={styles.box} >
          <Text style={styles.font}>Assign User ID:</Text>
          <TextInput style={styles.textInput2} onChangeText={setAssignID} value={assignID}/>
        </View>
        <View style={styles.box} >
          <Text style={styles.font}>Visible (1/0):</Text>
          <TextInput style={styles.textInput2} onChangeText={setVisible} value={visible}/>
        </View>
      </View>

      </View>
      
      <View style={{paddingTop: 30}}>
        <LargeButton  text="Done" onPress={() => sendAndCont()} />
        </View>

        </SafeAreaView>
 
  );
}
    
export default NewProgramScreen;
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
    fontSize: 22,
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
    width: '45%',
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