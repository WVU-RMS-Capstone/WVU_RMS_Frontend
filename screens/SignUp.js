import React, { useState, useEffect } from 'react';
import { View, Pressable, StyleSheet, Text, SafeAreaView, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LargeButton, LargeYellowButton } from '../src/components/Buttons';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const auth = FIREBASE_AUTH;
    // https://restapi-playerscompanion.azurewebsites.net/users/auth.php?action=createaccount&firstName=testing&lastName=testing&UID=2&email=testing@
    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let action = 'createaccount';

    async function sendRequest(UID) {
        let url = `${api}?action=${action}&firstName=${firstName}&lastName=${lastName}&UID=${UID}&email=${email}&role=${role}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text(); // Get the raw response text
            const json = JSON.parse(text); // Parse the text as JSON
            setData(json);
            return json;
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const signUp = async () => {
        if (firstName != "" && lastName != "" && role != "") {
            if (password == confirmPassword) {
                setLoading(true);
                try {
                    const auth_response = await createUserWithEmailAndPassword(auth, email, password);
                    // Add the following line once finished with backend code
                    const user_data = await sendRequest(auth_response.user.uid);
                    if (role == "Athlete") {
                        navigation.navigate('AthleteHomeScreen', { UID: auth_response.user.uid });
                    } else if (role == "Trainer") {
                        navigation.navigate('ATHomeScreen', { UID: auth_response.user.uid });
                    } else {
                        console.log("No Role Selected");
                    }
                    console.log(user_data);
                    // navigation.navigate('ATHomeScreen');
                } catch (error) {
                    console.log("This is an error: " + error);
                    alert("Sign up failed: " + error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.log("Passwords do not match.");
                alert("Passwords do not match. Try Again.");
            }
        } else {
            if (firstName == "") {
                alert("Missing Input on First Name");
            } else if (lastName == "") {
                alert("Missing Input on Last Name");
            } else if (role == "") {
                alert("Role was not selected");
            }
            console.log("Missing Input");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                {/* <View style={[styles.row, { marginBottom: '10%' }]}>
                    <Image style={styles.img} source={require('../assets/Logo.png')} />
                    <Text style={[styles.titlefont]}> | Rehabilitation Monitoring System</Text>
                </View> */}

                <View style={[styles.row, { marginTop: '5%' }]}>
                    <Text style={styles.label}>First name</Text>

                    <Text style={styles.label}>Last Name</Text>
                </View>

                <View style={[styles.row, { marginBottom: '5%' }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: 'white' }]}
                        value={firstName}
                        placeholder='First Name'
                        onChangeText={setFirstName}
                    />

                    <TextInput
                        style={[styles.input, { backgroundColor: 'white' }]}
                        value={lastName}
                        placeholder='Last Name'
                        onChangeText={setLastName}
                    />
                </View>

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input2, { backgroundColor: 'white', marginBottom: '5%' }]}
                    value={email}
                    placeholder='Enter Email'
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input2, { backgroundColor: 'white', marginBottom: '5%' }]}
                    value={password}
                    placeholder='Enter Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[styles.input2, { backgroundColor: 'white', marginBottom: '5%' }]}
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChangeText={setConfirmedPassword}
                    secureTextEntry={true}
                />

                <Text style={styles.position}>Which Are You?</Text>

                <View style={[styles.pressableContainer, { marginBottom: '5%' }]}>
                    <Pressable
                        style={[styles.button, role === "Athlete" && styles.selected]}
                        onPress={() => setRole("Athlete")}
                    >
                        <Text style={[styles.text, role === "Athlete" && styles.selectedText]}>Athlete</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, role === "Trainer" && styles.selected]}
                        onPress={() => setRole("Trainer")}
                    >
                        <Text style={[styles.text, role === "Trainer" && styles.selectedText]}>Trainer</Text>
                    </Pressable>

                </View>

                <Text style={styles.font}></Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#000ff" />
                ) : (
                    <>
                        <LargeYellowButton text="Sign Up" onPress={signUp} />
                    </>
                )
                }

            </View>
        </SafeAreaView>
    );

}

export default SignUp;

const styles = StyleSheet.create({
    container: {
        // marginTop: 0,
        padding: 16,
        flex: 1,
        backgroundColor: '#AEB6C5'
    },
    position: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
        color: '#1E3861',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#1E3861',
        width: '50%',
    },
    input2: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginTop: 4,
        width: '50%',
    },
    titlefont: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        // marginTop: 50,
        // marginBottom: 50,
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
    },
    pressableContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    button: {
        padding: 12,
        borderRadius: 4,
        width: '45%',
        marginHorizontal: 8,
        backgroundColor: '#f0f0f0',
    },
    selected: {
        backgroundColor: '#1E3861',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E3861',
        textAlign: 'center',
    },
    selectedText: {
        color: '#fff',
    },
    img: {
        width: 30,
        height: 30,
        // marginRight: 10,
        // marginTop: 10
    }
});