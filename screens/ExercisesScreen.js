import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Button, SafeAreaView, TextInput, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import { setEnabled } from 'react-native/Libraries/Performance/Systrace';

function ExercisesScreen({ navigation, route }) {
  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'fetchallexercises';
  const [rawExercises, setRawExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${api}?action=${action}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get the raw response text
        const json = JSON.parse(text); // Parse the text as JSON
        console.log(json);
        setRawExercises(json);
        setFilteredExercises(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const updatedData = rawExercises.filter((item) => {
        const item_data = `${item.data.Name.toUpperCase()}`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setSearch(text);
      setFilteredExercises(updatedData);
    } else {
      setFilteredExercises(rawExercises)
      setSearch('')
    }
  }

  // Sort exercises into categories
  const categorizedExercises = () => {
    var exercises = [];

    for (e in rawExercises) {
      data = rawExercises[e]['data'];

      // Convert the raw exercise data into something FlatList can handle
      // TODO: corralate an exerciseID to a button in the FlatList
      // TODO: Add the cover image?
      const temp = {
        key: data['Name']
      }
      
    // Get the body part for this exercise
    const bodyPart = data['BodyPart'].toUpperCase();

    // If this body part hasn't been seen before, initialize an empty array for it
    if (!exercises[bodyPart]) {
      exercises[bodyPart] = [];
    }

    // Add this exercise to the list of exercises for its body part
    exercises[bodyPart].push(temp);
    }

    return exercises;
  }
  
  // This will return each of the dynamically generated FlatLists for each body part.
  const categorizedLists = () => {
    const lists = [];
  
    // Categorize the raw exercise data
    const exercises = categorizedExercises();
    
    // For each of the exercise categories, define a View containing a Text label and a Flatlist.
    // The FlatList is populated with each exercise.
    for (e in exercises) {
      lists.push(
        <View key={e}>
          <Text style={styles.label}>{e}</Text>
          <FlatList
            data={exercises[e]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      );
    }
    
    return lists;
  }
  
  // This will return a View containing a list of exercises as a result of the filtered search results.
  const searchResultList = () => {
    const list = [];
    
    for (e in filteredExercises) {
      list.push(
        <View key={e}>
          <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
            <View style={styles.row}>
              <Text>{filteredExercises[e].data.Name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
    
    return list;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          clearButtonMode='always'
          placeholder='Search Exercise'
          autoCapitalize='none'
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <View style={{ maxHeight: '62%' }}>
        <ScrollView style={{}}>
          { 
            // By default, show categorized exercises.
            // If searching, show search results instead.
            (!search.length) ? 
            categorizedLists()
            :
            searchResultList()
          }
        </ScrollView>
      </View>

      <View style={{}} >
        <Text style={styles.button}>Place buttons here</Text>
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 25
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  background: {
    margin: 50,
    backgroundColor: 'white',
  },
  ath: {
    backgroundColor: 'white',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    height: 25,
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    })
  },
  row: {
    flexDirection: "row",
  },
  button: {
    // paddingLeft: 150,
    marginTop: '50%',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 5,
    color: '#1E3861',
    width: '50%',
  },
})

export default ExercisesScreen;