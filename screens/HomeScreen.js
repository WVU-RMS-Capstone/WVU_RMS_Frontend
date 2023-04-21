import React from 'react';
import {View, Button} from 'react-native';
import { MediumButton, SmallButton, LargeButton } from '../src/components/Buttons';
import { SmallTile,MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation }) {
  return (
    
    <View style={{width: '100%', marginVertical:'50%'}}>
      
      <LargeButton text="AT View"
        onPress={() => navigation.navigate('ATHomeScreen')} />
      <LargeButton text="Athlete View"
        onPress={() => navigation.navigate('AthleteHomeScreen')} />

      <LargeButton text="Login"
        onPress={() => navigation.navigate('LoginScreen')} />
      <LargeButton text="Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')} />
    </View>
  );
}

export default HomeScreen;
