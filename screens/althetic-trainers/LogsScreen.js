import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import Pdf from 'react-native-pdf';

function LogsScreen() {
  const [logs, setLogs] = useState([]);
  
  const fetchLogs = () => {
  
    const session_token = '168e1edf3c3d7219167672affc1fe28b839f1f1922217b56bedc143396ab1709';
    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs';
    var IDD = ""; 
    var AD = "0"; 
    const source = { uri: 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs&sdate=2023-04-11&edate=2023-04-12&name=Chase&position=WR', cache: true };

     fetch(api, {
        headers: {
         'Authorization': 'Bearer ' + session_token
        }
     })
     .then((response) => response.json())
     .then((responseJson) => {
        setLogs(responseJson);
   
     }) 
     .catch((error) => {
       console.error(error);
     })
   }
   useEffect(() => {
    fetchLogs();
  }, []);
  
  const renderItem = ({ item }) => {
    return (
      <View styles={backgroundColor='#444444'}>
      <Text px={5} py={2} rounded="md" bg="primary.300" my={2}>
        {item}
      </Text>
      </View>
    );
  };
  
  return (
    <View>
      <Pdf source = {source}/>
    </View>
  );
}

export default LogsScreen;