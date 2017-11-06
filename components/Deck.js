import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getDeck } from '../utils/api';
import { receiveDeck } from '../actions';

class Deck extends Component {
  render () {
      const { deck } = this.props
      return (
        <View style={styles.container}>
            <Text style={styles.deckTitle}>{deck.title}</Text>
            <Text style={{color: 'grey', fontSize: 20 }}>{deck.questions.length} Cards</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate(
              'NewQuestion',
              { title: deck.title }
            )}>
                <Text style={{color:'black', textAlign: 'center', fontWeight: 'bold'}}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quizButton} onPress={() => this.props.navigation.navigate(
            'Quiz',
            { questions: deck.questions }
            )}>
                <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Take Quiz</Text>
            </TouchableOpacity>
        </View>
     )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deckTitle: {
        fontSize: 50,
    },
    addButton: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
        borderColor: 'black',
        borderWidth: 2,
        width: '50%'
    },
    quizButton: {
        padding: 15,
        backgroundColor: 'black',
        borderRadius: 5,
        margin: 5,
        width: '50%'
    },

})


function mapStateToProps (decks, props) {
  const { deck } = props.navigation.state.params
  return {
    deck: decks[deck.title]
  }
}

function mapDispatchToProps(dispatch){
    return{
        receiveDecks: receiveDeck
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
