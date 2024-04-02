import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function ATHomeScreen({ navigation }) {

  const logout= () => {
 
    const api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?action=logout&userid=28"
    fetch(api, {
      
    })
    
    .catch((error) => {
      console.error(error);
    })
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <LargeButton text="Create Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewProgramScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="View Roster"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('RosterScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Create Excercise"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewExerciseScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Assign Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('AssignProgramsScreen')} />
      </View>
      
      <View style={styles.button}>
        <LargeButton text="Logs"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('LogsScreen')} />
      </View>
      
    </View>
  );
}

export default ATHomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#AEB6C5',
    alignItems: 'center',
    justifyContent: 'center',
  }
  ,
  button:{
    width:"120%",
 
    marginTop:'10%', 
    paddingVertical:'1%', 
    paddingHorizontal:'2%',
    alignSelf:'center'
  }
});