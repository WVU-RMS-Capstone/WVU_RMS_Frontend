import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ATHomeScreen from './screens/althetic-trainers/ATHomeScreen';
import AthleteHomeScreen from './screens/athlete/AthleteHomeScreens';
import RosterScreen from './screens/althetic-trainers/RosterScreen';
import AthleteStatsScreen from './screens/AthleteStatsScreen';
import NewProgramScreen from './screens/althetic-trainers/NewProgramScreen';
import NewExerciseScreen from './screens/althetic-trainers/NewExerciseScreen';
import FeaturedProgramSelectionScreen from './screens/althetic-trainers/SelectedFeaturedProgramScreen';
import AthleteProfileScreen from './screens/althetic-trainers/AthleteProfileScreen';
import LogsScreen from './screens/althetic-trainers/LogsScreen';
import AssignProgramsScreen from './screens/althetic-trainers/AssignProgramsScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import NotesScreen from './screens/NotesScreen';
import FeaturedProgramsScreen from './screens/althetic-trainers/FeaturedProgramsScreen';
import CompletedWorkoutScreen from './screens/athlete/CompletedWorkoutScreen';
import SelectedProgramScreen from './screens/athlete/SelectedProgramScreen';
import ProgramPreviewScreen from './screens/athlete/ProgramPreviewScreen';
import ReturnToHomeScreen from './screens/athlete/ReturnToHomeScreen';
import SignUp from './screens/SignUp';
import ProgramsScreen from './screens/athlete/ProgramsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitle: "", headerTransparent: true }}>
        {/* <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ATHomeScreen" component={ATHomeScreen} />
        <Stack.Screen name="RosterScreen" component={RosterScreen} />
        <Stack.Screen name="AthleteStatsScreen" component={AthleteStatsScreen} />
        <Stack.Screen name="AthleteProfileScreen" component={AthleteProfileScreen} />
        <Stack.Screen name="NewProgramScreen" component={NewProgramScreen} />
        <Stack.Screen name="NewExerciseScreen" component={NewExerciseScreen} />
        <Stack.Screen name="FeaturedProgramsScreen" component={FeaturedProgramsScreen} />
        <Stack.Screen name="LogsScreen" component={LogsScreen} />
        <Stack.Screen name="AssignProgramsScreen" component={AssignProgramsScreen} />
        <Stack.Screen name="NotesScreen" component={NotesScreen} />
        <Stack.Screen name="AthleteHomeScreen" component={AthleteHomeScreen} />
        <Stack.Screen name="CompletedWorkoutScreen" component={CompletedWorkoutScreen} options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
        }} />
        <Stack.Screen name="ProgramPreviewScreen" component={ProgramPreviewScreen} />
        <Stack.Screen name="SelectedProgramScreen" component={SelectedProgramScreen} />
        <Stack.Screen name="ReturnToHomeScreen" component={ReturnToHomeScreen} />
        <Stack.Screen name="ProgramsScreen" component={ProgramsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}