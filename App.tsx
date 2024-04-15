import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View, Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ATHomeScreen from './screens/althetic-trainers/ATHomeScreen';
import AthleteHomeScreen from './screens/athlete/AthleteHomeScreens';
import RosterScreen from './screens/althetic-trainers/RosterScreen';
import AthleteStatsScreen from './screens/AthleteStatsScreen';
import NewProgramScreen, { ExerciseContext } from './screens/althetic-trainers/NewProgramScreen';
import NewExerciseScreen from './screens/althetic-trainers/NewExerciseScreen';
import FeaturedProgramSelectionScreen from './screens/althetic-trainers/SelectedFeaturedProgramScreen';
import AthleteProfileScreen from './screens/althetic-trainers/AthleteProfileScreen';
import LogsScreen from './screens/althetic-trainers/LogsScreen';
import AssignProgramsScreen from './screens/althetic-trainers/AssignProgramsScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import NotesScreen from './screens/althetic-trainers/NotesScreen';
import FeaturedProgramsScreen from './screens/althetic-trainers/FeaturedProgramsScreen';
import CompletedProgramScreen from './screens/athlete/CompletedProgramScreen';
import SelectedProgramScreen from './screens/athlete/SelectedProgramScreen';
import ProgramPreviewScreen from './screens/athlete/ProgramPreviewScreen';
import ReturnToHomeScreen from './screens/athlete/ReturnToHomeScreen';
import SignUp from './screens/SignUp';
import ProgramsScreen from './screens/athlete/ProgramsScreen';
import AddExercise from './screens/althetic-trainers/AddExercise';
import EditProfile from './screens/EditProfile';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import CategoryExercisesScreen from './screens/CategoryExercisesScreen';
import CreateNotesScreen from './screens/althetic-trainers/CreateNotesScreen';
import UpdateProgramExercise from './screens/althetic-trainers/UpdateProgramExercise';
import UpdateExercise from './screens/althetic-trainers/UpdateExercise';
import UpdateProgram from './screens/althetic-trainers/UpdateProgram';

const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        style={{
          width: 30,
          height: 30,
          marginRight: 10,
          marginTop: 10
        }}
        source={require('./assets/Logo.png')}
      />
      <Text style={{
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#1E3861',
      }}> | Rehabilitation Monitoring System</Text>
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerBackTitleVisible: false, headerTitle: "", headerTransparent: true }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerBackTitleVisible: false, headerTitle: () => <LogoTitle /> }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerBackTitleVisible: false, headerTitle: () => <LogoTitle /> }} />
        <Stack.Screen name="ATHomeScreen" component={ATHomeScreen} options={{ headerBackTitleVisible: false, headerTitle: () => <LogoTitle /> }} />
        <Stack.Screen name="RosterScreen" component={RosterScreen} />
        <Stack.Screen name="AthleteStatsScreen" component={AthleteStatsScreen} />
        <Stack.Screen name="AthleteProfileScreen" component={AthleteProfileScreen} />
        <Stack.Screen name="NewProgramScreen" component={NewProgramScreen} />
        <Stack.Screen name="NewExerciseScreen" component={NewExerciseScreen} />
        <Stack.Screen name="FeaturedProgramsScreen" component={FeaturedProgramsScreen} />
        <Stack.Screen name="LogsScreen" component={LogsScreen} />
        <Stack.Screen name="AddExercise" component={AddExercise} />
        <Stack.Screen name="AssignProgramsScreen" component={AssignProgramsScreen} />
        <Stack.Screen name="NotesScreen" component={NotesScreen} />
        <Stack.Screen name="AthleteHomeScreen" component={AthleteHomeScreen} options={{ headerBackTitleVisible: false, headerTitle: () => <LogoTitle /> }} />
        <Stack.Screen name="CompletedProgramScreen" component={CompletedProgramScreen} />
        <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
        <Stack.Screen name="CategoryExercisesScreen" component={CategoryExercisesScreen} />
        <Stack.Screen name="ExerciseDetailScreen" component={ExerciseDetailScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerTitle: "Profile" }} />
        <Stack.Screen name="ProgramPreviewScreen" component={ProgramPreviewScreen} />
        <Stack.Screen name="SelectedProgramScreen" component={SelectedProgramScreen} />
        <Stack.Screen name="ReturnToHomeScreen" component={ReturnToHomeScreen} />
        <Stack.Screen name="ProgramsScreen" component={ProgramsScreen} />
        <Stack.Screen name="CreateNotesScreen" component={CreateNotesScreen} />
        <Stack.Screen name="UpdateProgramExercise" component={UpdateProgramExercise} />
        <Stack.Screen name="UpdateExercise" component={UpdateExercise} />
        <Stack.Screen name="UpdateProgram" component={UpdateProgram} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}