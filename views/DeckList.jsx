import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import DeckPreview from '../components/DeckPreview';
import { getDecksAsync } from '../store/reducers/deck.reducer';

function DeckList() {
	// @ts-ignore
	const decks = useSelector(state => state.decks);
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
					const { title, questions } = decks[id];
					return <DeckPreview key={id} id={id} deckTitle={title} numCards={questions.length} />;
				})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	layout: {
		paddingRight: 30
	}
});

export default DeckList;
