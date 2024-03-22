import React, { useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, Text, TextInput, Checkbox, DatePicker} from 'react-native';
import { LargeButton, DateSelector } from '../../src/components/Buttons';

function SelectedFeaturedProgramScreen({ navigation }) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startOpen, setStartOpen] = useState(false)
  const [endOpen, setEndOpen] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const [startText, setStartText] = useState('Select start date');
  const [endText, setEndText] = useState('Select end date');
  const [filteredRoster, setFilter] = useState([]);
  const [master, setMaster] = useState([]);
  const [roster, setAssigned] = useState([]);
  const [search, setSearch] = useState('');

  const Separator = () => (
    <View style={styles.separator} />
  );
  
  const searchFilter = (text) => {
    if(text) {
      const newD = master.filter((item) => {
        const itemD = item.data.FirstName ? item.data.FirstName.toUpperCase() : ''.toUpperCase();
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

  const getRoster = () => {

  }
  
  useEffect(() => { getRoster() }, []);
  
  const assignUserRoutines = () => {
    //EXAMPLE: https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=assignUserRoutines&user=1&routine=1&notes=Rest&check=1
    const api  = ' https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=assignUserRoutines&user=1&routine=1&notes=Rest&check=1';

    fetch(finalDescription, {
      headers: {
        'Authorization': 'Bearer ' + sessionKey
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
  
  const completedAssign = () => {
    // assignUserRoutines()
    navigation.navigate('HomeScreen');
  } 

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.selectedProgram}>Name of selected program</Text>
        <Text style={styles.activeWeek}>Active Week</Text>
      </View>
      
      <View style={styles.assign}> 
        <Text style={styles.assignText}>Assign to all athletes</Text>
      </View>
      <View style={styles.searchBox}>
        <TextInput
            style = {styles.searchInput}
            value = {search}
            placeholder= {"Search Athletes Here"}
            placeholderTextColor={'#5A5A5A'}
            cent
            onChangeText={(text) => searchFilter(text)}
        ></TextInput> 
      </View>
      <FlatList  windowSize={3} initialNumToRender={3} maxToRenderPerBatch={3} onScrollToIndexFailed={() => {}}
          data={filteredRoster} keyExtractor={item => item.data.UserId} ItemSeparatorComponent={Separator} renderItem={({ item }) => (
            <View style={styles.players}> 
              <Text style={styles.playersText}>{`${item.data.FirstName}`} </Text>
              <Text style={styles.playersText}>{ `${item.data.LastName}`}</Text>
            </View>
          )}
      />
      <LargeButton text="Done"
        onPress={() => completedAssign()} />
    </View>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: 40,
  },
  dateRange: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  separator: {
    display: 'flex',
    height: 1,
    padding: 4
  },
  selectedProgram:  {
    fontSize: 40,
    fontWeight: "500",
    textAlign:'center',
    display: 'flex',
    
  },
  activeWeek: {
    fontSize: 32,
    fontWeight: "500",
    textAlign:'center',
  },
  assign: {
    marginTop: 25,
    borderRadius: 15,
    width: '60%',
    height: 69,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  assignText: {
    fontSize: 32,
    fontWeight: "500",
  },
  inputBox:{
    borderRadius: 5,
    padding: 10,
    width: '60%',
    height: 72,
    backgroundColor: '#D9D9D9',
    
    ...Platform.select({
        ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        },})
  },
  datePickerStyle: {
    width: 230,
  },
  players:{ 
    borderRadius: 15,
    width: '50%',
    height: 61,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  playersText: {
    fontSize: 22,
  },
  searchInput: {
    borderRadius: 15,
    padding: 10,
    width: '60%',
    height: 72,
    backgroundColor: '#D9D9D9',
    fontSize: 30,
    fontWeight:'500',
    textAlign:'center'
  },
  searchBox: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent:'space-around'
  }
});

export default SelectedFeaturedProgramScreen;