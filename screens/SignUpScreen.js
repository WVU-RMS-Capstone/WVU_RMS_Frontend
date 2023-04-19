import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { LargeButton } from '../src/components/Buttons';

function SignUpScreen () {  

    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [playernumber, setPlayernumber] = useState("");

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?";
    let action='createaccount';
    let type='P';
    let code='001';

    let testBackend = true;

    function sendRequest() {
        if(testBackend) {
            setName('grantiscool');
            setPassword('22222222');
            setFirstname('Grant');
            setLastname('Holzemer');
            setMiddlename('Perry');
            setPlayernumber('999');
        }

        let url = `${api}action=${action}&name=${name}&password=${password}&firstname=${firstname}&lastname=${lastname}&middlename=${middlename}&type=${type}&playernumber=${playernumber}&code=${code}`;
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
            <Text style={styles.titlefont}>Sign Up</Text>

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
            

            <View style={styles.row}>
                <Text style={styles.font}>First Name</Text>
                <TextInput
                    style={styles.input}
                    value={firstname}
                    placeholder='Enter First Name'
                    onChangeText={setFirstname}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.font}>Last Name</Text>
                <TextInput
                    style={styles.input}
                    value={lastname}
                    placeholder='Enter Last Name'
                    onChangeText={setLastname}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.font}>Middle Name</Text>
                <TextInput
                    style={styles.input}
                    value={middlename}
                    placeholder='Enter Middle Name'
                    onChangeText={setMiddlename}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.font}>Player Number</Text>
                <TextInput
                    style={{
                        height: 40,
                        marginLeft: 10,
                        borderWidth: 1,
                        padding: 10,
                        width: 50,
                        alignSelf: 'center',
                    }}
                    value={playernumber}
                    placeholder='#'
                    onChangeText={setPlayernumber}
                />
            </View>

            <Text style={styles.font}></Text>

            <LargeButton 
                text='Submit'
                onPress={() =>  {
                    setName(name);
                    setPassword(password);
                    setFirstname(firstname);
                    setLastname(lastname);
                    setMiddlename(middlename);
                    setPlayernumber(playernumber);
                    sendRequest();
                }}
            />
        </View>
        </SafeAreaView> 
    );
    
}
export default SignUpScreen;

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