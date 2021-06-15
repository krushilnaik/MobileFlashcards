import { combineReducers } from 'redux';
import deckReducer from './deck.reducer';
import quizReducer from './quiz.reducer';

export const rootReducer = combineReducers({
	decks: deckReducer,
	quiz: quizReducer
});
