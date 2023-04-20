import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function ATHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <LargeButton text="Roster"
          onPress={() => navigation.navigate('RosterScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Create/Edit Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewProgramScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Create/Edit Excercises"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewExerciseScreen')} />
      </View>
      <View style={styles.button}>
        <LargeButton text="Change Featured Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('FeaturedProgramsScreen')} />
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'45%',
    marginBottom:"55%"
  }
  ,
  button:{
    width:"100%",
    marginTop:'10%', 
    paddingVertical:'1%', 
    paddingHorizontal:'2%',
    alignSelf:'center'
  }
});