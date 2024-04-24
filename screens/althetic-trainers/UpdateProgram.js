import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, Platform, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import * as ImagePicker from 'expo-image-picker';
import { getCurrentUID } from '../../FirebaseConfig';

function UpdateProgram({ navigation, route }) {
    const { ProgramID } = route.params;
    const [data, setData] = useState([]);
    const [picture, setPicture] = useState('');
    const [program, setProgram] = useState('');
    const [updatePicture, setUpdatePicture] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [fetchExercises, setFetchExercises] = useState([]);


    let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let action = 'getprograminfo';

    useEffect(() => {
        const getExercise = async () => {
            let url = `${api}?action=${action}&ProgramID=${ProgramID}`;
            console.log("Request URL: ", url);
            try {
                const response = await fetch(url);
                const text = await response.text();
                const json = JSON.parse(text);
                console.log(json);
                setData(json);
                const seperatedWorkouts = Object.keys(json).filter(key => key.startsWith('Workout') && json[key] !== null && json[key] !== 0 && key !== 'Workout_Count').map(key => json[key]);
                setPicture(json.Cover);
                setSelectedItems(seperatedWorkouts);
                return json;
            } catch (error) {
                console.error("Error Fetching Data: ", error);
            }
        }

        getExercise();
    }, []);

    let getExercisesAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let getExercisesAction = 'fetchallexercises';

    useEffect(() => {
        const fetchAllExercises = async () => {
            let url = `${getExercisesAPI}?action=${getExercisesAction}`;
            console.log("Request URL: ", url);
            try {
                const response = await fetch(url);
                const text = await response.text();
                const json = JSON.parse(text);
                setFetchExercises(json);
                console.log(json);
                return json;
            } catch (error) {
                console.error("Error Fetching Data: ", error);
            }
        }

        fetchAllExercises();
    }, []);

    let programAPi = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let programAction = 'updateprogram';
    let exerciseAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let exerciseAction = 'updateprogramexercises';

    async function sendProgram(updatedData) {

        let url = `${programAPi}?action=${programAction}&${Object.entries(updatedData).map(([key, value]) => `${key}=${value}`).join('&')}`
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            const json = JSON.parse(text);
            setData(json);
            return json;
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }

    }

    async function sendExercises() {
        const workoutObj = {};
        for (let i = 0; i < selectedItems.length; i++) {
            let index = i + 1;
            workoutObj[`Workout${index}`] = selectedItems[i];
        }
        let url = `${exerciseAPI}?action=${exerciseAction}&ProgramID=${ProgramID}&${Object.entries(workoutObj).map(([key, value]) => `${key}=${value}`).join("&")}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            const json = JSON.parse(text);
            setData(json);
            return json;
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
    }

    const sendAndContune = async () => {
        try {
            const updatedData = {
                ProgramID: ProgramID,
                Cover: picture || data.Cover,
                ProgramName: program || data.ProgramName,
            };
            const res = await sendProgram(updatedData);
            const res2 = await sendExercises();

            if (res == true && res2 == true) {
                // add section to erase data from list of exercises so it doesnt stay there when AT leaves page
                navigation.navigate('ATHomeScreen', { UID: getCurrentUID() });
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.error("Error Recieved: ", error);
        }
    }

    const HandleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            setPicture(result.assets[0].uri);
            setUpdatePicture(false);
        }
    };

    const handleSelectedItem = (item) => {
        console.log(item);
        if (selectedItems.includes(item.data.exerciseID)) {
            let items = selectedItems.filter((ID) => ID !== item.data.exerciseID);
            setSelectedItems(items);
        } else if (selectedItems.length <= 10) {
            setSelectedItems([...selectedItems, item.data.exerciseID]);
        }

        if (selectedItems.length > 10) {
            console.log("Exercise List Full.");
            alert("Exercise List Full.");
        }
        // console.log(selectedItems);
    };


    console.log(selectedItems);

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.row]}>
                <TouchableOpacity style={styles.coverImg} onPress={() => {
                    setUpdatePicture(true);
                    HandleImagePicker();
                }}>
                    {picture ? (
                        <Image
                            style={styles.img}
                            source={{ uri: picture }}
                        />
                    ) : (
                        <Text>Insert Cover</Text>
                    )}
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, { backgroundColor: 'white' }]}
                    value={program}
                    placeholder={data.ProgramName}
                    onChangeText={setProgram}
                />
            </View>

            <FlatList
                style={styles.box}
                data={fetchExercises}
                renderItem={({ item }) =>
                    <TouchableOpacity style={[styles.ath, selectedItems.includes(item.data.exerciseID) ? styles.selected : null]} onPress={() => handleSelectedItem(item)}>
                        <Text style={[styles.first, selectedItems.includes(item.data.exerciseID) ? styles.selectedText : null]}>{item.data.Name}</Text>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity onPress={() => sendAndContune()}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Done</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5'

    },
    coverImg: {
        backgroundColor: 'white',
        width: '40%',
        height: 100,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: 100,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 40,
        marginTop: 30,
        borderRadius: 15,
        width: '40%',
        textAlign: 'center',
    },
    box: {
        backgroundColor: 'white',
        margin: 30,
        marginBottom: 50,
        borderRadius: 15
    },
    button: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        width: '75%',
        height: 60,
        backgroundColor: '#1E3861',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        // fontWeight: "500",
        textAlign: 'center',
        // paddingVertical: "1%",
    },
    exercise: {
        borderRadius: 15,
        borderColor: "#757575",
        marginTop: 15,
        justifyContent: 'center',
        width: '90%',
        height: 60,
        backgroundColor: '#1E3861',
        alignSelf: 'center',
    },
    exerciseText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    ath: {
        backgroundColor: '#617390',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        paddingBottom: 10,
    },
    first: {
        textAlign: 'center',
        paddingTop: 15,
    },
    selected: {
        backgroundColor: '#1e3861',
    },
    selectedText: {
        color: 'white'
    }
})

export default UpdateProgram;
