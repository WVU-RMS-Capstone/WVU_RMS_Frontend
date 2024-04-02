import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { LargeYellowButton } from '../../src/components/Buttons';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { updateEmail, updatePassword, EmailAuthProvider } from 'firebase/auth';

function EditProfile({ navigation, route }) {
    const [picture, getPicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [UID, getUID] = useState('lkuCHWqU8kUlGbJB3eu1dxYg2Xl2');

    let userAPI = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let userAction = 'getuserinfo';

    useEffect(() => {
        const getUserInfo = async () => {
            let url = `${userAPI}?action=${userAction}&UID=${UID}`;
            console.log(url);
            try {
                const response = await fetch(url);
                const text = await response.text(); // Get the raw response text
                const json = JSON.parse(text); // Parse the text as JSON
                console.log(json);
                setData(json);
                return json;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getUserInfo();
    }, []);

    let updateAPI = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let updateAction = 'updateUser';

    async function sendRequest(UID) {
        if (firstName = '') {
            firstName = data[0].data[0];
        }
        if (lastName = '') {
            lastName = data[0].data[1];
        }
        if (email = '') {
            email = data[0].data[2];
        }
        let url = `${updateAPI}?action=${updateAction}&firstName=${firstName}&lastName=${lastName}&UID=${UID}&email=${email}`;
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
                    const auth_response = await updateEmail(email);
                    // Add the following line once finished with backend code
                    const user_data = await sendRequest(UID);
                    if (role == "Athlete") {
                        navigation.navigate('AthleteHomeScreen');
                    } else if (role == "Trainer") {
                        navigation.navigate('ATHomeScreen');
                    } else {
                        console.log("No Role Selected");
                    }
                    console.log(user_data);
                    navigation.navigate('ATHomeScreen');
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

    const ImagePicker = () => {
        let options = {
            storageOptions: {
                path: 'image',
            },
        };

        launchImageLibrary(options, response => {
            setSelectImage(response.assets[0].uri)
            console.log(response);
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {picture ? (
                <Image
                    style={{ width: '75%', height: '25%' }}
                    source={{ uri: picture }}
                />
            ) : (
                <TouchableOpacity style={styles.defaultcover} onPress={() => {
                    ImagePicker();
                }}>
                    <Text>Insert Cover</Text>
                </TouchableOpacity>
            )}
            <Image
                source={{ uri: picture }}
            />
            {data && (
                <Text style={styles.title}>{data[0].data[0]} {data[0].data[1]}</Text>
            )}
            <View style={styles.container2}>
                <View style={styles.row}>
                    <Text style={styles.label}>First name</Text>

                    <Text style={styles.label}>Last Name</Text>
                </View>
                <View style={styles.row}>
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
                    style={[styles.input2, { backgroundColor: 'white' }]}
                    value={email}
                    placeholder='Enter Email'
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Update Password</Text>
                <TextInput
                    style={[styles.input2, { backgroundColor: 'white' }]}
                    value={password}
                    placeholder='Enter Password'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[styles.input2, { backgroundColor: 'white' }]}
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    onChangeText={setConfirmedPassword}
                    secureTextEntry={true}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#000ff" />
            ) : (
                <>
                    <LargeYellowButton text="Update" onPress={() => navigation.navigate('AthleteHomeScreens')} />
                </>
            )
            }

        </SafeAreaView>
    );
}

export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
    },
    container2: {
        // marginTop: '15%',
        padding: 16
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 20,
        marginTop: '5%'
    },
    defaultcover: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'white',
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
        height: 50,
        width: '50%',
        marginTop: 4
    },
});