import { useNavigation, useRoute } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDeckAsync } from '../store/reducers/deck.reducer';

function Deck() {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const route = useRoute();

	// @ts-ignore
	const { id } = route.params;

	// @ts-ignore
	const deck = useSelector(state => state.decks[id]);

	const deleteDeck = () => {
		dispatch(deleteDeckAsync(id));

		navigation.goBack();
	};

	if (!deck) {
		return <AppLoading />;
	}

	return (
		<View style={styles.layout}>
			<View style={{ alignItems: 'center', position: 'relative', top: '8%' }}>
				<Text style={{ fontSize: 36 }}>{deck.title}</Text>
				<Text style={{ fontSize: 24, color: 'gray' }}>{deck.questions.length} card(s)</Text>
			</View>

			<View style={{ position: 'relative', top: '50%' }}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('NewQuestion', { id })}
				>
					<Text style={[styles.buttonText, { color: 'black' }]}>Add Card</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: 'black' }]}
					onPress={() => navigation.navigate('Quiz', { id })}
				>
					<Text style={styles.buttonText}>Start Quiz</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={deleteDeck}>
					<Text style={[styles.buttonText, { color: 'crimson' }]}>Delete Deck</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		padding: 20
	},
	button: {
		padding: 20,
		borderRadius: 7,
		borderColor: 'black',
		borderWidth: 2,
		marginBottom: 10
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	}
});

export default Deck;
