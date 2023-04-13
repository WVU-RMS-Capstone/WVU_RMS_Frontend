import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput} from 'react-native';
import {Card} from 'react-native-ui-lib'
import { useNavigation } from '@react-navigation/native';

//Session token should be a global variable???? 

/* fetch('https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=userinfo', {
	headers: {
		'Authorization': 'Bearer ' + session_token
	}
})
.then(response => {
// Send a get request to obtain the users assigned workouts and store them in the assigned program array.

})
.catch(error => {
// Navigate user back to login screen

});   */

const assignedPrograms = [
  {id: "1", title: "Triceps 1", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups",  },
  {id: "2", title: "Biceps 1",  exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
];
const testPrograms = [
  {id: "1", title: "Triceps 1", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups" },
  {id: "2", title: "Biceps 1", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "3", title: "Hamstring 1", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "4", title: "Triceps 2", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "5", title: "Biceps 2", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "6", title: "Hamstring 2", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "7", title: "Triceps 3", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "8", title: "Biceps 3", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "9", title: "Hamstring 3", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
  {id: "10", title: "Shoulders", exercise1: "Tricep pulls", exercise2: "tricep extensions", exercise3: "pushups"},
];

const Item = ({ title }) => {
  const navigation = useNavigation();
  return(
  <View style={styles.item}> 
      <Button onPress={() => {navigation.navigate('ProgramPreviewScreen', "Tricep Pulls") }} 
         title={title} 
         color = {'white'}/> 
  </View> 
  );
  }
  
  

function addPrograms(array){


}

const ProgramsScreen = () => { 
   
  //USe this to switch what state displays like item.title or item.id
  const renderItem = ({ item }) => ( <Item title={item.title} /> );

  const [filterD, setFilter] = useState([]);
  const [master, setMaster] = useState([]);
  const [search, setSearch] = useState('');

  
  
//This is where the json should be pulled
 const fetchPosts = () => {
  setFilter(testPrograms);
  setMaster(testPrograms);
 }

 useEffect(() => {
  fetchPosts();
  return () => {

  }
}, [])

 
  
  const searchFilter = (text) => {
    if(text) {
      const newD = master.filter((item) => {
        const itemD = item.title ? item.title.toUpperCase() : ''.toUpperCase();
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
          data={assignedPrograms} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
          
          stickyHeaderIndices={[0]}
          ListHeaderComponent={() => (
            <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'white' }}>
              Assigned Programs
            </Text>
          )}
      
        /> 
        </View>
        
          <View style = {styles.list2}>
            
        

           <FlatList 
             style = {styles.list}
             data={filterD} 
             renderItem={renderItem} 
             keyExtractor={(item, index) => index.toString()} 
             stickyHeaderIndices={[0]}  
             ListHeaderComponent={() => (
              <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'white' }}>
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