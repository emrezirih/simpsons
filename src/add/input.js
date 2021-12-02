import React from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export const Input = (props) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <View style={[styles.inputContainer, props.style]}>
                <TextInput style={styles.input} multiline onChangeText={(text) => props.onChangeText(text)} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: height * 0.02,
        width: '90%',
        alignSelf: 'center',
    },
    itemTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: "700"
    },
    inputContainer: {
        marginTop: height * 0.01,
        height: height * 0.06,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#dfdfdf"
    },
    input: {
        marginLeft: 6,
        marginRight: 6,
        flexWrap:'wrap'
    }
})