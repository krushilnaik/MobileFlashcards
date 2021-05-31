import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import DeckList from './DeckList';
import NewDeck from './NewDeck';

const Tab = createBottomTabNavigator();

function Home() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name='Decks'
				component={DeckList}
				options={{
					tabBarIcon: () => <FontAwesome name='bookmark' style={styles.tabIconLayout} size={36} />
				}}
			/>
			<Tab.Screen
				name='Add Deck'
				component={NewDeck}
				options={{
					tabBarIcon: () => <FontAwesome name='plus-square' style={styles.tabIconLayout} size={36} />
				}}
			/>
		</Tab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabIconLayout: { display: 'flex', flexDirection: 'column' }
});

export default Home;
