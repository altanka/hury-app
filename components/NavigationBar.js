import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants';


export default class NavigationBar extends React.Component {

    render() {
        return (

            <View style={styles.container} >
                <TouchableOpacity style={styles.sendButton}>
                    <MaterialIcons
                        name='arrow-back'
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
        flex: 1,
        width: '100%',
        backgroundColor: '#25232e',
        flexDirection: 'row'
    },
    scrollView: {
        backgroundColor: '#4b5d67',
        marginHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
});