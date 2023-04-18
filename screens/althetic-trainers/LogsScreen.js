import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';

function LogsScreen() {
  const [logs, setLogs] = useState([]);
  
  const fetchLogs = () => {
  
    const session_token = '168e1edf3c3d7219167672affc1fe28b839f1f1922217b56bedc143396ab1709';
    const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=pullLogs';
   
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
    <FlatList
      data={logs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

export default LogsScreen;