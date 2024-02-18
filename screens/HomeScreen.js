import React from 'react';
import { View, Button } from 'react-native';
import { MediumButton, SmallButton, LargeButton } from '../src/components/Buttons';
import { SmallTile, MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation, route }) {
  const sessionKey = "59b5b70d2bf568ce979f62f668d04712f7622c9408024a161bdcbeb62ae6505e";

  return (

    <View style={{ width: '100%', marginVertical: '50%' }}>

      <LargeButton text="Login"
        onPress={() => navigation.navigate('LoginScreen', { sessionKey: sessionKey })} />
      <LargeButton text="Create Account"
        onPress={() => navigation.navigate('SignUp', { sessionKey: sessionKey })} />

    </View>
  );
}

export default HomeScreen;