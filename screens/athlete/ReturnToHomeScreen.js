import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, FlatList, SafeAreaView, Text, StatusBar, ScrollView, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LargeButton } from '../../src/components/Buttons';

    function ReturnToHomeScreen({navigation, route}) {

      const note = route.params.note;
      const signOff = route.params.signOff;
      const code = route.params.code;
      const sessionKey = route.params.sessionKey;

      const [filterD, setFilter] = useState('');

      const submitNotes = () => {
  
        var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=endAct&notes=' 
        var notesAPI = api.concat(note);
      
        fetch(notesAPI, {
           headers: {
            'Authorization': 'Bearer ' + sessionKey.session_token
           }
        })
       .then((response) => response.json())
  .then((responseJson) => {

    //Sets filterD and master to the response Json. This works with a placeholder API appropriately
    setFilter(responseJson);

  }) 
        .catch((error) => {
          console.error(error);
          {navigation.navigate('ProgramsScreen')}
        })
      }
      
      
        const submitNotes2 = () => {
        
          var api = 'https://restapi-playerscompanion.azurewebsites.net/users/users.php?action=endActSign&notes=' 
          var notesAPI = api.concat(note);
          var codeAPI = notesAPI.concat('&code=');
          var completeAPI = codeAPI.concat(signOff);
          
          fetch(completeAPI, {
             headers: {
              'Authorization': 'Bearer ' + sessionKey.session_token
             }
          })
          .then((response) => response.json())
          .then((responseJson) => {
        
            //Sets filterD and master to the response Json. This works with a placeholder API appropriately
            setFilter(responseJson);
        
          }) 
          .catch((error) => {
            console.error(error);
            {navigation.navigate('ProgramsScreen')}
          })
        }

        useEffect(() => {     
      
          if(note === " " && code === " " && signOff === " "){
        
          }
          else{
            if(signOff !== ""){
              submitNotes2();
            }
            else{
              submitNotes();
            }
          }
          return () => {
        
          }
        }, [])
        
        return (
          <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
      <LargeButton  text = "Return Home" onPress={() => {navigation.navigate('AthleteHomeScreen', { sessionKey: sessionKey}) }} >
    </LargeButton>
          </SafeAreaView>
        );
      }
      
      export default ReturnToHomeScreen;
      
      const styles = StyleSheet.create({
        container: {
          marginTop: 25,
          padding: 5,
          flex: 1
        },
        text: {
          color: 'black',
          backgroundColor: "#627D98",
          padding: 10,
          marginVertical: 5,
          marginHorizontal: 15,
        },
      
      });