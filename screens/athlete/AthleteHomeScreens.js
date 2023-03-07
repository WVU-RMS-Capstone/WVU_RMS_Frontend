import React from 'react';
import {View, Button} from 'react-native';
import { MediumButton } from '../../src/components/Buttons';

function AthleteHomeScreen({ navigation }) {
  return (
    <View style={{gap: 20, marginVertical:'50%'}}>
      <MediumButton text="Premade Programs"
        onPress={() => navigation.navigate('ProgramsScreen')} />
    <MediumButton text="Exercises"
        onPress={() => navigation.navigate('ExercisesScreen')} />
    <MediumButton text="Progress"
        onPress={() => navigation.navigate('AthleteStatsScreen')} />
    <MediumButton text="Notes"
        onPress={() => navigation.navigate('NotesScreen')} />
    </View>
  );
}

export default AthleteHomeScreen;