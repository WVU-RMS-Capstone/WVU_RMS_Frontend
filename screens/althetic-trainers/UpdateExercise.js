import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';
import * as ImagePicker from 'expo-image-picker';

function UpdateExercise({ navigation, route }) {
    const { ExerciseID, UID } = route.params;
    const [video, setVideo] = useState('');
    const [name, setName] = useState(null);
    const [description, setDescription] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [part, setParts] = useState('');
    const [data, setData] = useState([]);
    const [picture, setPicture] = useState('');
    const [updatePicture, setUpdatePicture] = useState(false);
    const [tempSets, setTempSets] = useState('');
    const [tempReps, setTemptReps] = useState('');

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let action = 'fetchexercise';

    useEffect(() => {
        const getExercise = async () => {
            let url = `${api}?action=${action}&exerciseID=${ExerciseID}`;
            console.log("Request URL: ", url);
            try {
                const response = await fetch(url);
                const text = await response.text();
                const json = JSON.parse(text);
                setData(json);
                setPicture(json.cover);
                setTempSets(json.Sets.toString());
                setTemptReps(json.Reps.toString());
                console.log(json);
                return json;
            } catch (error) {
                console.error("Error Fetching Data: ", error);
            }
        }

        getExercise();
    }, []);

    let updateAPI = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let updateAction = 'updateexercise';

    async function sendRequest(updatedData) {
        let url = `${updateAPI}?action=${updateAction}&${Object.entries(updatedData).map(([key, value]) => `${key}=${value}`).join('&')}`
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
        const updatedData = {
            BodyPart: part || data.BodyPart,
            Description: description || data.Description,
            Name: name || data.Name,
            Reps: reps || data.Reps,
            Sets: sets || data.Sets,
            cover: picture || data.cover,
            video: video || data.video,
            exerciseID: ExerciseID
        };
        try {
            const res = await sendRequest(updatedData);
            console.log(res)
            if (res == true) {
                navigation.navigate('ATHomeScreen', { UID: UID });
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


    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.coverButton}>
                <TouchableOpacity style={styles.defaultcover} onPress={() => {
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
            </View>

            <Text style={styles.whitespace}></Text>
            <Text style={styles.title}>Update Name</Text>
            <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                value={name}
                placeholder={data.Name}
                onChangeText={setName}
            />
            <Text style={styles.title}>Update Video</Text>

            <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                value={video}
                placeholder={data.video}
                onChangeText={setVideo}
            />
            <Text style={styles.title}>Update Description</Text>

            <TextInput
                style={[styles.descrit, { backgroundColor: 'white' }]}
                value={description}
                placeholder='Description'
                autoCapitalize='sentences'
                multiline={true}
                onChangeText={setDescription}
            />

            <View style={[styles.row, { paddingLeft: 10 }]}>
                <Text style={styles.titleRow}>Update Sets</Text>
                <Text style={[styles.titleRow, { paddingStart: 20 }]}>Update Reps</Text>
            </View>

            <View style={styles.row}>
                <TextInput
                    style={[styles.number, { backgroundColor: 'white' }]}
                    value={sets}
                    placeholder={tempSets}
                    onChangeText={setSets}
                />
                <TextInput
                    style={[styles.number, { backgroundColor: 'white' }]}
                    value={reps}
                    placeholder={tempReps}
                    onChangeText={setReps}
                />
            </View>
            <Text style={styles.title}>Update Body Part</Text>

            <TextInput
                style={[styles.input, { backgroundColor: 'white' }]}
                value={part}
                placeholder={data.BodyPart}
                onChangeText={setParts}
            />

            <Text style={styles.whitespace}></Text>

            < LargeButton
                text="Done" onPress={() => sendAndContune()}
            />


        </SafeAreaView >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
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
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 5,
        padding: 10,
        width: '90%',
    },
    rowInput: {
        borderColor: 'gray',
        borderRadius: 15,
        padding: 20,
        marginTop: 4,
        width: '40%',
        height: 90,
        textAlign: 'center',
    },
    coverButton: {
        justifyContent: 'center',
        alignItems: 'center'

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
    defaultcover: {
        backgroundColor: 'white',
        width: '45%',
        height: 100,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        width: '100%',
        height: 100,
        borderRadius: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'

    },
    title: {
        paddingLeft: 25,
        fontWeight: '500'
    },
    titleRow: {
        marginRight: 75,
        fontWeight: '500'
    }
})

export default UpdateExercise;
