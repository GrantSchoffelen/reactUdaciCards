import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import DeckCard from './DeckCard';

class Decks extends Component {
    componentDidMount () {
        getDecks().then(decks => this.props.receiveDecks(JSON.parse(decks)))
    }
    render () {
        const { decks, navigation } = this.props
        return (
            <ScrollView>
                {Object.keys(decks).map(deck => (
                    <TouchableOpacity key={deck} onPress={() => this.props.navigation.navigate(
                        'Deck',
                        { deck: decks[deck] }
                    )}>
                        <DeckCard deck={deck} cards={decks[deck].questions.length} />
                    </TouchableOpacity>
            ))}
            </ScrollView>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps, {receiveDecks})(Decks);
