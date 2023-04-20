import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import { LargeButton } from '../../src/components/Buttons';

function LogsScreen({navigation}) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [position, setPosition] = useState('');

  const fetchLogs = () => {

    const session_token = "87dd921c352ae2540dcbb918fe5297f12fe399345dbfae7960313443f57ed3aa";
    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs';

    fetch(api, {
      headers: {
        'Authorization': 'Bearer ' + session_token
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {

      })
      .catch((error) => {
        console.error(error);
      })
  }
  useEffect(() => {
    fetchLogs();
    return () => {

    }
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View styles={backgroundColor = '#444444'}>
        <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
          {item}
        </Text>
      </View>
    );
  };

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
        <LargeButton text="Get Logs" onPress={() => navigation.navigate('ATHomeScreen') } />
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
  },
});