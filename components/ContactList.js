import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Contacts from "../resources/ContactList.json"

export default class ContactList extends React.Component {


    render() {
        return (
            <ScrollView >
                {
                    Contacts.contacts.map((element, index) => {
                        return (
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity key={index} style={{ minWidth: '100%', height: '100%' }} onPress={() => {
                                    this.props.navigation.navigate('Chat', element)
                                }}>
                                    <View style={styles.contact}>
                                        <MaterialIcons
                                            name='account-circle'
                                            color={'#322f3d'}
                                            size={60}
                                        />
                                        <View style={{ flexDirection: 'column', paddingStart: 10 }}>
                                            <Text style={styles.text}>{element.name}</Text>
                                            <Text>{element.status}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        minWidth: '100%',
        maxHeight: '100%',
        padding: 0,
        borderWidth: 3,
        borderColor: 'blue',
    },
    contact: {
        color: '#000',
        minWidth: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: '#4b5d67',
        borderColor: '#322f3d',
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10
    },
    text: {
        fontSize: 20,
    }
});
