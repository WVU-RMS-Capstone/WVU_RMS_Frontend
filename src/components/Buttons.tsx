import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Platform } from "react-native";

export function MediumButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={mediumstyles.button}>
                <Text style={mediumstyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const mediumstyles = StyleSheet.create({
    button: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#757575",
        paddingTop: 6,
        paddingBottom: 6,
        width: "66%",
        height: 75,
        alignSelf: 'center',
        backgroundColor: '#2020B6',
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        color: '#F9F4F5',
        fontSize: 36,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: "2%",

    }
})
export function SmallButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={smallstyles.button}>
                <Text style={smallstyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const smallstyles = StyleSheet.create({
    button: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#757575",
        paddingTop: 6,
        paddingBottom: 6,
        width: "30%",
        height: 65,
        backgroundColor: '#2020B6',
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        color: '#F9F4F5',
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        paddingVertical: "5%",
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
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#757575",
        paddingBottom: 15,
        paddingVertical: 5,
        justifyContent: 'flex-end',
        width: "70%",
        backgroundColor: '#1E3861',
        alignSelf: 'center',

        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        color: '#FCCD0D',
        fontSize: 32,
        fontWeight: "500",
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
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#757575",
        paddingBottom: 15,
        paddingVertical: 5,
        justifyContent: 'flex-end',
        width: "70%",
        backgroundColor: '#FCCD0D',
        alignSelf: 'center',

        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        color: '#1E3861',
        fontSize: 32,
        fontWeight: "500",
        textAlign: 'center',
    }
})

export function InverseLargeButton({ text, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={largeYellowstyles.button}>
                <Text style={largeYellowstyles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export function DateSelector({ text, onPress }) {
    return (
        <View style={date.button}>
            <TouchableOpacity onPress={onPress}>
                <Text style={date.buttonText}>{text}</Text>
            </TouchableOpacity>
        </View>

    )
}
const date = StyleSheet.create({
    button: {
        borderRadius: 5,
        padding: 10,
        width: '25%',
        height: 69,
        backgroundColor: '#D9D9D9',

        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 10, height: 10 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
        })
    },
    buttonText: {
        alignContent: 'center',
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
        fontWeight: "500",
        paddingVertical: "3%",
    }
})

