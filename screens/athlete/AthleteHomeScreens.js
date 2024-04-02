import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function AthleteHomeScreen({ navigation, route }) {
  const { UID } = route.params;
  console.log(UID);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.img} source={require('../../assets/Logo.png')} />
        <Text style={[styles.titlefont]}>| Rehabilitation Monitoring System</Text>
      </View>

      <View style={styles.item}>
        <View style={styles.defaultcover}>
          <Text style={styles.text}>Athlete Image</Text>
        </View>
      </View>
      <View style={{ marginTop: '50%' }}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('ProgramsScreen', { UID: UID })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Premade Program</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ExercisesScreen')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>List of{"\n"}Exercises</Text >
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

export default AthleteHomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  },
  item: {
    alignSelf: 'center'
  },
  defaultcover: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#D4DAE4",
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    justifyContent: 'center',
    width: 150,
    height: 90,
    backgroundColor: '#1E3861',
    alignSelf: 'center',
    marginBottom: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    })
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  titlefont: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: '25%',
    color: '#1E3861',
  },
  img: {
    width: 30,
    height: 30,
    marginRight: 10,
    marginTop: 10
  }
});