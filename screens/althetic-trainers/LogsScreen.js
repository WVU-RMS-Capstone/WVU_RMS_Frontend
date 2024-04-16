import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function LogsScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [position, setPosition] = useState('');
  const [logs, setLogs] = useState([]);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [roster, setRoster] = useState([]);


  let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let action = "getprogress";
  let getRosterAPI = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let getRosterAction = 'getroster';

  useEffect(() => {
    const sendRequest = async () => {
      let url = `${getRosterAPI}?action=${getRosterAction}`;
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
    };

    sendRequest();
  }, []);

  useEffect(() => {
    const fetchProgramInfo = async (athlete) => {
      setLoading(true);
      console.log("roster: ", roster)
      let url = `${api}?action=${action}&AthleteID=${athlete.data.UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text);
        const json = JSON.parse(text);
        console.log(athlete.data.UID, " ", json);

        if (json.TotalExercises != undefined && json.CompletedExercises != undefined) {
          setCompleted(json.CompletedExercises);
          setTotal(json.TotalExercises);
          setLogs((prevLogs) => [...prevLogs, { athlete, progress: json }]);
        } else {
          setLogs((prevLogs) => [...prevLogs, { athlete, progress: null }]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      setLoading(false);
    };

    if (roster.length > 0) {
      const unassignedAthletes = roster.filter((athlete) => !athlete.data.ProgramID);
      unassignedAthletes.forEach(fetchProgramInfo);
    }
  }, [roster]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', marginTop: 5 }}>
        <Text style={[styles.titlefont]}> Daily Logs</Text>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Players Started Program</Text>
        </View>
        <View style={{ maxHeight: '30%', overflow: 'scroll' }}>
          <FlatList
            data={logs.filter(({ progress }) => progress)}
            renderItem={({ item }) => (
              <View style={styles.playerContainer}>
                <Text style={styles.text}>{item.athlete.data.FirstName} {item.athlete.data.LastName}</Text>
              </View>
            )}
            keyExtractor={(item) => item.athlete.data.UID}
            scrollEnabled={true}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Player Not Started or Unassign Programs</Text>
        </View>
        <View style={{ maxHeight: '30%', overflow: 'scroll' }}>
          <FlatList
            data={logs.filter(({ progress }) => !progress)}
            renderItem={({ item }) => (
              <View style={styles.playerContainer}>
                <Text style={styles.text}>
                  {item.athlete.data.FirstName} {item.athlete.data.LastName}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item.athlete.data.UID}
            scrollEnabled={true}
          />
        </View>
      </View >
    </SafeAreaView >

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
    marginVertical: 10,
    marginHorizontal: '5%',
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
    marginTop: 5,
    marginBottom: 10,
    color: '#1E3861',
  }
});