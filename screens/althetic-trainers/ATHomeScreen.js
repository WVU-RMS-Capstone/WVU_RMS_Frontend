import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { LargeAltButton, LargeButton } from '../../src/components/Buttons';
function ATHomeScreen({ navigation, route }) {
  const { UID } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.img} source={require('../../assets/Logo.png')} />
        <Text style={[styles.titlefont]}>| Rehabilitation Monitoring System</Text>
      </View>
      <View style={styles.button}>
        <LargeAltButton text="Create Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewProgramScreen')} />
      </View>
      <View style={styles.button}>
        <LargeAltButton text="View Roster"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('RosterScreen')} />
      </View>
      <View style={styles.button}>
        <LargeAltButton text="Create Excercise"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewExerciseScreen', { UID: UID })} />
      </View>
      <View style={styles.button}>
        <LargeAltButton text="Update Program/Exercises"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('UpdateProgramExercise', { UID: UID })} />
      </View>
      <View style={styles.button}>
        <LargeAltButton text="Update Profile"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('EditProfile', { UID: UID })} />
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
  },
  button: {
    width: "120%",
    marginTop: '10%',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '25%'
  },
  titlefont: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: '10%',
    color: '#1E3861',
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 10
  }
});
