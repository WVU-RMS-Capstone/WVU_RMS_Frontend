import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SelectList } from 'react-native-dropdown-select-list';


function UpdateProgramExercise({ navigation, route }) {
    const [selected, setSelected] = useState('');
    const [option, setOption] = useState(false);


    const options = [
        { key: 1, value: 'Update Programs' },
        { key: 2, value: 'Delete Programs' },
        { key: 3, value: 'Update Exercises' },
        { key: 4, value: 'Delete Exercises' },
    ]

    const handleSelected = (value) => {
        setSelected(value);
        setOption(true);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.dropdown}>
                <Text style={[styles.font, { fontSize: 25 }]}>Choose one of the following</Text>
                <SelectList
                    boxStyles={{ marginTop: 15, backgroundColor: 'white', }}
                    placeholder='Select Program'
                    // setSelected={handleSelected}
                    setSelected={(val) => setSelected(val)}
                    data={options}
                    save="value"
                // save="key"
                />
            </View>

        </SafeAreaView>
    );
}

export default UpdateProgramExercise;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#AEB6C5',

    },
    dropdown: {
        paddingHorizontal: 25,
        height: 100,
        marginTop: '5%'
    },
    font: {
        fontSize: 15,
        color: '#000000',
        textAlign: 'center'
    },
});