import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';

function SignUpScreen () {  

    const [data, setData] = useState([]);

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/auth.php?";
    let action='createaccount';
    let name='grantiscool';
    let password='22222222';
    let firstname='Grant';
    let lastname='Holzemer';
    let middlename='Perry';
    let type='P';
    let playernumber='999';
    let code='001';

    useEffect(() => {
        fetch(`${api}action=${action}&name=${name}&password=${password}&firstname=${firstname}&lastname=${lastname}&middlename=${middlename}&type=${type}&playernumber=${playernumber}&code=${code}`)
        .then((response) => {
            console.log(JSON.stringify(response));
            let json = response.json();
            console.log("1"+JSON.stringify(json));
            return json;
        })
        .then((json) => {
                console.log(json);
                setData(json);
            })
        .catch(error => {
            console.log("2" + error);
        })
    }, [])
    
    return (
        <SafeAreaView style={styles.container}>       
        <View>
            {data.map(data => {
                return <pre>{JSON.parse(data)}</pre>
            })}
        </View>
        </SafeAreaView> 
    );
    
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      marginTop: 25,
      padding: 5,
      flex: 1
    },
});