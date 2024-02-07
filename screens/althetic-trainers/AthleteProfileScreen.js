import React from 'react';
import {View, Button} from 'react-native';

function AthleteProfileScreen({ navigation }) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Assign Program"
        onPress={() => navigation.navigate('ATHomeScreen')} />
    <Button title="View Stats"
        onPress={() => navigation.navigate('AthleteStatsScreen')} />
    <Button title="View Notes"
        onPress={() => navigation.navigate('NewProgramScreen')} />
    </View>
  );
}

export default AthleteProfileScreen;