import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, ActivityIndicatorBase } from 'react-native';
import { LargeButton } from '../src/components/Buttons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let action = 'createAccount';

    async function sendRequest(UID) {
        let url = `${api}action=${action}&firstName=${firstName}&lastName=${lastName}&UID=${UID}`;
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

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            // Add the following line when backend code is working
            // sendRequest(response.user.uid);
            console.log(response);
            // if row contain UID and Athlete
            // then go to athlete home screen
            // else if row contain UID and Trainer
            // then go to AT home screen 
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
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
                        placeholder='Enter Email'
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.font}>Password</Text>

                    <TextInput
                        style={[styles.input, { backgroundColor: 'white' }]}
                        // value={password}
                        placeholder='Enter Password'
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <Text style={styles.font}></Text>

                {loading ? (
                    <ActivityIndicatorBase size="large" color="#000ff" />
                ) : (
                    <>
                        <LargeButton text="Login" onPress={signIn} />
                    </>
                )
                }
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


// let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?";
// let action = 'login';

// async function sendRequest() {
//     let url = `${api}action=${action}&name=${name}&password=${password}`;
//     console.log(url);
//     fetch(url)
//         .then((response) => {
//             let res = response.json();
//             return res;
//         })
//         .then((json) => {
//             setData(json);
//         })
//         .catch(error => {
//             console.log("2" + error);
//         })
// }

// const sendAndCont = () => {
//     sendRequest();

//     console.log(data);
//     if (data.length > 45) {
//         console.log(data);
//         navigation.navigate('HomeScreen', { data });
//     }
//     else {
//         navigation.navigate('LoginScreen');
//     }
// }