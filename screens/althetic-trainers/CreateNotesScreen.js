import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getCurrentUID } from '../../FirebaseConfig';

function CreateNotesScreen({ navigation, route }) {
    const { UID } = route.params;
    const [note, setNotes] = useState('');
    const [date, setDate] = useState(new Date());
    const [MadeBy, setMadeBy] = useState('');
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
    let action = 'addnotes';

    async function sendRequest() {
        let url = `${api}?action=${action}&Date=${date.toISOString().substring(0, 10)}&Madeby=${MadeBy}&Note=${note}&Athlete=${UID}`;
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
            const res = await sendRequest();
            console.log(res)
            navigation.navigate('ATHomeScreen', { UID: getCurrentUID() });
        } catch (error) {
            console.error("Error Recieved: ", error);
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.row}>
                <Button
                    onPress={() => showMode('date')}
                    title='Enter Date'
                    color='black'
                />
                {show && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display='default'
                        onChange={onChange}
                    />
                )}
            </View>
            <TextInput
                style={styles.noteBox}
                placeholder='Enter Note'
                autoCapitalize='sentences'
                multiline={true}
                value={note}
                returnKeyType='done'
                blurOnSubmit={true}
                onChangeText={(text) => setNotes(text)}
            />
            <TextInput
                style={styles.madeByBox}
                placeholder='Enter Name'
                autoCapitalize='none'
                value={MadeBy}
                onChangeText={(text) => setMadeBy(text)}
            />
            <View style={[{ marginTop: '75%' }]}>
                <TouchableOpacity onPress={() => sendAndContune()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Create Note</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default CreateNotesScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
        justifyContent: 'center'
    },
    noteBox: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '80%',
        height: 200,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    dateBox: {
        marginLeft: 45,
        marginBottom: 10,
        marginTop: 30,
        fontWeight: 'bold'
    },
    madeByBox: {
        textAlign: 'right',
        marginRight: 50,
        marginTop: 10,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        width: '75%',
        height: 75,
        backgroundColor: '#1E3861',
        alignSelf: 'center',
        marginBottom: 10,

        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    date: {
        alignItems: 'center',
        marginBottom: 25
    },
    dateButton: {
        fontSize: 15
    },
    row: {
        flexDirection: 'row',
        marginLeft: 40,
        marginBottom: 10
    }
})    