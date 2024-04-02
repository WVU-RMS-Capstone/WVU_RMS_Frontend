import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, ScrollView, SectionList, View, Text } from 'react-native';
import { LargeButton, InverseLargeButton } from '../../src/components/Buttons';
import { useNavigation, useRoute } from '@react-navigation/native';

function ProgramPreviewScreen({ navigation, route }) {
  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'getprogramexercises';
  
  const { program } = route.params;
  const [programData, setProgramData] = useState({
    current: 0, // 0 means program hasn't been started
    exercises: {}
  });
  
  console.log(program)

  useEffect(() => {
    const sendRequest = async () => {      
      let url = `${api}?action=${action}&ProgramID=${program.data.ProgramID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text);
        const json = JSON.parse(text);
        console.log(json);
        
        // TODO: Check and make sure at least 1 exercise is defined (Workout_1)
        setProgramData(json)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {program.data.Cover ? (
        <Image
          style={{ width: '75%', height: '25%' }}
          source={{ uri: program.data.Cover }}
        />
      ) : (
        <View style={styles.defaultcover}>
          <Text>Cover</Text>
        </View>
      )}
      <Image
        source={{ uri: program.data.Cover }}
      />

      <View style={styles.titlepos}>
        <Text style={styles.title}>Selected Program: {program.data.ProgramName}</Text>
      </View>

      {/* <View style={styles.box}> 
          <TextInput
            style={styles.input}
            value={code}
            placeholder='Enter in STA Code'
            onChangeText={setCode}
          />
        </View> */}
      <View style={styles.button}>
        <InverseLargeButton text="Begin Workout"
          onPress={() => navigation.navigate('ExerciseDetailScreen', { 
            exerciseID: programData['Workout_1'],
            programData: programData 
          })} />
        <Text style={[{ paddingBottom: 10 }]}></Text>
        <LargeButton text="Back to Program Screen"
          onPress={() => navigation.navigate('ProgramsScreen')} />
      </View>
    </SafeAreaView>
  );
}

export default ProgramPreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  },
  coverImg: {
    backgroundColor: 'white',
    width: '75%',
    height: '25%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  titlepos: {
    alignSelf: 'center',
    marginTop: 10
  },
  title: {
    color: '#1E3861',
    fontWeight: 'bold',
    fontSize: 15
  },
  input: {
    height: 50,
    marginTop: 30,
    borderRadius: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: 5
  },
  box: {
    alignSelf: 'center',
    width: '75%',
  },
  button: {
    marginTop: '40%',
    paddingBottom: 15
  },
  defaultcover: {
    width: '75%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  }
});