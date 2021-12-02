import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default Detail = ({ navigation, route }) => {

    const { detailItem } = route.params;

    function onPressBack() {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBtn} onPress={onPressBack} activeOpacity={0.7}>
                        <Ionicons style={styles.backIcon} name="chevron-back-sharp" color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Detay</Text>
                </View>
                <View style={styles.imageContianer}>
                    <Image
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="contain"
                        source={{ uri: detailItem.avatar }}
                    />
                </View>
                <Text style={styles.detailTitle}>{detailItem.name}</Text>
                <Text style={styles.detailSubtitle}>{detailItem.job}</Text>
                <Text style={styles.detailDesc}>{detailItem.about}
                </Text>
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
        fontSize: 18
    },
    title: {
        left: width * 0.1,
        fontSize: 24,
        color: '#000',
        fontWeight: "bold",
    },
    imageContianer: {
        marginTop: height * 0.05,
        height: height * 0.3,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailTitle: {
        marginTop: height * 0.02,
        textAlign: 'center',
        fontSize: 24,
        color: '#000',
        fontWeight: "bold",
    },
    detailSubtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'gray',
    },
    detailDesc: {
        marginTop: height * 0.014,
        marginBottom: height * 0.05,
        alignSelf: 'center',
        width: '90%',
        fontWeight: "300",
        fontSize: 16,
        color: 'gray',
    }
});