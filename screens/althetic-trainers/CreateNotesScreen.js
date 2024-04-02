import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { DatePicker } from "react-native-datepicker";

function CreateNotesScreen({ navigation, route }) {
    const { UID } = route.params;
    const [note, setNotes] = useState('');
    const [date, setDate] = useState('');
    // const [MadeBy, setMadeBy] = useState('');
    // const [date, setDate] = useState(new Date())
    // const [open, setOpen] = useState(false)

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/athleteLogs.php";
    let action = 'addnotes';

    async function sendRequest() {
        let url = `${api}?action=${action}&Date=${date}&Madeby=${MadeBy}&Note=${note}`;
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
            navigation.navigate('ATHomeScreen');
        } catch (error) {
            console.error("Error Recieved: ", error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.dateBox}
                placeholder='Enter Date'
                autoCapitalize='none'
                onChangeText={(text) => setDate(text)}
            />
            {/* <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}
            <TextInput
                style={styles.noteBox}
                placeholder='Enter Note'
                autoCapitalize='none'
                multiline={true}
                onChangeText={(text) => setNotes(text)}
            />
            <TextInput
                style={styles.madeByBox}
                placeholder='Enter Name'
                autoCapitalize='none'
                onChangeText={(text) => setMadeBy(text)}
            />
            <View style={[{ marginTop: '90%' }]}>
                <TouchableOpacity onPress={() => sendAndContune()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Done</Text>
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
        backgroundColor: '#AEB6C5'
    },
    noteBox: {
        backgroundColor: 'white',
        marginLeft: 50,
        marginRight: 50,
        height: 150,
        borderRadius: 15,
        paddingLeft: 10,
        paddingRight: 10
    },
    dateBox: {
        marginLeft: 50,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    madeByBox: {
        textAlign: 'right',
        marginRight: 50,
        marginTop: 10,
        fontWeight: 'bold'
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
})    