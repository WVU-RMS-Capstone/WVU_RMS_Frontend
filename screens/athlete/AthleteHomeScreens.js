import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

function AthleteHomeScreen({ navigation, route }) {
  const { UID } = route.params;
  console.log(UID);
  const [data, setData] = useState('');
  const [picture, setPicture] = useState('');

  let userAPI = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
  let userAction = 'getuserinfo';

  useEffect(() => {
    const getUserInfo = async () => {
      let url = `${userAPI}?action=${userAction}&UID=${UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setData(json);
        setPicture(json[0].data[4]);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getUserInfo();
  }, []);

  const signOut = async () => {
    // setLoading(true);
    try {
      const response = await signOut(FIREBASE_AUTH);
      console.log(response);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.row}>
        <Image style={styles.img} source={require('../../assets/Logo.png')} />
        <Text style={[styles.titlefont]}>| Rehabilitation Monitoring System</Text>
      </View> */}

      <View style={[styles.item, { marginTop: '20%' }]}>
        <View style={styles.defaultcover}>
          {picture ? (
            <Image
              style={styles.profilePicture}
              source={{ uri: picture }}
            />
          ) : (
            <Text style={styles.text}>Athlete Image</Text>
          )}
        </View>
      </View>
      <View style={{ marginTop: '30%' }}>
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

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile', { UID: UID })}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Sign Out</Text >
            </View>
          </TouchableOpacity>
        </View>
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
    width: 300,
    height: 300,
    borderRadius: 300 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4DAE4',
  },
  text: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '5%'
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    justifyContent: 'center',
    width: 250,
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
  },
  profilePicture: {
    width: '75%',
    height: '25%',
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: 'center'
  }
});