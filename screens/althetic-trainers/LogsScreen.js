import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Item } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { LargeButton } from '../../src/components/Buttons';

function LogsScreen({ navigation }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [position, setPosition] = useState('');
  const [logs, setLogs] = useState('');

  
  const fetchLogs = () => {

    const sessionKey = route.params.sessionKey;
    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs&sdate=';
    const appendedAPI = api.concat(startDate + '&edate=' + endDate + '&name=' + name + '&position=' + position);
    
    const testAPI = api.concat('2023-04-01&edate=2023-04-20&name=Joe&position=WR');


    fetch(testAPI, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey
      }
    })
      .then((response) => response.blob())
      .then((blob) => {

      })
      .catch((error) => {
        console.error(error);
        navigation.navigate('ATHomeScreen')
      })
  }
  useEffect(() => {
    fetchLogs();
    return () => {

    }
  }, []);


  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput}
        underlineColorAndroid="transparent"
        placeholder="Enter Athlete Name"
        placeholderTextColor="#777777"
        autoCapitalize="none"
        onChangeText={setName}
        value={name} />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", paddingTop: '1%' }}>
        <View style={styles.smallBox} >
          <Text style={styles.font}>Start Date:</Text>
          <TextInput style={styles.textInputSmall}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#777777"
            autoCapitalize="none"
            onChangeText={setStartDate}
            value={startDate} />
        </View>
        <View style={styles.smallBox} >
          <Text style={styles.font}>End Date:</Text>
          <TextInput style={styles.textInputSmall}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#777777"
            autoCapitalize="none"
            onChangeText={setEndDate}
            value={endDate} />
        </View>
      </View>
      <TextInput style={styles.textInput}
        underlineColorAndroid="transparent"
        placeholder="Enter Athlete Position"
        placeholderTextColor="#777777"
        autoCapitalize="none"
        onChangeText={setPosition}
        value={position} />
      <View style={{ paddingTop: '10%', width: '100%' }}>
        <LargeButton text="Get Logs" onPress={() => navigation.navigate('ATHomeScreen', {sessionKey:sessionKey})} />
      </View>
    </View>

  );
}


export default LogsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
    fontSize: 40,
    paddingVertical: "1%",
    paddingHorizontal: "5%",
    marginBottom: '8%',
    marginTop: '5%',
    height: "15%",
    width: "93%"
  },
  smallBox: {
    borderRadius: 5,
    fontSize: 30,
    padding: 10,
    width: '45%',
    height: 140,
    borderRadius: 15,
    marginHorizontal: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  font: {
    fontSize: 32,
    marginRight: 10,
  },
  textInputSmall: {
    fontSize: 24,
    flex: 1,
  }
});