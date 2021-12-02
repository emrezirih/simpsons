import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default List = ({ navigation, route }) => {

    const isFocused = useIsFocused();

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getStorage();
    }, [isFocused]);

    async function getStorage() {
        const storageData = await AsyncStorage.getItem("@list");
        if (storageData) {
            const parsedData = JSON.parse(storageData);
            setData(parsedData);
            setLoading(false);
            return;
        }
        getItems();
    }

    function getItems() {
        axios.get("https://5fc9346b2af77700165ae514.mockapi.io/simpsons").then(res => {
            setData(res.data);
            setLoading(false);
        }).catch(err => {
            console.log('Err : ', err);
            setLoading(false);
        });
    }

    function onPressDetail(detailItem) {
        navigation.navigate('detail', { detailItem: detailItem });
    }

    function onPressAdd() {
        navigation.navigate('add', { data: data });
    }

    function onPressRemove(id) {
        Alert.alert("Warning", "Are you sure removed this item ?", [{ text: "Cancel" }, { text: "Remove", onPress: () => removeItem(id) }]);
    }

    async function removeItem(id) {
        const newData = data.filter(x => x.id != id);
        setData(newData);
        try {
            const listStr = JSON.stringify(newData);
            await AsyncStorage.setItem("@list",listStr);
        } catch (err) {
            Alert.alert("Error","Something went wrong :(");
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={[styles.listItem, { marginBottom: index == data.length - 1 ? height * 0.11 : 0 }]}>
                <TouchableOpacity style={styles.itemLeft} onPress={() => onPressDetail(item)}>
                    <View style={styles.itemImg}>
                        <Image
                            style={styles.image}
                            resizeMode="contain"
                            source={{ uri: item.avatar }}
                        />
                    </View>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPressRemove(item.id)}>
                    <Ionicons name="ios-remove-circle-outline" style={styles.removeIcon} color="red" />
                </TouchableOpacity>
            </View>
        );
    }

    const emptyList = () => {
        return (
            <Text style={styles.emptyText}> Empty List </Text>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Simpsons</Text>
            {
                loading ? <ActivityIndicator size="large" color="#000" style={{ marginTop: height * 0.3 }} /> :
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={data}
                        renderItem={renderItem}
                        ListEmptyComponent={emptyList}
                    />
            }
            <LinearGradient colors={['rgba(255,255,255,0.2)', '#fff', '#fff']} style={styles.gradient}>
                <TouchableOpacity style={styles.addButton} onPress={onPressAdd}>
                    <Ionicons style={styles.addIcon} name="add" color="#fff" />
                </TouchableOpacity>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        margin: height * 0.03,
        fontWeight: "bold",
        fontSize: 28,
        color: "#000"
    },
    listItem: {
        marginTop: height * 0.015,
        marginLeft: height * 0.03,
        marginRight: height * 0.03,
        padding: height * 0.015,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 3
    },
    itemImg: {
        height: height * 0.07,
        width: height * 0.07,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        height: "100%",
        width: "100%",
    },
    itemTitle: {
        width: '70%',
        left: width * 0.03,
        fontSize: 18,
        fontWeight: "800",
        color: "gray"
    },
    removeIcon: {
        left: width * 0.03,
        fontSize: 28,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: "center"
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        height: height * 0.1,
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        height: height * 0.08,
        width: height * 0.08,
        backgroundColor: '#000',
        borderRadius: 100,
        alignItems: "center",
        justifyContent: 'center'
    },
    addIcon: {
        fontSize: 30,
    },
    emptyImage: {
        height: '100%',
        width: '100%'
    },
    emptyText: {
        marginTop: height * 0.3,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: "center",

    }
});