import 'react-native-gesture-handler'
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, TextField, Card, Colors, Button} from 'react-native-ui-lib'
import { WebView } from 'react-native-webview';
import { block } from 'react-native-reanimated';




function WorkoutScreen({ navigation }) {
  return (
    <ScrollView flex paddingH-25 paddingT-20>
      <ScrollView horizontal = {true} flex paddingH-25 paddingT-20 backgroundColor = {"#121212"}>
        <Card
          height={500}
          width ={600}
          backgroundColor = "#515151"
          flex
          marginR-50
          marginL-50
       >
          <Card.Section
            content={[{text: 'Exercise Name', text20: true, white: true}]}
            contentStyle={{alignItems: 'center', backgroundColor: '#627D98'}}/>
          {/* <WebView style={styles.container}
            source={{ uri: 'https://www.youtube.com/embed/T_l0AyZywjU' }}/> */}
        </Card>
      </ScrollView>
      
      <ScrollView horizontal = {true} flex paddingH-25 paddingT-20 backgroundColor = {"#121212"}>
        <Card 
          width ={600}
          backgroundColor = "#515151"
          flex
          marginTop = {50}
          marginR-20
          marginL-20

       >

      <Card.Section 
      
        content={[{text: 'Exercise Name', text20: true, 'white': true, height :60, Width : 600}]}
        contentStyle={{alignItems: 'center', backgroundColor: '#627D98'}}/>

        <Text style = {textStyle.container}> A Written Description of the Workout Will Go Here</Text>
        
      <View flexDirection = 'row' marginT-20>
          <Card.Section style = {sectionLeft.container}
          content={[{text: 'Sets: XX', text20: true, 'white': true}]}
          contentStyle={{alignItems: 'center', backgroundColor: '#627D98', height : 60, width: 285}}/>
        
          <Card.Section  style = {sectionRight.container}
          content={[{text: 'Reps: XX', text20: true, 'white': true, alignItems: 'center'}]}
          contentStyle={{alignItems: 'center', backgroundColor: '#627D98', height : 60, width: 285}}/>
        </View>
      
      <Card.Section marginT-20 
          content={[{text: 'Body Part / Muscle: ', text20: true, 'white': true}]}
          contentStyle={{alignItems: 'center', backgroundColor: '#627D98', height : 60, width: 600}}/>
      </Card>

      </ScrollView>

      <View marginT-10 paddingRight-20>  
      </View>

      <Button text70 background= {'#FFABO0'} label = "Done"
       onPress={() => navigation.navigate('CompletedWorkoutScreen')} />
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container:{
    alignSelf: 'center',
    paddingRight: 500,
    marginTop: 15,
    marginBottom: 15,
    width: 300,
    height: 50,
  }
});
const sectionRight = StyleSheet.create({
  container:{
    paddingLeft : 10,
    paddingRight : 5
  }
});
const sectionLeft = StyleSheet.create({
  container:{
    paddingLeft : 5,
    paddingRight : 10
  }
});
const textStyle = StyleSheet.create({
  container:{
    color: 'white',
    fontSize: 28,
    alignSelf: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    marginBottom: 10
  }
});


export default WorkoutScreen;