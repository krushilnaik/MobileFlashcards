import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

/**
 *
 * @param {{
 * 	deckID: string
 * }} props
 * @returns
 */
function Deck(props) {
	const deckTitle = 'Deck1';
	const deck = [
		{ q: 'q1', a: 'a1' },
		{ q: 'q2', a: 'a2' },
		{ q: 'q3', a: 'a3' },
		{ q: 'q4', a: 'a4' }
	];

	const deleteDeck = () => {};
	const addCard = () => {};
	const startQuiz = () => {};

	return (
		<View>
			<Text>{deckTitle}</Text>
			<Text>{`${deck.length} cards`}</Text>

			<Button title='Add Card' onPress={addCard} color='white' />
			<Button title='Start Quiz' onPress={startQuiz} color='black' />
			<Button title='Delete Deck' onPress={deleteDeck} />
		</View>
	);
}

export default Deck;
