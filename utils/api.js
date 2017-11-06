import { AsyncStorage } from 'react-native';
import { STORAGE_KEY, NOTIFICATION_KEY } from './helpers'


AsyncStorage.setItem(STORAGE_KEY, "{}")

export function getDecks () {
    return AsyncStorage.getItem(STORAGE_KEY)
}

export function getDeck (title) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(results => {
            var data = JSON.parse(results)
            return data[title]
        })
}

export function saveNewDeck (title) {
    return AsyncStorage.getItem(STORAGE_KEY)
            .then(results => {
                var data = JSON.parse(results)
                    data[title] = {
                                    title,
                                    questions: []
                                }
                    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            })
}

export function saveQuestionToDeck (title, card) {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(results => {
            var data = JSON.parse(results)
            data[title] = {
                title,
                questions: data[title].questions.concat(card)
            }
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}
