import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button } from 'react-native';
import { addEntry } from '../api/actions/deck.actions';
import { addDeckTitle } from '../api/utils/util';

function NewDeck(props) {
	const [deckTitle, setDeckTitle] = useState('');
	const { dispatch, navigation } = props;

	const addDeck = () => {
		if (deckTitle) {
			const { titleId, deck } = addDeckTitle(deckTitle);

			dispatch(addEntry(deck));

			navigation.navigate('ViewDeck', {
				deckId: titleId,
				deck: deck[titleId]
			});
		}
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.layout}>
			<View>
				<Text>What is the title of your new deck?</Text>
				<TextInput
					placeholder='Deck Title'
					defaultValue={deckTitle}
					onChange={event => {
						setDeckTitle(event.currentTarget.toString());
					}}
				/>
			</View>

			<Button title='Create Deck' onPress={addDeck} color='black' />
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	layout: {
		display: 'flex',
		height: '100vh',
		flexDirection: 'column',
		alignContent: 'space-between'
	},
	textField: {
		//
	}
});

export default NewDeck;
