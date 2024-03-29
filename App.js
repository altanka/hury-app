import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, AppRegistry } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './screens/ChatScreen.js'
import ConversationsScreen from './screens/ConversationsScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import ContactsScreen from './screens/ContactsScreen.js';


export default class App extends React.Component {
  state = {
    messages: [],
  }


  render() {

    const Stack = createStackNavigator();
    const chatNavigation = ({ navigation }) => {
      navigation.state = {
        username: "Username",
        lastSeen: "last seen at 09:05"
      }
      return ({
        headerStyle: {
          backgroundColor: '#322f3d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          opacity: 0
        },
        headerLeft: () => (
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Conversations')}>
              <MaterialIcons
                name='arrow-back'
                color={'#4b5d67'}
                size={25}
              />
              <MaterialIcons
                name='account-circle'
                color={'#4b5d67'}
                size={40}
              />
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', paddingStart: 5 }}>
              <Text style={{ color: 'white', fontSize: 20 }}>{navigation.state.username}</Text>
              <Text style={{ color: 'white' }}>{navigation.state.lastSeen}</Text>
            </View>
          </View>

        ),
      });
    }
    const conversationsNavigation = (isMain) => {
      let options = {
        headerStyle: {
          backgroundColor: '#322f3d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
      if (isMain) {
        options.headerLeft = null
      }
      return options;
    }

    return (
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={() => conversationsNavigation(true)} />
            <Stack.Screen name="Conversations" component={ConversationsScreen} options={() => conversationsNavigation(true)} />
            <Stack.Screen name="Contacts" component={ContactsScreen} options={() => conversationsNavigation(false)} />
            <Stack.Screen name="Chat" component={ChatScreen} options={chatNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>

    );

  }
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
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
  navigation: {
    height: '8%',
    minHeight: 75,
    width: '100%'
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
