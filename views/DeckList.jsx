import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getDecksAsync } from '../store/reducers/deck.reducer';

function DeckList() {
	// @ts-ignore
	const decks = useSelector(state => state.decks);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!decks) {
			dispatch(getDecksAsync());
		}
	}, [decks]);

	return (
		<ScrollView style={styles.layout}>
			{decks &&
				Object.keys(decks).map(id => {
					const deck = decks[id];

					return (
						<TouchableOpacity key={id} onPress={() => navigation.navigate('Deck', { id })}>
							<Card containerStyle={styles.deckPreview}>
								<Card.Title>{deck.title}</Card.Title>
								<Card.Divider />
								<Text style={styles.deckSubtitle}>Deck has {deck.questions.length} card(s)</Text>
							</Card>
						</TouchableOpacity>
					);
				})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	layout: {
		paddingRight: 30
	},
	deckTitle: {
		//
	},
	deckSubtitle: {
		textAlign: 'center'
	},
	deckPreview: {
		width: '100%',
		backgroundColor: 'darkslategray'
	}
});

export default DeckList;
