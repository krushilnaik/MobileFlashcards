import { createSlice } from '@reduxjs/toolkit';

const quizReducer = createSlice({
	name: 'quiz',
	initialState: {},
	reducers: {
		startQuiz: (state, action) => ({
			...state,
			[action.payload.deck]: {
				questions: action.payload.questions,
				initial: action.payload.questions.length,
				answered: 0,
				correct: 0
			}
		}),
		answeredQuestion: (state, action) => {
			state[action.payload].questions.shift();
			state[action.payload].answered += 1;
		},
		correctAnswer: (state, action) => {
			state[action.payload].correct += 1;
		},
		resetQuiz: (state, action) => {
			delete state[action.payload];
		}
	}
});

export const { startQuiz, answeredQuestion, correctAnswer, resetQuiz } = quizReducer.actions;

export default quizReducer.reducer;
