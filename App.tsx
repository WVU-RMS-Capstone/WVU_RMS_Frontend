/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ATHomeScreen from './screens/althetic-trainers/ATHomeScreen';
import AthleteHomeScreen from './screens/athlete/AthleteHomeScreens';
import RosterScreen from './screens/althetic-trainers/RosterScreen';
import AthleteStatsScreen from './screens/AthleteStatsScreen';
import NewProgramScreen from './screens/althetic-trainers/NewProgramScreen';
import NewExerciseScreen from './screens/althetic-trainers/NewExerciseScreen';
import FeaturedProgramSelectionScreen from './screens/althetic-trainers/SelectedFeaturedProgramScreen';
import AthleteProfileScreen from './screens/althetic-trainers/AthleteProfileScreen';
import LogsScreen from './screens/althetic-trainers/LogsScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import NotesScreen from './screens/NotesScreen';
import FeaturedProgramsScreen from './screens/althetic-trainers/FeaturedProgramsScreen';
import SelectedFeaturedProgramScreen from './screens/althetic-trainers/SelectedFeaturedProgramScreen';
import CompletedWorkoutScreen from './screens/athlete/CompletedWorkoutScreen';
import ProgramsScreen from './screens/athlete/ProgramsScreen';
import SelectedProgramScreen from './screens/athlete/SelectedProgramScreen';
import WorkoutScreen from './screens/athlete/WorkoutScreen';
import ProgramPreviewScreen from './screens/athlete/ProgramPreviewScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle:"", headerTransparent:true }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ATHomeScreen" component={ATHomeScreen} />
        <Stack.Screen name="RosterScreen" component={RosterScreen} />
        <Stack.Screen name="AthleteStatsScreen" component={AthleteStatsScreen} />
        <Stack.Screen name="AthleteProfileScreen" component={AthleteProfileScreen} />
        <Stack.Screen name="NewProgramScreen" component={NewProgramScreen} />
        <Stack.Screen name="NewExerciseScreen" component={NewExerciseScreen} />
        <Stack.Screen name="FeaturedProgramsScreen" component={FeaturedProgramsScreen} />
        <Stack.Screen name="SelectedFeaturedProgramScreen" component={SelectedFeaturedProgramScreen} />
        <Stack.Screen name="LogsScreen" component={LogsScreen} />
        <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
        <Stack.Screen name="NotesScreen" component={NotesScreen} />
        <Stack.Screen name="AthleteHomeScreen" component={AthleteHomeScreen} />
        <Stack.Screen name="CompletedWorkoutScreen" component={CompletedWorkoutScreen} />
        <Stack.Screen name="ProgramsScreen" component={ProgramsScreen} />
        <Stack.Screen name="ProgramPreviewScreen" component={ProgramPreviewScreen} />
        <Stack.Screen name="SelectedProgramScreen" component={SelectedProgramScreen} />
        <Stack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
