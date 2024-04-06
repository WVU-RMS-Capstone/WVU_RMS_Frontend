import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LargeAltButton, LargeButton } from '../../src/components/Buttons';
function ATHomeScreen({ navigation }) {

  const logout= () => {
 
    const api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?action=logout&userid=28"
    fetch(api, {
      // headers: {
      //   'Authorization': 'Bearer ' + sessionKey
      //  }
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
        <LargeButton text="Update Profile"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('AssignProgramsScreen')} />
      </View>
       <View style={styles.button}>
        <LargeButton text="Update Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('FeaturedProgramsScreen', {sessionKey: sessionKey})} />
      </View> 
      <View style={styles.button}>
        <LargeButton text="Logs"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('LogsScreen')} />
      </View>
      {/* <View style={styles.button}>
        <LargeButton text="Logout"
          adjustFontSizeToFit
          onPress={() => {logout(); navigation.navigate('LoginScreen')}}  />
      </View> */}
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
  },
  button:{
    width:"120%",
    marginTop:'10%', 
    paddingVertical:'1%', 
    paddingHorizontal:'2%',
    alignSelf:'center'
  },
  buttonText: {
    color: 'white',
  }
});
