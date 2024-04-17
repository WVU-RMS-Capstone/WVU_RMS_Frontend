import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, SafeAreaView, View, Text } from 'react-native';
import { LargeYellowButton } from '../src/components/Buttons';
import { ActivityIndicator } from 'react-native';

function AthleteStatsScreen({ navigation, route }) {
  const { athlete } = route.params;
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);

  let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
  let action = "getprogress";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AEB6C5',
      // paddingTop: 16,
    },
    title: {
      fontSize: 35,
      textAlign: "center",
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 50
    },
    progressContainer: {
      width: '75%',
      height: 20,
      backgroundColor: '#E5E5E5',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 10,
      alignSelf: 'center'
    },
    progressBar: {
      height: '100%',
      backgroundColor: '#FFC107'
    },
    progressText: {
      fontSize: 25,
      textAlign: "center",
      fontWeight: 'bold',
      color: '#1E3861',
      marginBottom: 50
    }
  });

  const approveCompletion = () => {
    const sendRequest = async () => {

      let url = `${api}?action=programsignoff&AthleteID=${athlete.data.UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text);

        alert("The program completion has successfully been approved.");

        setTotal(-1);
        setReloadFlag(true);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    sendRequest();
  };

  useEffect(() => {
    const sendRequest = async () => {
      setLoading(true);

      let url = `${api}?action=${action}&AthleteID=${athlete.data.UID}`;
      console.log(url);
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(text);
        const json = JSON.parse(text);
        console.log(json);

        if (json.TotalExercises != undefined && json.CompletedExercises != undefined) {
          setCompleted(json.CompletedExercises);
          setTotal(json.TotalExercises);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      setLoading(false);
    };

    sendRequest();
    setReloadFlag(false);
  }, [reloadFlag]);

  return (
    <SafeAreaView style={styles.container}>
      {!loading ? (
        <View>
          <Text style={styles.title}>
            <Text>{athlete.data.FirstName} {athlete.data.LastName}</Text>'s Progress:
          </Text>
          {total === -1 ? (
            <Text style={styles.progressText}>No program assigned.</Text>
          ) : (
            <>
              <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${(completed / total) * 100}%` }]} />
              </View>
              <Text style={styles.progressText}>{Math.round((completed / total) * 100)}% Completed</Text>
              {(completed >= total) ? (
                <LargeYellowButton
                  style={styles.approveBtn}
                  text="Approve program completion"
                  onPress={approveCompletion}
                />
              ) : <></>}
            </>
          )}
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}

export default AthleteStatsScreen;