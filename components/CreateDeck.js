import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView } from 'react-native';
import { addDeck } from '../actions';
import { saveNewDeck } from '../utils/api';

class CreateDeck extends Component {
    state = {
        title: ''
    }
    handleTextChange = (title) => {
        this.setState(() => ({
            title: title
        }))
    }
    handleSubmit = (title) => {
        saveNewDeck(title)
        const newDeck = {
            [title]: {
                title: title,
                questions: []
            }
        }
        this.props.addDeck(newDeck)
        this.props.navigation.navigate('Deck', { deck: newDeck[title] })
        this.setState(()=>({
            title: ''
        }))
    }
    render () {
        const { title } = this.state
        return (
            <View behavior='padding' style={styles.container}>
                <Text style={{fontSize: 50, textAlign: 'center' }}>What is the title of your new deck?</Text>
                <TextInput
                value={title}
                style={styles.inputBox}
                onChangeText={this.handleTextChange}
                placeholder='Deck Title'
                />
                <TouchableOpacity style={styles.submitButton} onPress={() => this.handleSubmit(title)}>
                    <Text style={{color: 'white', fontSize: 15, textAlign: 'center', fontWeight: 'bold'}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      alignItems: 'center'
    },
    submitButton: {
      padding: 10,
      backgroundColor: 'black',
      borderRadius: 5,
      margin: 20,
      width: '30%'
    },
    inputBox: {
        height: 35,
        width: 300,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        margin: 30,
    }
});

export default connect(null, {addDeck})(CreateDeck);
