import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput } from 'react-native';
import { LargeButton } from '../src/components/Buttons';

function LoginScreen({ navigation }) {

    var [data, setData] = useState([]);
    const [name, setName] = useState("");
    var [password, setPassword] = useState("");

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?";
    let action = 'login';

    async function sendRequest() {
        let url = `${api}action=${action}&name=${name}&password=${password}`;
        console.log(url);
        fetch(url)
            .then((response) => {
                let res = response.json();
                return res;
            })
            .then((json) => {
                setData(json);
            })
            .catch(error => {
                console.log("2" + error);
            })
    }

    const sendAndCont = () => {
        sendRequest();

        console.log(data);
        if (data.length > 45) {
            console.log(data);
            navigation.navigate('HomeScreen', { data });
        }
        else {
            navigation.navigate('LoginScreen');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.titlefont}>| Rehabilitation Monitoring Systems</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.font}>Email</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: 'white' }]}
                        value={name}
                        placeholder='Enter Email'
                        onChangeText={setName}
                    />
                </View>

                {/* <Text style={styles.titlefont}>Login</Text>

            <View style={styles.row}>
                <Text style={styles.font}>Email</Text>
                <TextInput
                    style={[styles.input, {backgroundColor: 'white'}]}
                    value={name}
                    placeholder='Enter Username'
                    onChangeText={setName}
                />
            </View> */}

                {/* <View style={styles.inputContainer}>
                <Text style={styles.font}>Password</Text>
                <TextInput>
                    
                </TextInput>
            </View> */}

                <View style={styles.inputContainer}>
                    <Text style={styles.font}>Password</Text>

                    <TextInput
                        style={[styles.input, { backgroundColor: 'white' }]}
                        value={password}
                        placeholder='Enter Password'
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>

                <Text style={styles.font}></Text>

                <LargeButton
                    text='Log In'
                    onPress={() => {
                        setName(name);
                        setPassword(password);
                        sendAndCont();


                    }}
                />
            </View>
        </SafeAreaView>
    );

}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        //   marginTop: 50,
        //   padding: 3,
        flex: 1,
        backgroundColor: '#AEB6C5'
    },
    row: {
        flexDirection: "row",
        paddingTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    titlefont: {
        fontSize: 32,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 50,
        color: '#1E3861',
    },
    font: {
        fontSize: 24,
        textAlign: 'left',
        marginLeft: 10,
        marginBottom: 10,
        color: '#1E3861'
    },
    inputContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    }
});