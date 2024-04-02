import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { LargeButton } from '../src/components/Buttons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ route, navigation }) {

    const { devMode } = route.params;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let action = 'login';

    async function sendRequest(UID) {
        let url = `${api}?action=${action}&UID=${UID}&email=${email}`;
        console.log(url);
        try {
            const response = await fetch(url);
            const text = await response.text(); // Get the raw response text
            const json = JSON.parse(text); // Parse the text as JSON
            return json;
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            user_data = await sendRequest(response.user.uid);
            console.log(response);
            if (user_data == "Athlete") {
                navigation.navigate('AthleteHomeScreen', { UID: response.user.uid });
            } else if (user_data == "Trainer") {
                navigation.navigate('ATHomeScreen', { UID: response.user.uid });
            } else {
                console.log("Invalid Role");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const devSignIn = async () => {
        if (devMode == 'trainer') {
            console.log("Loading dev mode as Trainer");
            const response = await signInWithEmailAndPassword(auth, 'john.trainer@example.com', 'password');
            navigation.navigate('ATHomeScreen', { UID: response.user.uid });
        } else if (devMode == 'athlete') {
            console.log("Loading dev mode as Athlete");
            const response = await signInWithEmailAndPassword(auth, 'john.athlete@example.com', 'password');
            navigation.navigate('AthleteHomeScreen', { UID: response.user.uid });
        }
    }

    useEffect(() => {
        devSignIn();
    });

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
                        placeholder='Enter Password'
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <Text style={styles.font}></Text>

                {loading
                    ? <ActivityIndicator size="large" color="#000ff" />
                    : <LargeButton text="Login" onPress={signIn} />
                }
            </View>
        </SafeAreaView>
    );

}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
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