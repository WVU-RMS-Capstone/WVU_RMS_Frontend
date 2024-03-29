import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function AthleteHomeScreen({ navigation, route }) {

  const logout = () => {

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
        <LargeButton text="Programs"
          onPress={() => navigation.navigate('ProgramsScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Exercises"
          onPress={() => navigation.navigate('ExercisesScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Progress"
          onPress={() => navigation.navigate('AthleteStatsScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Notes"
          onPress={() => navigation.navigate('NotesScreen')} />
      </View>
      {/* <View style={styles.button}>
        <LargeButton text="Logout"
          onPress={() => {logout(); navigation.navigate('LoginScreen')} } />
       </View> */}
    </View>
  );
}

export default AthleteHomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
    marginBottom: "55%"
  }
  ,
  button: {
    width: "100%",
    marginTop: '10%',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignSelf: 'center',
    fontSize: 10
  }
});