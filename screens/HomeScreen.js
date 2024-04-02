import React from 'react';
import { View, Button, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { MediumButton, SmallButton, LargeButton, LargeYellowButton, InverseLargeButton } from '../src/components/Buttons';
import { SmallTile, MediumTile, LargeTile } from '../src/components/Tiles';
function HomeScreen({ navigation, route }) {
  const sessionKey = "59b5b70d2bf568ce979f62f668d04712f7622c9408024a161bdcbeb62ae6505e";


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', marginTop: 200 }}>
        <View style={styles.title}>
          <View style={{ alignItems: 'center' }} >
            <Image source={require('../assets/Logo.png')} />
          </View>
          <Text style={[styles.titlefont]} > _______{"\n"}Rehabilitation Monitoring System</Text>
        </View>
        <LargeButton text="Login"
          onPress={() => navigation.navigate('LoginScreen', { sessionKey: sessionKey })} />
        <InverseLargeButton text="Create Account"
          onPress={() => navigation.navigate('SignUp', { sessionKey: sessionKey })} />
        <LargeButton text="[DEV] Trainer"
          onPress={() => navigation.navigate('LoginScreen', { devMode: 'trainer' })} />
        <LargeButton text="[DEV] Athlete"
          onPress={() => navigation.navigate('LoginScreen', { devMode: 'athlete' })} />
      </View>
    </SafeAreaView>
  );
}



export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#AEB6C5'
  },
  titlefont: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    color: '#1E3861',
  },
})