import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput, Card, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SmallTile } from '../../src/components/Tiles';
import { MediumButton } from '../../src/components/Buttons';
import { SelectList } from 'react-native-dropdown-select-list';


function ProgramsScreen({ route, navigation }) {

  const [selected, setSelected] = useState("");

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
  let action = 'fetchpremadeprograms';
  const [programs, setPrograms] = useState([]);
  const [filteredprograms, setFilteredprograms] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
      const sendRequest = async () => {
          let url = `${api}?action=${action}`;
          console.log(url);
          try {
              const response = await fetch(url);
              const text = await response.text(); // Get the raw response text
              const json = JSON.parse(text); // Parse the text as JSON
              console.log(json);
              setPrograms(json);
              setFilteredprograms(json);
              // setSelectedItems(json);
              return json;
          } catch (error) {
              console.error("Error fetching data: ", error);
          }
      };

      sendRequest();
  }, []);

  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      setSelectImage(response.assets[0].uri)
      console.log(response);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={[styles.input, { backgroundColor: 'white' }]}
          placeholder='Search programs'
          autoCapitalize='none'
          // onChangeText={(text) => setEmail(text)}
        />
      </View>

      <Text style={{ marginBottom: 10 }}></Text>

      <View style={[styles.row]}>
        <TouchableOpacity style={styles.coverImg} onPress={() => {
          ImagePicker();
        }}>
          <Text>Insert Cover</Text>
        </TouchableOpacity>
        <Text>Assigned Program{"\n"}_________</Text>
      </View>

      <Text style={{ marginBottom: 10 }}></Text>

      <View style={styles.dropdown}>
        <Text style={[styles.font, { fontSize: 25 }]}>Category</Text>
        <SelectList
          boxStyles={{marginTop: 15, backgroundColor: 'white'}}
          placeholder='Select Workout'
          // setSelected={setSelected}
          setSelected={(val) => setSelected(val)}
          data={filteredprograms}
          save="value"
        />
      </View>

      <View>
      </View>
    </SafeAreaView>
  );

}

export default ProgramsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AEB6C5'
  },
  searchBox: {
    marginHorizontal: 20,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  coverImg: {
    backgroundColor: 'white',
    width: '40%',
    height: 100,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  font: {
    fontSize: 15,
    color: '#000000'
  },
  dropdown: {
    paddingHorizontal: 25,
  },
});



//Code to pull session token



// var IDD = ""; 
// var AD = "0"; 

// const ProgramsScreen = ({navigation, route}) => { 
 
//   const session_token =  route.params.sessionKey;
//   console.log(session_token);
//   //USe this to switch what state displays like item.title or item.id 
//   //Change to item.RoutineName when RoutineNAme starts returning string values.
//    const renderItem2 = ({ item }) =>{
//     console.log(AD);
//    return( 
//    <Item2 title={item.data.RoutineName}
//      IDD = {item.data.RoutineId} AD = { AD = item.data.AssignmentId}
//     />
//         )
//    }

//    const renderItem = ({ item }) =>{
   
//    return( 
//    <Item title={item.data.RoutineName} IDD = {item.data.RoutineId} AD = "0"
//     />
//         )
//    }



//    const Item = ({ title, IDD, AD }) => {
   
//     const navigation = useNavigation();
    
//     return(
//     <View style={styles.item}> 
//         <MediumButton
//         onPress={() =>  {navigation.navigate('SelectedProgramScreen', { RoutineName: title, 
//         sessionKey: {session_token}, ID: IDD, AD : AD}) }} 
//            text={title} 
//            color = {'black'}/> 
//     </View> 
//     );
//     }

//     const Item2 = ({ title, IDD, AD }) => {
//       const navigation = useNavigation();
      
//       return(
//         <View style={styles.item}> 
//         <MediumButton
//         onPress={() =>  {navigation.navigate('SelectedProgramScreen', { RoutineName: title, 
//         sessionKey: {session_token}, ID: IDD, AD : AD}) }} 
//            text={title} 
//            color = {'black'}/> 
//     </View> 
//       );
//       }


//   //Gives little line for item seperation
//   const ItemSep = () => {
//     return(
//       <View
//       style = {{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}> 
        
//       </View>    )
//   }

//   //States for Search and filter premade programs + assigned programs
//   const [filterD, setFilter] = useState([]);
//   const [master, setMaster] = useState([]);
//   const [assigned, setAssigned] = useState([]);
//   const [search, setSearch] = useState('');

// const fetchPremadePrograms = () => {
  
//   const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getRoutines'
//   console.log(session_token);
//   fetch(api, {
//      headers: {
//       'Authorization': 'Bearer ' + session_token
//      }
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {

//     //Sets filterD and master to the response Json. This works with a placeholder API appropriately
//     setFilter(responseJson);
//     setMaster(responseJson);

//   }) 
//   .catch((error) => {
//     console.error(error);
//     {navigation.navigate('AthleteHomeScreen')}
     
//   })
// }

// //Used to fetch user assigned programs 
// const fetchAssignedPrograms = () => {

//  const api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=getUserRoutines'

//   fetch(api, {
//      headers: {
//       'Authorization': 'Bearer ' + session_token
//      }
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
// //Sets assigned useState to the responseJson
//     setAssigned(responseJson);

//   }) 
//   .catch((error) => {
//     console.error(error);
//   })
// }


  

// //Required becuase of hook implementations
//  useEffect(() => {
  
//   fetchPremadePrograms();
//   fetchAssignedPrograms();

//   return () => {

//   }
// }, [])


//   //Search bar and filter implementation 
//   const searchFilter = (text) => {
//     if(text) {
//       const newD = master.filter((item) => {
//         const itemD = item.data.RoutineName ? item.data.RoutineName.toUpperCase() : ''.toUpperCase();
//         const textD = text.toUpperCase();
//         return itemD.indexOf(textD) > -1;
//       });
//       setFilter(newD);
//       setSearch(text);
//     }
//     else{
//       setFilter(master);
//       setSearch(text);
//     }
//   }

//   return ( 
//       <SafeAreaView style={styles.container}>
       
//        <View>
        
//        <TextInput
//              style = {styles.box}
//              value = {search}
//              placeholder= {"Search Premade Sets Here"}
//              placeholderTextColor={'black'}
//              cent
//              onChangeText={(text) => searchFilter(text)}
//            >

//           </TextInput> 

//         <FlatList style = {styles.list}
//         //Change to assigned for database values
//           data={assigned} 
//         //Change to renderItem for test to not be broken if no string value is found
//           renderItem={renderItem2} 
//           keyExtractor={item => item.data.RoutineId} 
          
//           stickyHeaderIndices={[0]}
//           ListHeaderComponent={() => (
//             <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
//               Assigned Programs
//             </Text>
//           )}
      
//         /> 
//         </View>
        
//           <View style = {styles.list2}>
            
//             {/* List for Premade searchable programs*/}
//            <FlatList 
//              style = {styles.list}
//              data={filterD} 
//              ItemSeparatorComponent={ItemSep}
//              renderItem={renderItem} 
//              //keyExtractor={item => item.RoutineId} 
//              keyExtractor={item => item.data.RoutineId} 
//              stickyHeaderIndices={[0]}  
//              ListHeaderComponent={() => (
//               <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold', color: 'black' }}>
//                 Premade Programs
//               </Text>
//             )}          
//           /> 
        
//           </View>
//       </SafeAreaView> 
      
//   );
// }

// export default ProgramsScreen;

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 25,
//     padding: 5,
//     flex: 1,
//   },
//   list: {
//     marginBottom: 50,
//   },
//   list2: {
//     flex: 1
//   },
//   item: {
//     flex:1,
//     marginHorizontal:'1%',
//     marginVertical:'1%'
//   },
//   text: {
//     color: 'black',
//     backgroundColor: "#627D98",
//     padding: 10,
//     marginVertical: 5,
//     marginHorizontal: 15,
//   },
//   searchbar: {
//     height: 40,
//     borderWidth: 1,
//     paddingLeft: 20,
//     borderColor: "#627D98",
//     backgroundColor: 'white',
//     margin: 5,
//     textAlign: 'center'
//   },
//   box: {
//     textAlign: 'center',
//     borderRadius: 5,
//     padding: 10,
//     width: '90%',
//     height: 50,
//     borderRadius: 15,   
//     alignSelf: 'center',
//     backgroundColor: '#D9D9D9',
//   },
//   butt:{
//     color: 'white' 
//   }
// });