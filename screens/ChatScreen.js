import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MessageList from '../components/MessageList.js'
import MessageEntry from '../components/MessageEntry.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SEND_MESSAGE_URL } from "../api/constants"



export default class ChatScreen extends React.Component {
    state = {
        messages: [],
        idToken: {},
        targetUser: null
    }

    componentDidMount() {
        let targetUser = this.props.route.params;
        this.setState({ 
            idToken: this.getIdToken(),
            targetUser: targetUser
        })
        let lastSeen = this.getLastSeenByUsername(targetUser.username)
        this.props.navigation.state = { username: targetUser.name, lastSeen: lastSeen}
    }

    sendMessage(id, idToken, targetId, message) {
        return fetch(SEND_MESSAGE_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                id_token: JSON.stringify(idToken),
                target_id: targetId,
                message: JSON.stringify(message)
            })
        }).then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    getLastSeenByUsername(username) {
        return "last seen at 09:05"
    }

    getIdToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@id_token')
            if (value !== null) {
                const jsonValue = JSON.parse(value)
                console.log("read token", jsonValue)
                return jsonValue
            }
        } catch (e) {
            // error reading value
            console.log(e)
        }
    }

    render() {
        const {idToken, targetUser} = this.state
        return (
            <View style={styles.container}>
                <View style={styles.messageList}>
                    <MessageList />
                </View>
                <View style={styles.messageEntry}>
                    <MessageEntry onSend={(message) => {console.log("id token render", idToken); this.sendMessage("7a5e47b0-ad96-4659-868b-d86038f82df1", idToken, targetUser.id, message)}}/>
                </View>
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
