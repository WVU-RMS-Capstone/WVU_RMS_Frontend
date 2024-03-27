import React, { useEffect, useState, useCallback} from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { LargeButton } from '../src/components/Buttons';
import { Dropdown } from '../src/components/Dropdown';
import { PickerIOS } from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker';
import YoutubePlayer from 'react-native-youtube-iframe';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


function ExerciseDetailScreen({ navigation, route }) {

    const { exerciseID } = route.params;
    const [data, setData] = useState({});

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let action = 'fetchexercise';

    async function sendRequest() {
        let url = `${api}?action=${action}&exerciseID=${exerciseID}`;
        console.log("Request URL: ", url);
        try {
            const response = await fetch(url);
            const text = await response.text();
            console.log(text);
            const json = JSON.parse(text);
            setData(json);
            return json;
        } catch (error) {
            console.error("Error Fetching Data: ", error);
        }
    }
    
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          console.log("Video has ended...");
        }
      }, []);

    useEffect(() => { 
        sendRequest() 
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <YoutubePlayer
                    height={300}
                    videoId={"gZWmldqgWaE"}
                    onChangeState={onStateChange}
                />
                <Text style={styles.rowInput}>Name: {data.Name}</Text>
                <Text style={styles.rowInput}>Description: {data.Description}</Text>
                <Text style={styles.rowInput}>Body Part: {data.BodyPart}</Text>
                <Text style={styles.rowInput}>Reps: {data.Reps}</Text>
                <Text style={styles.rowInput}>Sets: {data.Sets}</Text>
            </View>
        </SafeAreaView>
    );
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
        // paddingTop: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        // width: '50%',
    },
    rowInput: {
        borderColor: 'gray',
        // borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginTop: 4,
        width: '40%',
        height: 90,
        textAlign: 'center',
    },
    coverButton: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        padding: 20,
        marginTop: 4,
        width: 150,
        height: 90,
        textAlign: 'center',
    },
    whitespace: {
        marginBottom: 30,
    },
    descrit: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 10,
        textAlignVertical: 'top',
        // width: '50%',
    },
    number: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        marginTop: 4,
        width: '40%',
        height: 60,
        textAlign: 'justify',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    button: {
        color: 'white',
        borderWidth: 1,
    },
    coverImg: {
        width: '50%',
        height: 50,
        borderRadius: 15,
    },
    video: {
        width: '100%',
        height: 200,
    },
    // box: {
    //   borderRadius: 5,
    //   padding: 10,
    //   width: '90%',
    //   height: 75,
    //   borderRadius: 15,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   textAlign: 'center',
    //   alignSelf: 'center',
    //   fontSize: 30,
    //   fontWeight: '500',
    //   backgroundColor: '#D9D9D9',
    // },
    // description: {
    //   borderRadius: 5,
    //   padding: 10,
    //   width: '90%',
    //   height: 75,
    //   borderRadius: 15,
    //   flexDirection: 'row',
    //   alignSelf: 'center',
    //   backgroundColor: '#D9D9D9',
    // },
    // font: {
    //   fontSize: 32,
    //   marginRight: 10,
    // },
    // textInput: {
    //   fontSize: 24,
    //   flex: 1,
    // },
    // smallBox: {
    //   borderRadius: 5,
    //   padding: 10,
    //   width: '40%',
    //   height: 103,
    //   borderRadius: 15,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   backgroundColor: '#D9D9D9',
    // },
})

export default ExerciseDetailScreen;
