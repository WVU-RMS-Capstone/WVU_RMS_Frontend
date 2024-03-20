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

  // Here is where you'd do any sorting of the exercises into categories
  // Temporarily, all loaded exercises are being put in the 
  const prepareExercises = () => {
    var exercises = [];

    for (e in rawExercises) {
      data = rawExercises[e]['data'];

      // Convert the raw exercise data into something FlatList can handle
      // TODO: corralate an exerciseID to a button in the FlatList
      // TODO: categorize this exercise based on body part
      const temp = {
        key: data['Name']
      }

      // Add to list of categorized exercises
      exercises.push(temp);
    }

    return exercises;
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
          <Text style={styles.label}>Foot</Text>
          <FlatList
            data={prepareExercises()}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
          <Text style={styles.label}>Leg</Text>
          <FlatList
            data={[
              { key: 'Devin A' },
              { key: 'Dan B' },
              { key: 'Dominic C' },
              { key: 'Jackson D' },
              { key: 'James E' },
              { key: 'Joel F' },
              { key: 'John G' },
              { key: 'Jillian H' },
            ]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
          <Text style={styles.label}>Knee</Text>
          <FlatList
            data={[
              { key: 'Devin A' },
              { key: 'Dan B' },
              { key: 'Dominic C' },
              { key: 'Jackson D' },
              { key: 'James E' },
              { key: 'Joel F' },
              { key: 'John G' },
              { key: 'Jillian H' },
            ]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          /><Text style={styles.label}>Foot</Text>
          <FlatList
            data={[
              { key: 'Devin A' },
              { key: 'Dan B' },
              { key: 'Dominic C' },
              { key: 'Jackson D' },
              { key: 'James E' },
              { key: 'Joel F' },
              { key: 'John G' },
              { key: 'Jillian H' },
            ]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
          <Text style={styles.label}>Foot</Text>
          <FlatList
            data={[
              { key: 'Devin A' },
              { key: 'Dan B' },
              { key: 'Dominic C' },
              { key: 'Jackson D' },
              { key: 'James E' },
              { key: 'Joel F' },
              { key: 'John G' },
              { key: 'Jillian H' },
            ]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
          <Text style={styles.label}>Foot</Text>
          <FlatList
            data={[
              { key: 'Devin A' },
              { key: 'Dan B' },
              { key: 'Dominic C' },
              { key: 'Jackson D' },
              { key: 'James E' },
              { key: 'Joel F' },
              { key: 'John G' },
              { key: 'Jillian H' },
            ]}
            horizontal={true}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('SelectedFeaturedProgramScreen')}>
                <View style={styles.row}>
                  <Text>{item.key}</Text>
                </View>
              </TouchableOpacity>
            }
          />
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