import React, { Component } from 'react';
import { Text, View, AsyncStorage, StyleSheet, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { getDecks } from './utils/api'
import { receiveDecks } from './actions'
import DeckCase from './components/DeckCase'
import Deck from './components/Deck'
import CreateDeck from './components/CreateDeck'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { FontAwesome } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

const Tabs = TabNavigator({
    Decks: {
        screen: DeckCase,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='book' size={30} color={tintColor} />
        }
    },
    CreateDeck: {
        screen: CreateDeck,
        navigationOptions: {
            tabBarLabel: 'Add Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    },
}, {tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? 'purple' : 'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : 'purple',
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
}})

const MainNavigator = StackNavigator({
    Home: {
        screen: Tabs,
        navigationOptions:{
            title: 'DECKS',
            headerTintColor: 'purple',
        }
    },
    Deck: {
        screen: Deck,
    },
    NewQuestion: {
        screen: NewQuestion,
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
          title: 'QUIZ'
        }
    }
});


export default class App extends Component {
    componentDidMount () {
        setLocalNotification()
    }
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}
