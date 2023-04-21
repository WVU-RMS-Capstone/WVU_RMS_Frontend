import React from 'react';
import {View, Button} from 'react-native';
import { MediumButton, SmallButton, LargeButton } from '../src/components/Buttons';
import { SmallTile,MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation }) {
  const sessionKey = "b0157344f67facaf6393f741c40ea919188f5028b87ff9f72df3d4edc58fe635"
  return (
    
    <View style={{width: '100%', marginVertical:'50%'}}>
      
      <LargeButton text="AT View"
        onPress={() => navigation.navigate('ATHomeScreen', {sessionKey : sessionKey})} />
      <LargeButton text="Athlete View"
        onPress={() => navigation.navigate('AthleteHomeScreen', {sessionKey : sessionKey})} />
    
    </View>
  );
}

export default HomeScreen;