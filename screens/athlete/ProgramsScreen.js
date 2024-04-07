import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput, Card, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallTile } from '../../src/components/Tiles';
import { LargeButton, InverseLargeButton } from '../../src/components/Buttons';
import { SelectList } from 'react-native-dropdown-select-list';
import SelectedProgramScreen from './SelectedProgramScreen';


function ProgramsScreen({ route, navigation }) {
  const { UID } = route.params;
  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'fetchpremadeprograms';
  const [programs, setPrograms] = useState([]);
  const [filteredprograms, setFilteredprograms] = useState([]);
  const [selected, setSelected] = useState(null);
  const [programSelected, setProgramSelected] = useState(false);
  let getAthleteProgramAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let getAthleteProgramAction = 'getathleteprogram';
  const [assignedProgram, setAssignedProgram] = useState([]);
  const [picture, setPicture] = useState('');

  useEffect(() => {
    const getAssignedProgram = async () => {
      let url = `${getAthleteProgramAPI}?action=${getAthleteProgramAction}&AthleteUID=${UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setAssignedProgram(json);
        setPicture(json[0].data.Cover);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getAssignedProgram();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${api}?action=${action}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setPrograms(json);
        setFilteredprograms(json);
        // setSelectedItems(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);

  const handleSelected = (value) => {
    setSelected(value);
    setProgramSelected(true);
  }
  console.log(picture);
  return (
    <SafeAreaView style={styles.container}>

      <View style={[styles.row]}>
        <View style={styles.defaultcover}>
          {picture ? (
            <Image
              style={styles.profilePicture}
              source={{ uri: picture }}
            />
          ) : (
            <Text style={{ textAlign: 'center' }}>Program Picture</Text>
          )}
        </View>
        <Text style={[{ alignSelf: 'center', textAlign: 'center' }]}>Assigned Program:{"\n"}{assignedProgram[0] && assignedProgram[0].data ? assignedProgram[0].data.ProgramName : "Not Assigned"}</Text>
      </View>
      <View style={styles.buttonpos}>
        <TouchableOpacity onPress={() => navigation.navigate('ProgramPreviewScreen', { program: assignedProgram[0] })}>
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: '#FCCD0D' }]}>Continue With Assigned Program</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.dropdown}>
        <Text style={[styles.font, { fontSize: 25 }]}>Select a Program Instead</Text>
        <SelectList
          boxStyles={{ marginTop: 15, backgroundColor: 'white', }}
          placeholder='Select Program'
          setSelected={handleSelected}
          data={filteredprograms.map((item) => {
            return {
              key: item.data.ProgramID,
              value: item.data.ProgramName,
            }
          })}
          save="key"
        />
      </View>

      {programSelected && (
        <View style={[{ marginTop: '75%' }]}>
          <TouchableOpacity onPress={() => {
            const selectedPorgram = filteredprograms.find(program => program.data.ProgramID === selected);
            if (selectedPorgram) {
              navigation.navigate('ProgramPreviewScreen', { program: selectedPorgram });
            } else {
              alert('Please select a program first.');
            }
          }}>
            <View style={[styles.button, { backgroundColor: '#FCCD0D' }]}>
              <Text style={[styles.buttonText, { color: '#1E3861' }]}>Continue With Chosen Program</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* <View style={styles.buttonpos}>
        <TouchableOpacity onPress={() => navigation.navigate('ProgramPreviewScreen')}>
          <View style={styles.button}>
            <Text style={[styles.buttonText, { color: '#FCCD0D' }]}>Continue With Assigned Program</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          const selectedPorgram = filteredprograms.find(program => program.data.ProgramID === selected);
          if (selectedPorgram) {
            navigation.navigate('ProgramPreviewScreen', { programID: selectedPorgram.ProgramID });
          } else {
            alert('Please select a program first.');
          }
        }}>
          <View style={[styles.button, { backgroundColor: '#FCCD0D' }]}>
            <Text style={[styles.buttonText, { color: '#1E3861' }]}>Continue With Chosen Program</Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );

}

export default ProgramsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  },
  searchBox: {
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  coverImg: {
    backgroundColor: 'white',
    width: '40%',
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  defaultcover: {
    width: '40%',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D4DAE4',
  },
  profilePicture: {
    width: '40%',
    height: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  font: {
    fontSize: 15,
    color: '#000000'
  },
  dropdown: {
    paddingHorizontal: 25,
    height: 100,
    marginTop: '5%'
  },
  buttonpos: {
    marginTop: '10%'
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#757575",
    marginBottom: 15,
    justifyContent: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#1E3861',
    alignSelf: 'center',

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
    fontWeight: '500'
  },
});