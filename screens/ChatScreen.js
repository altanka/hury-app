import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import MessageList from '../components/MessageList.js'
import MessageEntry from '../components/MessageEntry.js'


export default class ChatScreen extends React.Component {
    state = {
        messages: [],
    }

    getLastSeenByUsername(username) {
        return "last seen at 09:05"
    }

    render() {
        var user = this.props.route.params;
        var lastSeen = this.getLastSeenByUsername(user.username)
        this.props.navigation.state = { username: user.name, lastSeen: lastSeen }
        return (
            <View style={styles.container}>
                <View style={styles.messageList}>
                    <MessageList />
                </View>
                <View style={styles.messageEntry}>
                    <MessageEntry />
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
