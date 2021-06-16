import AsyncStorage from '@react-native-async-storage/async-storage';
import { DECK_STORAGE_KEY } from './constants';

export const fetchDecks = async () => {
	try {
		const data = await AsyncStorage.getItem(DECK_STORAGE_KEY);
		return JSON.parse(data);
	} catch (error) {
		console.error(error);
	}
};

/**
 * @param {string} title
 */
export const fetchDeck = async title => {
	const data = await fetchDecks();
	return data[title];
};

/**
 * @param {string} title
 */
export const saveDeckTitle = async title => {
	try {
		return AsyncStorage.mergeItem(
			DECK_STORAGE_KEY,
			JSON.stringify({
				[title]: {
					title,
					questions: []
				}
			})
		);
	} catch (error) {
		console.error(error);
	}
};

/**
 * @param {string} title
 */
export const removeDeck = async title => {
	const data = await fetchDecks();
	delete data[title];
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data)).catch(error => {
		console.error(error);
	});
};

export const addCardToDeck = async (title, card) => {
	let decks = await fetchDecks();
	// fetchDecks().then(data => (decks = data));

	const deck = await fetchDeck(title);
	deck.questions.push(card);
	decks[title] = deck;

	AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(decks)).catch(error => {
		console.error(error);
	});
};
