import React from 'react';
import { View, Button } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function ATHomeScreen({ navigation }) {
  return (
    <View style={{ marginVertical: '30%' }}>
      <View style={{ paddingBottom: '10%' }}>
        <LargeButton text="Roster"
          onPress={() => navigation.navigate('RosterScreen')} />
      </View>
      <View style={{ paddingBottom: '10%' }}>
        <LargeButton text="Create/Edit Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewProgramScreen')} />
      </View>
      <View style={{ paddingBottom: '10%' }}>
        <LargeButton text="Create/Edit Excercises"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('NewExerciseScreen')} />
      </View>
      <View style={{ paddingBottom: '10%' }}>
        <LargeButton text="Change Featured Program"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('FeaturedProgramsScreen')} />
      </View>
      <View style={{ paddingBottom: '10%' }}>
        <LargeButton text="Logs"
          adjustFontSizeToFit
          onPress={() => navigation.navigate('LogsScreen')} />
      </View>
    </View>
  );
}

export default ATHomeScreen;
