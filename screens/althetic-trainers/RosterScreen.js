import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, FlatList, StyleSheet, Text, Button, SafeAreaView, TextInput, Pressable, TouchableOpacity, Image } from 'react-native';
import { LargeAltButton, LargeButton } from '../../src/components/Buttons';

function RosterScreen({ navigation, route }) {

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let action = 'getroster';
  const [roster, setRoster] = useState([]);
  const [filteredRoster, setFilteredRoster] = useState([]);
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
        setRoster(json);
        setFilteredRoster(json);
        return json;
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  }, []);


  const searchFilter = (text) => {
    if (text) {
      const updatedData = roster.filter((item) => {
        const item_data = `${item.data.FirstName.toUpperCase()} ${item.data.LastName.toUpperCase()}`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      setSearch(text);
      setFilteredRoster(updatedData);
    } else {
      setFilteredRoster(roster)
      setSearch('')
    }
  }


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
        data={filteredRoster}
        renderItem={({ item }) =>
          <TouchableOpacity style={styles.ath} onPress={() => navigation.navigate('AthleteProfileScreen', { athlete: item })}>
            <View style={styles.row}>
              <Text style={styles.first}>{item.data.FirstName}{' '}
                <Text style={styles.last}>{item.data.LastName}</Text>
              </Text>
            </View>
          </TouchableOpacity>
        }
      />

      <LargeAltButton text="Athlete Logs"
        adjustFontSizeToFit
        onPress={() => navigation.navigate('LogsScreen')} />

    </SafeAreaView >
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
    marginHorizontal: '10%',
    marginTop: 10,
    height: 50,
    borderRadius: 10,
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
    paddingTop: '3%'
  },
  last: {

  },
  circle: {
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    backgroundColor: "#2C3C63",
    marginTop: 8,
    marginLeft: 30
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
    alignSelf: 'center'

  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  box: {
    maxHeight: '75%'
  },
  button: {
    paddingLeft: 150,
    textAlign: 'center'
  }

});