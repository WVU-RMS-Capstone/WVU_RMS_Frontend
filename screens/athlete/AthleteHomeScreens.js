import React from 'react';
import {View, StyleSheet} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function AthleteHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <LargeButton text="Premade Programs"
          onPress={() => navigation.navigate('ProgramsScreen')} />
       </View>
       <View style={styles.button}>
        <LargeButton text="Exercises"
          onPress={() => navigation.navigate('ProgramsScreen')} />
       </View>
       <View style={styles.button}>
        <LargeButton text="Progress"
          onPress={() => navigation.navigate('ProgramsScreen')} />
       </View>
       <View style={styles.button}>
        <LargeButton text="Notes"
          onPress={() => navigation.navigate('ProgramsScreen')} />
       </View>
    </View>
  );
}

export default AthleteHomeScreen;
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