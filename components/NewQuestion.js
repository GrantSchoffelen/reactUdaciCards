import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView,} from 'react-native';
import { addCard } from '../actions';
import { saveQuestionToDeck } from '../utils/api';

class NewQuestion extends Component {
    state = {
        question: null,
        answer: null
    }
    handleQuestionChange = (question) => {
        this.setState(() => ({
            question
        }))
    }
    handleAnswerChange = (answer) => {
        this.setState(() => ({
            answer
        }))
    }
    handleSubmit = (card) => {
        const { title } = this.props.navigation.state.params
        saveQuestionToDeck(title, card)
        this.props.addCard(title, card)
        this.props.navigation.goBack()
    }
    render () {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                value={question}
                onChangeText={this.handleQuestionChange}
                style={styles.inputBox}
                placeholder='Question'
              />
              <TextInput
                value={answer}
                onChangeText={this.handleAnswerChange}
                style={styles.inputBox}
                placeholder='Answer'
              />
            <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit(this.state)}>
                <Text style={{fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Submit</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        padding: 15,
        borderRadius: 5,
        margin: 20,
        backgroundColor: 'black',
        borderWidth: 2,
        width: '30%'
    },
    inputBox: {
        height: 35,
        width: 300,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        margin: 20,
    }
})

export default connect(null, { addCard })(NewQuestion)
