import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { LargeYellowButton } from '../src/components/Buttons';
import { FIREBASE_AUTH, getCurrentUID } from '../FirebaseConfig';
import { getAuth } from 'firebase/auth';
import { updateEmail, updatePassword } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '@react-native-firebase/auth';

function EditProfile({ navigation, route }) {
    const { UID } = route.params;
    const [picture, setPicture] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmedPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('');
    const [updatePicture, setUpdatePicture] = useState(false);

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
                setPicture(json[0].data.AthleteImage);
                return json;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        getUserInfo();
    }, []);

    let updateAPI = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php";
    let updateAction = 'updateuser';

    async function sendRequest(updatedData) {
        let url = `${updateAPI}?action=${updateAction}`
        console.log("Request URL: ", url);
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
    }

    const signUp = async () => {
        if (firstName != "" || lastName != "" || password != "" || email != "" || picture != "") {
            if (email != "" && email == data[0].data[2]) {
                console.log("Email is the same as old email.");
                alert("Email was the same as old email. Try Again");
                return;
            }
            if (password != "" && password == confirmPassword && firstName == "" && lastName == "" && email == "" && picture == "null") {
                try {
                    await updatePassword(getAuth().currentUser, password);
                    if (data[0].data[3] == "Trainer") {
                        navigation.navigate('ATHomeScreen', { UID: UID });
                    } else {
                        navigation.navigate('AthleteHomeScreen', { UID: UID });
                    }
                } catch (error) {
                    console.log(error);
                    alert("Password Change Failed: " + error);
                    return;
                } finally {
                    setLoading(false);
                }
            } else if (password != confirmPassword) {
                console.log("Passwords do not match.");
                alert("Passwords do not match. Try Again.");
                return;
            } else if (password != "" && password == confirmPassword && firstName != "" && lastName != "" && email != "" && picture != "") {
                try {
                    await updatePassword(getAuth().currentUser, password);
                } catch (error) {
                    console.log(error);
                    alert("Password Change Failed: " + error);
                    return;
                }
            }

            if (email != "") {
                try {
                    await updateEmail(getAuth().currentUser, password);
                } catch (error) {
                    console.log(error);
                    if (password != "") {
                        alert("Password Updated. Email updated failed, try again.");
                    } else {
                        alert("Email updated failed: " + error);
                    }
                    return;
                }
            }

            const userData = data[0].data;
            const updatedData = {
                firstName: firstName || userData[0],
                lastName: lastName || userData[1],
                email: email || userData[2],
                image: picture || userData[4],
                UID: UID,
            };
            const res = sendRequest(updatedData);
            if (res == true) {
                setLoading(false);
                if (data[0].data[3] == "Trainer") {
                    navigation.navigate('ATHomeScreen', { UID: UID });
                } else {
                    navigation.navigate('AthleteHomeScreen', { UID: UID });
                }
            }

        }
    }

    const HandleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.3,
        });

        if (!result.canceled) {
            setPicture(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
        
        setUpdatePicture(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
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
            {data && (
                <Text style={styles.title}>{data[0].data[0]} {data[0].data[1]}</Text>
            )}
            <View style={styles.container2}>
                <View style={styles.row}>
                    <Text style={styles.label}>Update First Name</Text>

                    <Text style={styles.label}>Update Last Name</Text>
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

                <Text style={styles.label}>Update Email</Text>
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
                    <LargeYellowButton text="Update" onPress={signUp} />
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
        backgroundColor: '#D4DAE4',
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
        borderRadius: 15,
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
        borderRadius: 15,
        padding: 10,
        height: 50,
        width: '50%',
        marginTop: 4
    },
    selectedImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 200 / 2,
        alignSelf: 'center'

    }
});