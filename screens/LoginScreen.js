import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { LargeButton } from '../src/components/Buttons';

function LoginScreen () {  

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?";
    let action='login';

    let testBackend = true;

    function sendRequest() {
        if(testBackend) {
            setName('grantiscool');
            setPassword('22222222');
        }

        let url = `${api}action=${action}&name=${name}&password=${password}`;
        console.log(url);
        fetch(url)
        .then((response) => {
            console.log(response);
            let res = response.json();
            console.log(res);
            return res;
        })
        .then((json) => {
                console.log(json);
                setData(json);
            })
        .catch(error => {
            console.log("2" + error);
        })
    }

    useEffect(() => {
        
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>       
        <View>
            <Text style={styles.titlefont}>Login</Text>

            <View style={styles.row}>
                <Text style={styles.font}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    placeholder='Enter Username'
                    onChangeText={setName}
                />
            </View>
            

            <View style={styles.row}>
                <Text style={styles.font}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder='Enter Password'
                    onChangeText={setPassword}
                />
            </View>

            <Text style={styles.font}></Text>

            <LargeButton 
                text='Submit'
                onPress={() =>  {
                    setName(name);
                    setPassword(password);
                    sendRequest();
                }}
            />
        </View>
        </SafeAreaView> 
    );
    
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      padding: 3,
      flex: 1
    },
    row: {
        flexDirection: "row", 
        paddingTop: 30, 
        justifyContent:'center'
    },
    input: {
        height: 40,
        marginLeft: 10,
        borderWidth: 1,
        padding: 10,
        width: 170,
        alignSelf: 'center',
    },
    titlefont: {
        fontSize: 52,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    font: {
        fontSize: 28,
        textAlign: 'center',
    },
});