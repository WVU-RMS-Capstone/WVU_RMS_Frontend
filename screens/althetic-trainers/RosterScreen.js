import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, FlatList, StyleSheet, Text, Button, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function RosterScreen({ navigation, route }) {

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let action = 'getroster';
  const [roster, setRoster] = useState([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');

  const sendRequest = async () => {
    let url = `${api}?action=${action}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const text = await response.text(); // Get the raw response text
      const json = JSON.parse(text); // Parse the text as JSON
      console.log(json);
      setRoster(json);
      return json;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  const searchFilter = (text) => {
    const updatedData = roster.filter((item) => {
      const item_data = '${item.firstname.toUpperCase()} ${item.lastname.toUpperCase()}';
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearch(text);
    setRoster(updatedData);
  }

  // issues with these lines of code, constant loading of data probably going to crash system eventually
  useEffect(() => {
    sendRequest();
  }, [/**sendRequest */]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          clearButtonMode='always'
          placeholder='Search Athlete'
          autoCapitalize='none'
          value={search}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>

      <FlatList
        style={styles.box}
        data={roster}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('AthleteProfileScreen')}>
            <View style={styles.row}>
              <View style={styles.circle} />
              <Text style={styles.first}>{item.data[0]}</Text>
              <Text style={styles.last}>{item.data[1]}</Text>
            </View>
          </TouchableOpacity>
        }
      />

      <View style={styles.button}>
        <Text>Place buttons here</Text>
      </View>

    </SafeAreaView>
  );
}

export default RosterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
  },
  searchBox: {
    marginHorizontal: 20,
    marginBottom: 50
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
    height: 50,
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
  first: {
    marginTop: 15,
    marginLeft: 75
  },
  last: {
    marginTop: 15,
    marginLeft: 5
  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    backgroundColor: "#2C3C63",
    marginTop: 8,
    marginLeft: 30
  },
  row: {
    flexDirection: "row",
  },
  box: {
    marginBottom: 130
  },
  button: {
    paddingLeft: 150,
    textAlign: 'center'
  }

});