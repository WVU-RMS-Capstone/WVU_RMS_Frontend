import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Platform } from "react-native";

export function SmallTile({ text , onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        borderWidth: 1,  
        borderColor: "#757575",
        paddingTop: 6,
        paddingBottom: 6,
        width: "25%",
        height: 156, 
        backgroundColor: '#D9D9D9',
    },
    buttonText: {
        color: '#F9F4F5',
        fontSize: 36,
        fontWeight: "500",
        textAlign: "center",
    }
})

export function MediumTile({ text , onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={Medstyles.button}>
                <Text style={Medstyles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}
const Medstyles = StyleSheet.create({
    button: {
        borderRadius: 14,
        borderWidth: 1,  
        borderColor: "#757575",
        paddingTop: 6,
        paddingBottom: 6,
        width: "50%",
        height: 202, 
        backgroundColor: '#D9D9D9',
    },
    buttonText: {
        color: '#F9F4F5',
        fontSize: 36,
        fontWeight: "500",
        textAlign: "center",
    }
})

export function LargeTile({ text , onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={Largestyles.button}>
                <Text style={Largestyles.buttonText}>{ text }</Text>
            </View>
        </TouchableOpacity>
    )
}
const Largestyles = StyleSheet.create({
    button: {
        borderRadius: 14,
        borderWidth: 1,  
        borderColor: "#757575",
        paddingTop: 6,
        paddingBottom: 6,
        width: "80%",
        height: 396, 
        backgroundColor: '#D9D9D9',
    },
    buttonText: {
        color: '#F9F4F5',
        fontSize: 36,
        fontWeight: "500",
        textAlign: "center",
    }
})