import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import MessageList from '../components/MessageList.js'
import ContactList from '../components/ContactList.js'
import { FloatingAction } from "react-native-floating-action";
import Modal from 'react-native-modal'


export default class ContactsScreen extends React.Component {
    state = {
        messages: [],
        isModalVisible: false,
    }

    render() {

        return (
            <View style={styles.container}>
                <ContactList navigation={this.props.navigation}></ContactList>
                <FloatingAction
                    color= '#322f3d'
                    animated={false}
                    showBackground={false}
                    onPressMain={() => this.setState({ isModalVisible: true })}
                />
                <Modal
                    isVisible={this.state.isModalVisible}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    onBackButtonPress={() => this.setState({ isModalVisible: false })}
                    onSwipeComplete={() => this.setState({ isModalVisible: false })}
                    swipeDirection="left"
                    >
                    <View style={{
                        flex: 1,
                        backgroundColor: '#4b5d67',
                        maxHeight: '30%',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}>
                        <TextInput style={{
                            color: '#000',
                            maxHeight: '20%',
                            minHeight: '20%',
                            borderRadius: 50,
                            backgroundColor: '#322f3d',
                            color: '#fff',
                            paddingHorizontal: 20
                        }}
                            placeholder="Type a username..." placeholderTextColor='#4b5d67' />

                        <TouchableOpacity style={{
                            maxHeight: '20%',
                            minHeight: '20%',
                            backgroundColor: '#322f3d',
                            borderRadius: 25,
                            borderColor: '#322f3d',
                            borderWidth: 3,
                            aspectRatio: 1,
                            marginStart: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <MaterialIcons
                                name='add'
                                color={'#4b5d67'}
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#4b5d67',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageList: {
        height: '84%',
        width: '100%',
        flexGrow: 1
    },
    messageEntry: {
        height: '8%',
        minHeight: 75,
        width: '100%'
    },
});
