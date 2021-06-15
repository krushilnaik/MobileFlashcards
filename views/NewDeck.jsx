import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addDeckAsync } from '../store/reducers/deck.reducer';
import { useNavigation } from '@react-navigation/native';

function NewDeck() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [deckTitle, setDeckTitle] = useState('');
	const [error, setError] = useState(false);

	const submit = () => {
		if (deckTitle) {
			dispatch(addDeckAsync(deckTitle));

			setDeckTitle('');

			navigation.navigate('Deck', { id: deckTitle });
		} else {
			setError(true);
		}
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={styles.layout}>
			<View>
				<Text style={styles.heading}>What is the title of your new deck?</Text>
			</View>

			<View>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setDeckTitle(text)}
					onFocus={() => setError(false)}
					placeholder='Deck Title'
					autoCapitalize='words'
					value={deckTitle}
				/>
				{error && <Text style={{ color: 'red', fontWeight: 'bold' }}>Title cannot be empty</Text>}
			</View>

			<View style={{ position: 'relative', top: '60%' }}>
				<TouchableOpacity style={styles.button} onPress={submit}>
					<Text style={styles.buttonText}>Create Deck</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		padding: 20
	},
	heading: {
		textAlign: 'center',
		fontSize: 36
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5
	},
	button: {
		padding: 20,
		borderRadius: 7,
		backgroundColor: 'darkslategray'
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	}
});

export default NewDeck;
