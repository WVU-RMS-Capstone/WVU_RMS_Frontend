import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, FlatList, StyleSheet, Text, Button, SafeAreaView, TextInput, Pressable, TouchableOpacity } from 'react-native';
import { LargeButton } from '../../src/components/Buttons';

function AddExercise({ navigation, route }) {
    // const { listOfExercises } = route.params;

    let api = "https://restapi-playerscompanion.azurewebsites.net/users/programs.php";
    let action = 'fetchallexercises';
    const [exercises, setexercises] = useState([]);
    const [filteredexercises, setFilteredexercises] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    // console.log("Data: ", listOfExercises);

    useEffect(() => {
        const sendRequest = async () => {
            let url = `${api}?action=${action}`;
            console.log(url);
            try {
                const response = await fetch(url);
                const text = await response.text(); // Get the raw response text
                const json = JSON.parse(text); // Parse the text as JSON
                console.log(json);
                setexercises(json);
                setFilteredexercises(json);
                // setSelectedItems(json);
                return json;
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        sendRequest();
    }, []);


    const searchFilter = (text) => {
        if (text) {
            const updatedData = exercises.filter((item) => {
                const item_data = `${item.data[0].toUpperCase()} ${item.data[1].toUpperCase()}`;
                const text_data = text.toUpperCase();
                return item_data.indexOf(text_data) > -1;
            });
            setSearch(text);
            setFilteredexercises(updatedData);
        } else {
            setFilteredexercises(exercises)
            setSearch('')
        }
    }

    // const handleSelectedItem = (item) => {
    //     // const isSelected = selectedItems.find(selectedItems => selectedItems.id === item.id);

    //     if (selectedItems.includes(item)) {
    //         setSelectedItems(selectedItems.filter(selectedItems => selectedItems !== item.id));
    //         // console.log(selectedItems);
    //     } else {
    //         setSelectedItems([...selectedItems, item.data.Name]);
    //         console.log(selectedItems);
    //     }
    // };

    // const renderItem = ({ item }) => (
    //     <TouchableOpacity style={[styles.ath, selectedItems.includes(item.data.Name) ? styles.selected : null]} onPress={() => handleSelectedItem(item)}>
    //         <View>
    //             <Text style={styles.first}>{item.data.Name}</Text>
    //         </View>
    //     </TouchableOpacity>
    // );
    // console.log("Selected Items: ", selectedItems);
    // const handOnPress = (item) => {
    //     const newItem = selectedItems.map((val) => {
    //         if (val.data.exerciseID === item.data.exerciseID) {
    //             return { ...val, selectedItems: !val.selectedItems }
    //         } else {
    //             return val;
    //         }
    //     })
    //     setSelectedItems(newItem);
    // }
    console.log("Selcted Items: ", selectedItems)
    const handleSelectedItem = (item) => {
        if (selectedItems.includes(item)) {
            setSelectedItems(selectedItems.filter((ID) => ID !== item));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        // if (selectedItems.includes(itemID)) {
        //     setSelectedItems(selectedItems.filter((id) => id !== itemID));
        // } else {
        //     setSelectedItems([...selectedItems, itemID]);
        // }

        // setexercises(
        //     exercises.map((exercises) =>
        //         exercises.id === itemID
        //             ? { ...exercises, isSelected: !exercises.isSelected }
        //             : exercises
        //     )
        // );
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBox}>
                <TextInput
                    style={[styles.input, { backgroundColor: 'white' }]}
                    clearButtonMode='always'
                    placeholder='Search Athlete'
                    autoCapitalize='none'
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>

            {/* <FlatList
                style={styles.box}
                data={filteredexercises}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => handOnPress(item)}>
                            <View style={[styles.ath, selectedItems.includes(item) ? styles.selected : null]}>
                                <Text style={styles.first}>{item.data.Name}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            /> */}

            <FlatList
                style={styles.box}
                data={filteredexercises}
                keyExtractor={(item) => item.data.exerciseID.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.ath, selectedItems.includes(item.data) ? styles.selected : null]} onPress={() => handleSelectedItem(item.data)}>
                        <Text style={styles.first}>{item.data.Name}</Text>
                    </TouchableOpacity>
                )}
            />

            <View style={styles.button2}>
                <LargeButton text="Done"
                    onPress={() => navigation.navigate('NewProgramScreen', { selectedItems })} />
            </View>

        </SafeAreaView>
    );
}

export default AddExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',
    },
    searchBox: {
        marginHorizontal: 20,
        marginBottom: 50
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        textAlign: 'center',
    },
    background: {
        margin: 50,
        backgroundColor: 'white',
    },
    ath: {
        backgroundColor: 'white',
        marginLeft: 25,
        marginRight: 25,
        marginTop: 10,
        height: 50,
        borderRadius: 10,
        paddingBottom: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    first: {
        textAlign: 'center',
        paddingTop: 15
    },
    box: {
        marginBottom: 130
    },
    button: {
        paddingLeft: 150,
        textAlign: 'center'
    },
    button2: {
        width: "100%",
        marginTop: '10%',
        paddingVertical: '1%',
        paddingHorizontal: '2%',
        alignSelf: 'center',
        fontSize: 10
    },
    selected: {
        backgroundColor: 'grey'
    }

});