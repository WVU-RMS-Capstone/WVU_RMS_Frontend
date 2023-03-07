import React from 'react';
import {View, Button} from 'react-native';
import { MediumButton, SmallButton, LargeButton } from '../src/components/Buttons';
import { SmallTile,MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation }) {
  return (
    
    <View style={{width: '100%', marginVertical:'50%', gap:20}}>
      
      <LargeButton text="AT View"
        onPress={() => navigation.navigate('ATHomeScreen')} />
      <MediumButton text="Athlete View"
        onPress={() => navigation.navigate('AthleteHomeScreen')} />
    
    </View>
  );
}

export default HomeScreen;
