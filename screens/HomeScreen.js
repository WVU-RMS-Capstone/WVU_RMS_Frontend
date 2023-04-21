import React from 'react';
import {View, Button} from 'react-native';
import { MediumButton, SmallButton, LargeButton } from '../src/components/Buttons';
import { SmallTile,MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation, route}) {
  const sessionKey = route.params.data;
  console.log("hi");
  console.log(sessionKey);
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