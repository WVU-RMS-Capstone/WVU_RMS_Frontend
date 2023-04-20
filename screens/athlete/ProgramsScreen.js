import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput} from 'react-native';
import {Card} from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';
import { SmallTile } from '../../src/components/Tiles';
import { MediumButton } from '../../src/components/Buttons';
  

//Code to pull session token
const session_token =    "3e546ebfa900ae47ca6b724edf8e9f8b6afc80ea7f8b2a409f1280697e0caa4e";
var IDD = ""; 
var AD = "0"; 

const ProgramsScreen = () => { 
   
  //USe this to switch what state displays like item.title or item.id 
  //Change to item.RoutineName when RoutineNAme starts returning string values.
   const renderItem2 = ({ item }) =>{
    IDD = item.data.RoutineId;

   return( 
   <Item title={item.data.RoutineName} 
    />
        )
   }

   const renderItem = ({ item }) =>{
    IDD = item.data.RoutineId;
    AD = item.data.AssignmentId;
    
   return( 
   <Item title={item.data.RoutineName} 
    />
        )
   }



   const Item = ({ title }) => {
   
    const navigation = useNavigation();
    
    return(
    <View style={styles.item}> 
        <MediumButton
        onPress={() =>  {navigation.navigate('SelectedProgramScreen', { RoutineName: title, 
        sessionKey: {session_token}, ID: IDD, AD : AD}) }} 
           text={title} 
           color = {'black'}/> 
    </View> 
    );
    }


  //Gives little line for item seperation
  const ItemSep = () => {
    return(
      <View
      style = {{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}> 
        
      </View>    )
  }

  //States for Search and filter premade programs + assigned programs
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

    //Sets filterD and master to the response Json. This works with a placeholder API appropriately
    setFilter(responseJson);
    setMaster(responseJson);

  }) 
  .catch((error) => {
    console.error(error);
    {navigation.navigate('AthleteHomeScreens')}
     
  })
}

//Used to fetch user assigned programs 
const fetchAssignedPrograms = () => {

 const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getUserRoutines'

  fetch(api, {
     headers: {
      'Authorization': 'Bearer ' + session_token
     }
  })
  .then((response) => response.json())
  .then((responseJson) => {
//Sets assigned useState to the responseJson
    setAssigned(responseJson);

  }) 
  .catch((error) => {
    console.error(error);
  })
}


  

//Required becuase of hook implementations
 useEffect(() => {
  
  fetchPremadePrograms();
  fetchAssignedPrograms();

  return () => {

  }
}, [])


  //Search bar and filter implementation 
  const searchFilter = (text) => {
    if(text) {
      const newD = master.filter((item) => {
        const itemD = item.data.RoutineName ? item.data.RoutineName.toUpperCase() : ''.toUpperCase();
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
             style = {styles.box}
             value = {search}
             placeholder= {"Search Premade Sets Here"}
             placeholderTextColor={'black'}
             cent
             onChangeText={(text) => searchFilter(text)}
           >

          </TextInput> 

        <FlatList style = {styles.list}
        //Change to assigned for database values
          data={filterD} 
        //Change to renderItem for test to not be broken if no string value is found
          renderItem={renderItem} 
          keyExtractor={item => item.data.RoutineId}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
              Assigned Programs
            </Text>
          )}
      
        /> 
        </View>
        
          <View style = {styles.list2}>
            
            {/* List for Premade searchable programs*/}
           <FlatList 
             style = {styles.list}
             data={filterD} 
             ItemSeparatorComponent={ItemSep}
             renderItem={renderItem2} 
             //keyExtractor={item => item.RoutineId} 
             keyExtractor={item => item.data.RoutineId} 
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
    flex: 1,
  },
  list: {
    marginBottom: 50,
  },
  list2: {
    flex: 1
  },
  item: {
    flex:1,
    marginHorizontal:'1%',
    marginVertical:'1%'
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
  box: {
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    width: '90%',
    height: 50,
    borderRadius: 15,   
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  butt:{
    color: 'white' 
  }
});