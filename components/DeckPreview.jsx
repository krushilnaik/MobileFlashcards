import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

/**
 *
 * @param {{
 * 	id: string,
 * 	deckTitle: string
 * 	numCards: number
 * }} props
 * @returns
 */
function DeckPreview(props) {
	const navigation = useNavigation();
	const { id, deckTitle, numCards } = props;

	return (
		<TouchableOpacity onPress={() => navigation.navigate('Deck', { id })}>
			<Card containerStyle={styles.deckPreview}>
				<Card.Title>{deckTitle}</Card.Title>
				<Text style={styles.deckSubtitle}>Deck has {numCards} card(s)</Text>
			</Card>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	deckSubtitle: {
		textAlign: 'center'
	},
	deckPreview: {
		width: '100%',
		backgroundColor: 'white'
	}
});

export default DeckPreview;
