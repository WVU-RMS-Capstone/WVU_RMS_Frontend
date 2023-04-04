import React from 'react';
import {View, Button} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function AthleteHomeScreen({ navigation }) {
  return (
    <View style={{gap: 20, marginVertical:'50%'}}>
      <LargeButton text="Premade Programs"
        onPress={() => navigation.navigate('ProgramsScreen')} />
    <LargeButton text="Exercises"
        onPress={() => navigation.navigate('ExercisesScreen')} />
    <LargeButton text="Progress"
        onPress={() => navigation.navigate('AthleteStatsScreen')} />
    <LargeButton text="Notes"
        onPress={() => navigation.navigate('NotesScreen')} />
    </View>
  );
}

export default AthleteHomeScreen;