import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Platform } from "react-native";

export function LargeAltButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={altstyles.button}>
                <Text style={altstyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const altstyles = StyleSheet.create({
    button: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        textAlign: 'center',
        width: "70%",
        height: 70,
        backgroundColor: '#1E3861',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
    }
})
export function LargeButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={largestyles.button}>
                <Text style={largestyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}


//Default button (Blue with yellow text)
const largestyles = StyleSheet.create({
    button: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        textAlign: 'center',
        width: "70%",
        height: 70,
        backgroundColor: '#1E3861',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#FCCD0D',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

export function LargeYellowButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={largeYellowstyles.button}>
                <Text style={largeYellowstyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const largeYellowstyles = StyleSheet.create({
    button: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#757575",
        justifyContent: 'center',
        textAlign: 'center',
        width: "70%",
        height: 70,
        backgroundColor: '#FCCD0D',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#1E3861',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})

