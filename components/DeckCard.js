import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class DeckCard extends Component {
  render () {
    const { deck, cards } = this.props
    return (
      <View style={styles.card}>
        <Text style={{fontSize: 25}}>{deck}</Text>
        <Text style={{color: 'grey'}}>{cards} cards</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  }
})

export default DeckCard
