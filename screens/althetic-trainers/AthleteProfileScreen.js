import React from 'react';
import {View, StyleSheet} from 'react-native';
import { LargeButton } from '../../src/components/Buttons';


function AthleteProfileScreen({ navigation, route }) {
 // const { athleteName } = route.params;

  return (
    <View style={styles.background}>
      <View style={[styles.circleContainer, { marginTop: -210, marginLeft: -210 }]}>
        <View style={styles.circle}></View>
      </View>
      <View style={[styles.buttonContainer, { marginTop: '25%' }]}>
        <LargeButton text="Assign Program" onPress={() => navigation.navigate('AssignProgramsScreen')} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: '5%' }]}>
        <LargeButton text="View Stats" adjustFontSizeToFit onPress={() => navigation.navigate('AthleteStatsScreen')} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: '5%' }]}>
        <LargeButton text="View Notes" adjustFontSizeToFit onPress={() => navigation.navigate('NewProgramScreen')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#AEB6C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    marginTop: -120,
    marginLeft: -10,
  },
  circle: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    backgroundColor: "#2C3C63",
    marginTop: 8,
    marginLeft: 30
  },
  buttonContainer:{
    width:"120%",
    marginTop:'1%',
    paddingVertical:'1%',
    paddingHorizontal:'2%',
    alignSelf:'center',
    marginTop: 150 
  }
})

export default AthleteProfileScreen;