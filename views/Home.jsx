import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
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
					tabBarIcon: ({ color }) => <FontAwesome name={'bookmark'} size={30} color={color} />
				}}
			/>
			<Tab.Screen
				name='Add Deck'
				component={NewDeck}
				options={{
					tabBarIcon: ({ color }) => <FontAwesome name='plus-square' size={30} color={color} />
				}}
			/>
		</Tab.Navigator>
	);
}

export default Home;
