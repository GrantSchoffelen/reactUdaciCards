import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage } from 'react-native';
import { Notifications } from 'expo';
import { NOTIFICATION_KEY, clearLocalNotification } from '../utils/helpers';


class Quiz extends Component {
    state = {
        score: 0,
        questionNumber: 0,
        question: true,
        done: false
    }
    handleQuestionToggle = () => {
        this.setState({ question: !this.state.question })
    }
    handleButtonPress = (correct) => {
        const { questions } = this.props.navigation.state.params
        this.setState({ questionNumber: this.state.questionNumber + 1 })
        if (questions.length - this.state.questionNumber === 1) {
            this.setState({ done: true })
            clearLocalNotification()
        }
        if(correct === 'correct'){
            this.setState({ score: this.state.score + 1 })
        }
    }
    render () {
        const { questions } = this.props.navigation.state.params
        console.log(this.props.navigation.state)
        const { question, questionNumber, done, score } = this.state
        return (
            <View>
                { !done ?
                    <View>
                        <Text style={{fontSize: 20}}>
                            {questionNumber+1}/{questions.length}
                        </Text>
                { question &&
                    <View>
                        <Text style={styles.text}>
                          {questions[questionNumber].question}
                        </Text>
                        <TouchableOpacity onPress={this.handleQuestionToggle}>
                            <Text style={{color: 'red', textAlign: 'center', fontSize: 20}}>Answer</Text>
                        </TouchableOpacity>
                    </View>
                }
                { !question &&
                <View>
                    <Text style={styles.text}>
                        {questions[questionNumber].answer}
                    </Text>
                        <TouchableOpacity onPress={this.handleQuestionToggle}>
                            <Text style={{color: 'red', textAlign: 'center', fontSize: 20}}>Question</Text>
                        </TouchableOpacity>
                </View>
              }
              <View>
                  <TouchableOpacity style={styles.correctButton} onPress={() => this.handleButtonPress('correct')}>
                      <Text style={styles.buttonText}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.incorrectButton} onPress={this.handleButtonPress}>
                      <Text style={styles.buttonText}>Incorrect</Text>
                  </TouchableOpacity>
            </View>
            </View> :
            <View style={{ alignItems: 'center', marginTop: 50}}>
                <Text style={{fontSize:30}}>Score:</Text>
                <Text style={{fontSize:30, color: 'red'}}>
                  {Math.round((score/questions.length) * 100)}%
                </Text>
                <TouchableOpacity style={styles.backButton} onPress={()=>this.props.navigation.goBack()}>
                    <Text>Back To Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backButton} onPress={()=>this.props.navigation.navigate('Quiz', {questions})}>
                    <Text>Restart Quiz</Text>
                </TouchableOpacity>
            </View>}
      </View>
    )
    }
}

const styles = StyleSheet.create({
    correctButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        width: '40%',
        alignSelf: 'center',
        margin: 10,
        marginTop: 100
    },
    incorrectButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        width: '40%',
        alignSelf: 'center',
        margin: 10
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    text: {
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 50,
        marginTop: 100
    },
    backButton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: 'red',
        // width: '40%',
        alignSelf: 'center',
        margin: 10
    }

});

export default Quiz
