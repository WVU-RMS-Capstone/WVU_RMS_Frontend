import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput} from 'react-native';
import {Card} from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';

//Testing atm when done, switch renderItem and data in flatlist
const assignedPrograms = [
  {id: "1", title: "Triceps 1", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups",  },
  {id: "2", title: "Biceps 1",  exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
];

//Code to pull session token
const session_token = "c94daee7cc8d195fa0534f1c951402574bcebb9a72b8f116a8d99145bd44fad9";


const Item = ({ title }) => {
  const navigation = useNavigation();
  
  //Use item.ExerciseIds instead of hardcoded string when data is working
  //Using brackets in route props like sessionKey:{session_token} makes 
  //it so you have to say sessionKey.session_token on the next screen
  return(
  <View style={styles.item}> 
      <Button onPress={() => {navigation.navigate('ProgramPreviewScreen', { RoutineName: "Routine Name", 
      setNums: "3/4/5",  repNums:"10/10/10",  exerciseIds: "4/11/14", sessionKey:{session_token}}) }} 
         title={title} 
         color = {'white'}/> 
  </View> 
  );
  }
  
const ProgramsScreen = () => { 
   
  //USe this to switch what state displays like item.title or item.id
   const renderItem2 = ({ item }) => ( <Item title={item.title} /> );

  const renderItem = ({item}) => {
    return(
      <Text style = {styles.text}> 
      {item.RoutineName}
      </Text>
    )
  }

  const ItemSep = () => {
    return(
      <View
      style = {{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}> 
        
      </View>    )
  }

  const [filterD, setFilter] = useState([]);
  const [master, setMaster] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [search, setSearch] = useState('');

  


const fetchPremadePrograms = () => {
  
  const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getRoutines'

  fetch(api, {
     headers: {
      'Authorization': 'Bearer ' + session_token
     }
  })
  .then((response) => response.json())
  .then((responseJson) => {

    setFilter(responseJson);
    setMaster(responseJson);

  }) 
  .catch((error) => {
    console.error(error);
  })
}

const fetchAssignedPrograms = () => {
  
 
 const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getUserRoutines'

  fetch(api, {
     headers: {
      'Authorization': 'Bearer ' + session_token
     }
  })
  .then((response) => response.json())
  .then((responseJson) => {

    setAssigned(responseJson);

  }) 
  .catch((error) => {
    console.error(error);
  })
}

 useEffect(() => {
  
  fetchPremadePrograms();
  fetchAssignedPrograms();

  //Returning undefined data???  
  console.log("hello");
  const output = filterD.map(user => user.RoutineName);
  console.log(output);
  return () => {

  }
}, [])

 
  
  const searchFilter = (text) => {
    if(text) {
      const newD = master.filter((item) => {
        const itemD = item.RoutineName ? item.RoutineName.toUpperCase() : ''.toUpperCase();
        const textD = text.toUpperCase();
        return itemD.indexOf(textD) > -1;
      });
      setFilter(newD);
      setSearch(text);
    }
    else{
      setFilter(master);
      setSearch(text);
    }
  }

  return ( 
      <SafeAreaView style={styles.container}>
       
       <View>
        
       <TextInput
             style = {styles.searchbar}
             value = {search}
             placeholder= {"Search Premade Sets Here"}
             placeholderTextColor={'#D3D3D3'}
             cent
             onChangeText={(text) => searchFilter(text)}
           >

          </TextInput> 

        <FlatList style = {styles.list}
        //Change to assign for database values
          data={assignedPrograms} 
        //Change to renderItem for test to not be broken if no string value is found
          renderItem={renderItem2} 
          keyExtractor={item => item.RoutineId} 
          
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
              Assigned Programs
            </Text>
          )}
      
        /> 
        </View>
        
          <View style = {styles.list2}>
            
        

           <FlatList 
             style = {styles.list}
             data={filterD} 
             ItemSeparatorComponent={ItemSep}
             renderItem={renderItem} 
             //keyExtractor={item => item.RoutineId} 
             keyExtractor={(item, index) => index.toString()} 
             stickyHeaderIndices={[0]}  
             ListHeaderComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
                Premade Programs
              </Text>
            )}          
          /> 
        
          </View>
      </SafeAreaView> 
      
  );
}

export default ProgramsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 5,
    flex: 1
  },
  list: {
    marginBottom: 50,
  },
  list2: {
    flex: 1
  },
  item: {
    backgroundColor: "#627D98",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  text: {
    color: 'black',
    backgroundColor: "#627D98",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 15,
  },
  searchbar: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    borderColor: "#627D98",
    backgroundColor: 'white',
    margin: 5,
    textAlign: 'center'
  },
  butt:{
    color: 'white' 
  }
});