import { useState, useEffect, useReducer, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Button, TextInput, ScrollView } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';
import { LargeButton, LargeAltButton } from "../../src/components/Buttons";
import ExercisesScreen from "../ExercisesScreen";


function UpdateProgramExercise({ navigation, route }) {
    const { UID } = route.params;
    const [selected, setSelected] = useState('');
    const [programs, setPrograms] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [exercises, setExercises] = useState('');
    const [chosenItem, setChosenItem] = useState([]);
    const [video, setVideo] = useState('');

    let getProgramsAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let getProgramsAction = 'fetchpremadeprograms';
    let getExercisesAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let getExercisesAction = 'fetchallexercises';
    let deleteExerciseAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let deleteExerciseAction = 'deleteexercise';

    useEffect(() => {
        const getListOfPrograms = async () => {
            let url = `${getProgramsAPI}?action=${getProgramsAction}`;
            console.log(url);
            try {
                const response = await fetch(url);
                const text = await response.text(); // Get the raw response text
                const json = JSON.parse(text); // Parse the text as JSON
                console.log(json);
                setPrograms(json);
                return json;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getListOfPrograms();
    }, []);

    useEffect(() => {
        const sendRequest = async () => {
            let url = `${getExercisesAPI}?action=${getExercisesAction}`;
            console.log(url);
            try {
                const response = await fetch(url);
                const text = await response.text(); // Get the raw response text
                const json = JSON.parse(text); // Parse the text as JSON
                console.log(json);
                setExercises(json);
                return json;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        sendRequest();
    }, []);

    async function deleteExercises(id) {
        let url = `${deleteExerciseAPI}?action=${deleteExerciseAction}&exerciseID=${id}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            const json = JSON.parse(text);
            return json;
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
    }

    const sendAndContune = async () => {
        try {
            if ("exerciseID" in selectedItems[0]) {
                const res = await deleteExercises(selectedItems[0].exerciseID);
                console.log(res)
                if (res == true) {
                    navigation.navigate('ATHomeScreen', { UID: UID });
                } else {
                    alert("Deleting exercise failed, try again.");
                }

            } else if ("ProgramID" in selectedItems[0]) {
                console.log("Working again");
            }
        } catch (error) {
            console.error("Error Recieved: ", error);
        }
    }

    const handleSelectedItem = (item) => {
        console.log(item);
        if (selectedItems.includes(item)) {
            setSelectedItems([]);
        } else {
            setSelectedItems([item]);
        }
    };

    const handleSelected = (value) => {
        const foundExercise = exercises.find((exercise) => exercise.data.exerciseID === value);
        // console.log(foundExercise);
        if (foundExercise) {
            setChosenItem(foundExercise);
            console.log(chosenItem);
        } else {
            // setChosenItem([value])
        }
        // console.log(value);
    }

    const options = [
        { key: 1, value: 'Update Programs' },
        { key: 2, value: 'Delete Programs' },
        { key: 3, value: 'Update Exercises' },
        { key: 4, value: 'Delete Exercises' },
    ]
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dropdown}>
                <Text style={[styles.font, { fontSize: 25 }]}>Choose one of the following</Text>
                <SelectList
                    boxStyles={{ marginTop: 15, backgroundColor: 'white' }}
                    placeholder='Select Item'
                    setSelected={(val) => setSelected(val)}
                    data={options}
                    save="value"
                />

                {selected == "Delete Programs" && (
                    <View style={{ marginTop: '5%' }}>
                        <FlatList
                            style={styles.box}
                            data={programs}
                            keyExtractor={(item) => item.data.ProgramID.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={[styles.ath, selectedItems.includes(item.data) ? styles.selected : null]} onPress={() => handleSelectedItem(item.data)}>
                                    <Text style={styles.first}>{item.data.ProgramName}</Text>
                                </TouchableOpacity>
                            }
                        />
                        <View style={styles.button2}>
                            <LargeAltButton text="Done"
                                onPress={() => sendAndContune()} />
                        </View>
                    </View>
                )
                }

                {selected == "Delete Exercises" && (
                    <View style={{ marginTop: '5%', maxHeight: '80%' }}>
                        <FlatList
                            style={styles.box}
                            data={exercises}
                            keyExtractor={(item) => item.data.exerciseID.toString()}
                            renderItem={({ item }) =>
                                <TouchableOpacity style={[styles.ath, selectedItems.includes(item.data) ? styles.selected : null]} onPress={() => handleSelectedItem(item.data)}>
                                    <Text style={styles.first}>{item.data.Name}</Text>
                                </TouchableOpacity>
                            }
                        />
                        <View style={styles.button2}>
                            <LargeAltButton text="Done"
                                onPress={() => sendAndContune()} />
                        </View>
                    </View>
                )
                }

                {selected == "Update Exercises" && (
                    <View style={{ marginTop: '5%', maxHeight: '80%' }}>
                        <SelectList
                            boxStyles={{ marginTop: 15, backgroundColor: 'white' }}
                            placeholder='Select Exercise'
                            setSelected={(exercise) => handleSelected(exercise)}
                            data={exercises.map((item) => {
                                return {
                                    key: item.data.exerciseID,
                                    value: item.data.Name,
                                    data: item.data,
                                }
                            })}
                            save="key"
                        />

                        {chosenItem != "" && (
                            <View style={{ marginTop: '5%' }}>
                                <Text style={{ textAlign: 'center', fontWeight: '500', fontSize: 25, marginBottom: '5%' }}>The Current Information for this Exercise</Text>
                                <Text style={styles.item}>Name: {chosenItem.data.Name}</Text>
                                <Text style={styles.item}>Video: {chosenItem.data.video}</Text>
                                <ScrollView style={{ maxHeight: 100 }}>
                                    <Text style={styles.item}>Description: {chosenItem.data.Description}</Text>
                                </ScrollView>
                                <Text style={styles.item}>Sets: {chosenItem.data.Sets}</Text>
                                <Text style={styles.item}>Reps: {chosenItem.data.Reps}</Text>
                                <Text style={styles.item}>Body Part: {chosenItem.data.BodyPart}</Text>
                                <View style={styles.button2}>
                                    <LargeAltButton text="Continue to Update"
                                        onPress={() => navigation.navigate('UpdateExercise', { ExerciseID: chosenItem.data.exerciseID, UID: UID })}
                                    />
                                </View>
                            </View>
                        )
                        }
                    </View>
                )
                }

                {
                    selected == "Update Programs" && (
                        <View style={{ marginTop: '5%', maxHeight: '80%' }}>
                            <SelectList
                                boxStyles={{ marginTop: 15, backgroundColor: 'white' }}
                                placeholder='Select Program'
                                setSelected={handleSelected}
                                data={programs.map((item) => {
                                    return {
                                        key: item.data.ProgramID,
                                        value: item.data.ProgramName,
                                    }
                                })}
                                save="value"
                            />

                            {chosenItem && (
                                <View>
                                    <Text>Hello</Text>
                                </View>
                            )
                            }
                        </View>
                    )
                }
            </View >

        </SafeAreaView >
    );
}

export default UpdateProgramExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',

    },
    dropdown: {
        paddingHorizontal: 25,
        marginTop: '5%',
    },
    font: {
        fontSize: 15,
        color: '#000000',
        textAlign: 'center'
    },
    first: {
        textAlign: 'center',
        paddingTop: 15
    },
    box: {
        // marginBottom: 130,
    },
    ath: {
        backgroundColor: 'white',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        // height: 50,
        borderRadius: 10,
        paddingBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    flatListContainer: {
        position: 'absolute',
        top: 225,
        left: 0,
        right: 0,
        bottom: 0,
    },
    selected: {
        backgroundColor: 'grey'
    },
    button2: {
        width: "100%",
        marginTop: '10%',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        alignSelf: 'center',
        fontSize: 10
    },
    item: {
        paddingLeft: 10,
        fontSize: 20,
        alignContent: 'center',
        paddingBottom: 5
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5,
        padding: 10,
        width: '90%',
    },
    exerciseBox: {
        borderRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: '5%',
        width: '75%'
    }
});