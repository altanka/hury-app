import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Button } from 'react-native';
import MessageList from '../components/MessageList.js'
import MessageEntry from '../components/MessageEntry.js'
import { FloatingAction } from "react-native-floating-action";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'



export default class ConversationsScreen extends React.Component {
    state = {
        messages: [],
    }

    render() {

        return (
            <View style={styles.container}>
                <Button title="Chat" onPress={() => this.props.navigation.navigate('Chat')}>
                </Button>
                <FloatingAction
                    floatingIcon={<MaterialIcons
                        name='chat'
                        color={'#fff'}
                        size={25}
                    />}
                    color='#322f3d'
                    showBackground={false}
                    animated={false}
                    onPressMain={() => this.props.navigation.navigate('Contacts')}
                />
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
