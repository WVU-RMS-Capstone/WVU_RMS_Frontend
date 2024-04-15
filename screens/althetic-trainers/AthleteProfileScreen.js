import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';


function AthleteProfileScreen({ navigation, route }) {
  const { athlete } = route.params;
  console.log(athlete);
  let getAthleteProgramAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let getAthleteProgramAction = 'getathleteprogram';
  const [program, setProgram] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${getAthleteProgramAPI}?action=${getAthleteProgramAction}&AthleteUID=${athlete.data.UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setProgram(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);

  return (
    <View style={styles.background}>
      <View style={[styles.circleContainer]}>
        <View style={styles.circle}>
          <Image
            style={styles.img}
            source={{ uri: athlete.data.AthleteImage }}
          />
        </View>
        <Text style={styles.athlete}>{athlete.data.FirstName} {athlete.data.LastName}</Text>
        <Text style={styles.program}>Assigned Program: {program[0] && program[0].data ? program[0].data.ProgramName : "Not Assigned"}</Text>
      </View>
      <View style={[styles.buttonContainer, { marginTop: '10%' }]}>
        <LargeButton text="Assign Program" onPress={() => navigation.navigate('AssignProgramsScreen', { UID: athlete.data.UID })} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: '5%' }]}>
        <LargeButton text="View Stats" adjustFontSizeToFit onPress={() => navigation.navigate('AthleteStatsScreen')} />
      </View>
      <View style={[styles.buttonContainer, { marginTop: '5%' }]}>
        <LargeButton text="View Notes" adjustFontSizeToFit onPress={() => navigation.navigate('NotesScreen', { UID: athlete.data.UID })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#AEB6C5',
    justifyContent: 'center',
  },
  circleContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    backgroundColor: "#2C3C63",
    // marginTop: 8,
    // marginLeft: 20
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    alignSelf: 'center'

  },
  buttonContainer: {
    width: "120%",
    marginTop: '1%',
    paddingVertical: '1%',
    paddingHorizontal: '2%',
    alignSelf: 'center',
    marginTop: 150
  },
  athlete: {
    fontSize: 32,
    paddingTop: 10,
    // textAlign: 'center'
  },
  program: {
    paddingTop: 10,
    // textAlign: 'center',
    fontSize: 15
  }
})

export default AthleteProfileScreen;