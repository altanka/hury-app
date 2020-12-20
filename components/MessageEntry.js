import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants';

export default class MessageEntry extends React.Component {
    state = {
        message: this.props.message,
    }

    render() {
        return (

            <View style={styles.container} >
                <TextInput style={styles.textInput} placeholder="Type a message..." placeholderTextColor='#4b5d67' />
                <TouchableOpacity style={styles.sendButton}>
                    <MaterialIcons
                        name='send'
                        color={'#4b5d67'}
                        size={25}
                    />
                </TouchableOpacity>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#4b5d67',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '90%',
        padding: 10,
    },
    textInput: {
        color: '#000',
        flexBasis: '90%',
        minHeight: '100%',
        borderRadius: 50,
        backgroundColor: '#322f3d',
        color: '#fff',
        paddingHorizontal: 20
    },
    sendButton: {
        flexBasis: '10%',
        backgroundColor: '#322f3d',
        borderRadius: 25,
        borderColor: '#322f3d',
        borderWidth: 3,
        aspectRatio: 1,
        marginStart: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
