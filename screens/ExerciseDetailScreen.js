import React, { useEffect, useState, useCallback} from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LargeButton } from '../src/components/Buttons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { ActivityIndicator } from 'react-native';


function ExerciseDetailScreen({ navigation, route }) {

    const { exerciseID, programData } = route.params;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [currentExercise, setCurrentExercise] = useState(exerciseID);
    const [programUpdateFlag, setProgramUpdateFlag] = useState(false);

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let action = 'fetchexercise';

    async function sendRequest() {
        setLoading(true);
        
        let url = `${api}?action=${action}&exerciseID=${currentExercise}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            console.log(text);
            const json = JSON.parse(text);
            setData(json);
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
        
        setLoading(false);
        setProgramUpdateFlag(false);
    }
    
    function nextExercise() {
        let next = programData.current + 1;
        let nextLabeled = 'Workout_' + next;
        console.log(programData);
        // If this was the final exercise in the program...
        if (next > 10 || programData.exercises[nextLabeled] == 0) {
            // TODO: Navigate to the completed program screen
            console.log("Completed program...");
            return;
        }
        
        // Progress to the next exercise by updating state and refreshing screen
        programData.current = next;
        setCurrentExercise(programData.exercises[nextLabeled]);
        setProgramUpdateFlag(true);
    }
    
    function previousExercise() {
        let next = programData.current - 1;
        let nextLabeled = 'Workout_' + next;
        console.log(programData);
        // If this is the first exercise in the program...
        if (next <= 0) {
            // TODO: Disable previous button
            return;
        }
        
        // Progress to the next exercise by updating state and refreshing screen
        programData.current = next;
        setCurrentExercise(programData.exercises[nextLabeled]);
        setProgramUpdateFlag(true);
    }
    
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          console.log("Video has ended...");
          // TODO: Put prompt here to load next exercise in program if needed
        }
      }, []);

    useEffect(() => { 
        sendRequest() 
    }, [programUpdateFlag]);

    return (
        <SafeAreaView style={styles.container}>
            <YoutubePlayer
                height={300}
                videoId={data.video}
                onChangeState={onStateChange}
            />
            <ScrollView>
                {!loading ? (
                    <View style={styles.container}>
                        <Text style={styles.rowInput}>Name: {data.Name}</Text>
                        <Text style={styles.rowInput}>Description: {data.Description}</Text>
                        <Text style={styles.rowInput}>Body Part: {data.BodyPart}</Text>
                        <Text style={styles.rowInput}>Reps: {data.Reps}</Text>
                        <Text style={styles.rowInput}>Sets: {data.Sets}</Text>
                    </View>
                ) : (
                    <ActivityIndicator />
                )}
            </ScrollView>
            {programData !== undefined && (
                <View style={styles.footer}>
                    <FlatList
                        data={[{ key: 'previous', title: 'Previous Exercise' }, { key: 'next', title: 'Next Exercise' }]}
                        horizontal
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.button, item.key === 'previous' && programData.current === 1 && styles.disabledButton]}
                                disabled={item.key === 'previous' && programData.current === 1}
                                onPress={() => {
                                    if (item.key === 'previous') {
                                        previousExercise();
                                    } else {
                                        nextExercise();
                                    }
                                }}
                            >
                                <Text style={styles.buttonText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
        // paddingTop: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        // width: '50%',
    },
    rowInput: {
        borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginTop: 4,
        width: '40%',
        height: 90,
        textAlign: 'center',
    },
    coverButton: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginTop: 4,
        width: 150,
        height: 90,
        textAlign: 'center',
    },
    whitespace: {
        marginBottom: 30,
    },
    descrit: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        textAlignVertical: 'top',
        // width: '50%',
    },
    number: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: 4,
        width: '40%',
        height: 60,
        textAlign: 'justify',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    button: {
        color: 'white',
        borderWidth: 1,
    },
    disabledButton: {
        color: 'gray',
        borderWidth: 1,
    },
    coverImg: {
        width: '50%',
        height: 50,
        borderRadius: 15,
    },
    video: {
        width: '100%',
        height: 200,
    },
    footer: {
        backgroundColor: 'gray',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});

export default ExerciseDetailScreen;
