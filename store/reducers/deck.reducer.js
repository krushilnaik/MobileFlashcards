import { createSlice } from '@reduxjs/toolkit';
import { addCardToDeck, saveDeckTitle, removeDeck, fetchDecks } from '../../util/api';

const deckReducer = createSlice({
	name: 'decks',
	initialState: null,
	reducers: {
		getDecks: (state, action) => ({
			...state,
			...action.payload
		}),
		addDeck: (state, action) => {
			state[action.payload] = {
				title: action.payload,
				questions: []
			};
		},
		addQuestion: (state, action) => {
			state[action.payload.title].questions.push(action.payload.card);
		},
		deleteDeck: (state, action) => {
			delete state[action.payload];
		}
	}
});

const { getDecks, addDeck, addQuestion, deleteDeck } = deckReducer.actions;

export const getDecksAsync = () => dispatch => {
	fetchDecks().then(decks => dispatch(getDecks(decks)));
};

export const addDeckAsync = payload => dispatch => {
	saveDeckTitle(payload).then(() => dispatch(addDeck(payload)));
};

export const addQuestionAsync = payload => dispatch => {
	addCardToDeck(payload.title, payload.card).then(() => dispatch(addQuestion(payload)));
};

export const deleteDeckAsync = payload => dispatch => {
	removeDeck(payload).then(() => dispatch(deleteDeck(payload)));
};

export default deckReducer.reducer;
