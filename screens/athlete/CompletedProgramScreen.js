import React, {useState} from 'react';
import { getCurrentUID } from '../../FirebaseConfig';
import {StyleSheet, TextInput, SafeAreaView, View, Text} from 'react-native';
import { LargeYellowButton } from '../../src/components/Buttons';

function CompletedProgramScreen({ navigation, route }) {
  const { programData } = route.params;

  return (
    <SafeAreaView style = {styles.container}>
      <View>
        <Text style={styles.title}>
          <Text style={styles.programName}>{programData.data.ProgramName}</Text> Completed!
        </Text>
        <LargeYellowButton text="Return to home"
          onPress={() => navigation.navigate('AthleteHomeScreen', { UID: getCurrentUID() })} />
      </View>
    </SafeAreaView>
  );
}

export default CompletedProgramScreen;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
    // paddingTop: 16,
  },
  title: {
    fontSize: 35, 
    textAlign: "center",
    fontWeight:'bold', 
    color: 'black',
    marginBottom: 10
  },
  programName: {
    fontSize: 35, 
    textAlign: "center",
    fontWeight:'bold', 
    color: '#1E3861',
    marginBottom: 10
  },

});