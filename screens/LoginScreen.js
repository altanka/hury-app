import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationAction, StackActions } from '@react-navigation/core';

import { LOGIN_CHECK_URL, REGISTER_URL } from "../api/constants"


function Login(props) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    function register(email, idToken) {
        return fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                id_token: JSON.stringify(idToken)
            })
        }).then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    function checkLogin(email, idToken) {
        return fetch(LOGIN_CHECK_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                id_token: JSON.stringify(idToken)
            })
        }).then((response) => response.json())
            .then((json) => {
                return json
            })
    }

    function subscribeToMessages(id) {
        console.log("sub".id)
        messaging()
            .subscribeToTopic(id)
            .then(() => console.log('Subscribed to topic!', id));
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    }

    const storeIdToken = async (token) => {
        try {
            const jsonValue = JSON.stringify(token)
            console.log("saved token", jsonValue)
            await AsyncStorage.setItem('@id_token', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    function tryLogin(email, password) {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                const registeredUser = auth().currentUser
                console.log('User account created & signed in!');
                const id = register(email, registeredUser.getIdToken())
                    .then((response) => subscribeToMessages(response.id))
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!')
                    auth().signInWithEmailAndPassword(email, password)
                        .then((userCredential) => {
                            checkLogin(email, userCredential.user.getIdToken())
                                .then((response) => subscribeToMessages(response.id))
                        })
                }
                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                // console.error(error);
            });
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Login/Register</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput}
                        placeholder="E-mail"
                        placeholderTextColor='#322f3d'
                        editable
                        maxLength={40}
                        autoCompleteType={"email"}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor='#322f3d'
                        editable
                        maxLength={40}
                        autoCompleteType={"password"}
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPressOut={() => tryLogin(email, password)}>
                    <Text style={{ color: '#fff' }} >Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        // auth().signOut()
        storeIdToken(user.getIdToken())
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Conversations' }],
        });
        return <View />
    }
}


export default class LoginScreen extends React.Component {
    state = {
        messages: [],
    }

    componentDidMount() {

    }

    render() {

        return (
            <Login navigation={this.props.navigation} />
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
        width: '100%'
    },
    inputContainer: {
        flexDirection: 'column',
        backgroundColor: '#4b5d67',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 75
    },
    textInput: {
        flexBasis: '5%',
        minHeight: '8%',
        minWidth: '25%',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#322f3d',
        backgroundColor: '#4b5d67',
        color: '#322f3d',
        paddingHorizontal: 20,
        marginVertical: 3,
    },
    loginButton: {
        flexBasis: '5%',
        minHeight: '8%',
        minWidth: '10%',
        borderRadius: 50,
        borderColor: '#322f3d',
        backgroundColor: '#322f3d',
        paddingHorizontal: 20,
        marginVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
