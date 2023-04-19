import 'react-native-gesture-handler'
import React, {useState} from 'react';
import {StyleSheet, TextInput, SafeAreaView} from 'react-native';
import {View, Text, Button} from 'react-native-ui-lib'
import { LargeButton } from '../../src/components/Buttons';

function CompletedWorkoutScreen({ navigation, route }) {
  const routine = route.params.RoutineName;
  const AD = route.params.AD;
  const sessionKey = route.params.sessionKey.sessionKey;
  


  //Shows signoff box if program was assigned
  const [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    if(AD == "0"){

    }
    else{
      setShowBox(!showBox);
    }
  
  };

  const MyBox = () => {
  toggleBox;
    return(<View> 
      {showBox && <TextInput
      style = {styles.searchbar}
      value = {value2}
      placeholder = 'Enter AT Signoff Code Here'
      placeholderTextColor={ '#D3D3D3'}
      onChangeText={text => onChangeText2(text)}>

      </TextInput> }
  </View>
    );
    }


  const [value, onChangeText] = React.useState('');
  const [value2, onChangeText2] = React.useState('');


  return (

    <SafeAreaView style = {styles.container}>
    <View>
        <Text style={styles.title}>
              Program {routine} Completed
            </Text>
      <View> 
      <TextInput
        style = {styles.box}
        value = {value}
        placeholder = 'Enter Notes Here'
        placeholderTextColor={'black'}
        maxLength={100}
        onChangeText={text => onChangeText(text)}>
    </TextInput>
      
    </View>
    <View>
        <MyBox />
    </View>
    <View style = {styles.buttonn}>
    <LargeButton   text = "Enter" onPress={() => {navigation.navigate('ReturnToHomeScreen', {note: value, signOff: value2, code: code, sessionKey: sessionKey} ) }} />
    
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
    fontSize: 45, 
    textAlign: "center",
    fontWeight:'bold', 
    color: 'black',
    marginBottom: 10

  },
  box: {
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 200,
    borderRadius: 15,   
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    marginBottom: 50,
    marginTop: 30,
    fontSize: 35
  },
  buttonn: {
    marginTop: 2
  }

});