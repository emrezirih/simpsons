import React from 'react';
import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, FlatList, Image, Dimensions, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Input } from './input';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default Add = ({ navigation, route }) => {

    const { data } = route.params;

    const [nameSurname, setNameSurname] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [about, setAbout] = useState("");
    const [imageLink, setImageLink] = useState("");


    function onPressBack() {
        navigation.pop();
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    function formValidation() {
        if (nameSurname.trim() == "" || jobTitle.trim() == "" || about.trim() == "" || imageLink.trim() == "") {
            Alert.alert("Warning", "Please fill in all fields.");
        } else if (!validURL(imageLink.trim())) {
            Alert.alert("Warning", "Please enter a valid link. ");
        } else {
            addCharecter();
        }
    }

    async function addCharecter() {
        const listData = data;
        listData.push({
            id: listData.length + 1,
            name: nameSurname,
            avatar: imageLink,
            job: jobTitle,
            about: about,
        });
        const listStr = JSON.stringify(listData);
        try {
            await AsyncStorage.setItem("@list", listStr);
            navigation.pop();
        } catch (err) {
            Alert.alert("Error", "Something went wrong :(");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={onPressBack} activeOpacity={0.7}>
                    <Ionicons style={styles.backIcon} name="chevron-back-sharp" color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Add New Character</Text>
            </View>
            <ScrollView>
                <Input title="Name Surname" onChangeText={(text) => setNameSurname(text)} />
                <Input title="Job Title" onChangeText={(text) => setJobTitle(text)} />
                <Input style={{ height: height * 0.12 }} title="About Him/Her" onChangeText={(text) => setAbout(text)} />
                <Input title="Image Link" onChangeText={(text) => setImageLink(text)} />
                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={() => formValidation()}>
                    <Text style={styles.buttonText}>Add Character</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        marginTop: height * 0.02,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        height: height * 0.06,
        width: height * 0.06,
        left: width * 0.05,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    backIcon: {
        fontSize: 28
    },
    title: {
        left: width * 0.1,
        fontSize: 24,
        color: '#000',
        fontWeight: "bold",
    },
    button: {
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
        height: height * 0.075,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 8
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    }

});