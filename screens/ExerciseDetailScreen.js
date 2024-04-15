import React, { useEffect, useState, useCallback } from 'react';
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
    const [countdown, setCountdown] = useState(-1);

    let programs_api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let progress_api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
    let action = 'fetchexercise';

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            console.log("Video has ended...");

            // Start the countdown timer
            setCountdown(5);
        }
    }, []);

    const isFinalExercise = () => {
        let next = programData.current + 1;
        let nextLabeled = 'Workout_' + next;
        
        return next > 10 || programData.exercises[nextLabeled] == 0;
    }

    async function fetchExerciseData() {
        setLoading(true);

        let url = `${programs_api}?action=${action}&exerciseID=${currentExercise}`;
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
    
    async function updateProgramProgress() {
        let url = `${progress_api}?action=updateprogress&ProgramID=${programData.data.ProgramID}&CurrentExercise=${programData.current}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            console.log(text);
            const json = JSON.parse(text);
        } catch (error) {
            console.error("Error Updating Program Progress: ", error);
        }
    }

    function nextExercise() {
        if (!programData) {
            console.log("programData is undefined");
            return;
        }
        
        console.log("Going to next exercise...");

        let next = programData.current + 1;
        let nextLabeled = 'Workout_' + next;
        console.log(programData);
        
        // Update progress in backend
        updateProgramProgress();
        
        // If this was the final exercise in the program...
        if (next > 10 || programData.exercises[nextLabeled] == 0) {
            console.log("Completed program...");
            navigation.replace('CompletedProgramScreen', { programData: programData });
            return;
        }
        
        // Progress to the next exercise by updating state and refreshing screen
        programData.current = next;
        
        setCurrentExercise(programData.exercises[nextLabeled]);
        setProgramUpdateFlag(true);
    }

    function previousExercise() {
        if (!programData) {
            console.log("programData is undefined");
            return;
        }

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

    useEffect(() => {
        fetchExerciseData()
    }, [programUpdateFlag]);

    useEffect(() => {
        // Countdown timer logic
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (countdown === 0) {
            nextExercise();
        }
    }, [countdown]);

    return (
        <SafeAreaView style={styles.container}>
            <YoutubePlayer
                height={250}
                videoId={data.video}
                onChangeState={onStateChange}
                play={true}
            />
            {!loading ? (
                <View>
                    <Text style={styles.title}>Name: {data.Name}</Text>
                    <ScrollView style={{ maxHeight: 275 }}>
                        <Text style={styles.rowInput}>Description: {data.Description}</Text>
                    </ScrollView>
                    <Text style={[styles.rowInput, { textAlign: 'center' }]}>Body Part: {data.BodyPart}</Text>
                    <View style={styles.row}>
                        <Text style={styles.rowInput}>Reps: {data.Reps}</Text>
                        <Text style={styles.rowInput}>Sets: {data.Sets}</Text>
                    </View>
                </View>
            ) : (
                <ActivityIndicator />
            )}
            {programData !== undefined && (
                <View style={styles.footer}>
                    <FlatList
                        data={[{ key: 'previous', title: 'Previous Exercise' }, { key: 'next', title: isFinalExercise() ? 'Finish Program' : 'Next Exercise' }]}
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
                    {countdown > 0 && (
                        <View style={styles.countdownContainer}>
                            <Text style={styles.countdownText}>Loading next exercise in {countdown}... </Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    setCountdown(-1);
                                }}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 15,
        textAlign: 'left',
        paddingBottom: 10
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 5,
        fontWeight: 'bold'
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
        borderColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 10
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
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
        backgroundColor: '#1E3861',
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        bottom: 25,
        position: 'absolute',
        width: '100%'
    },
    countdownContainer: {
        position: 'absolute',
        bottom: 80,
        alignSelf: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: 10,
    },
    countdownText: {
        color: 'white',
        fontSize: 20,
    },
});

export default ExerciseDetailScreen;
