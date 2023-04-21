import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function ATHomeScreen({ navigation, route }) {
  const sessionKey = route.params.sessionKey;
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <LargeButton text="Create Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewProgramScreen', {sessionKey: sessionKey} )} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Create Excercise"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewExerciseScreen', {sessionKey: sessionKey})} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Assign Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('AssignProgramsScreen', {sessionKey: sessionKey})} />
      </View>
      {/* <View style={styles.button}>
        <LargeButton text="Change Featured Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('FeaturedProgramsScreen', {sessionKey: sessionKey})} />
      </View> */}
      <View style={styles.button}>
        <LargeButton text="Logs"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('LogsScreen', {sessionKey: sessionKey})} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Logout"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('LoginScreen')} />
      </View>
    </View>
  );
}

export default ATHomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'45%',
    marginBottom:"55%"
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