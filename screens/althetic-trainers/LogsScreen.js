import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function LogsScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [position, setPosition] = useState('');
  const [logs, setLogs] = useState('');
  //const sessionKey = route.params.sessionKey;
  
  const fetchLogs = () => {


    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs&sdate=';
    const appendedAPI = api.concat(startDate + '&edate=' + endDate + '&name=' + name + '&position=' + position);
    
    const testAPI = api.concat('2023-04-01&edate=2023-04-20&name=Joe&position=WR');


   // fetch(testAPI, {
    //  headers: {
       // 'Authorization': 'Bearer ' + sessionKey
    //  }
   /// })
      //.then((response) => response.blob())
      //.then((blob) => {

     // })
     // .catch((error) => {
      //  console.error(error);
      //  navigation.navigate('ATHomeScreen')
      //})
  }
  useEffect(() => {
    fetchLogs();
    return () => {

    }
  }, []);


  return (
    <SafeAreaView style={styles.container}>
    <View style={{ width: '100%', marginTop: 5}}>
    <Text style={[styles.titlefont]}> Daily Logs</Text>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Players Attended</Text>
    </View>
    <FlatList
  data={logs}
  renderItem={({ item }) => (
    <View style={styles.row}>
      <View style={styles.playerContainer}>
        <Text style={styles.text}>Missing Player</Text>
      </View>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
    </View>
    </SafeAreaView>
    
  );
}


export default LogsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5',
  },
  titlefont: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    color: '#1E3861',
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
  textContainer: {
    borderRadius: 15, 
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        textAlign: 'center',
        width: "90%",   
        height: 80,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 40,
  },
  playerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 15,
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
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    color: '#1E3861',
  }
});