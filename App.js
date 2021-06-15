import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setLocalNotification } from './util/helpers';
import Home from './views/Home';
import NewQuestion from './views/NewQuestion';
import Quiz from './views/Quiz';
import Deck from './views/Deck';

const Stack = createStackNavigator();

export default function App() {
	useEffect(() => {
		setLocalNotification();
	}, []);

	return (
		<Provider store={store}>
			<SafeAreaView style={styles.layout}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name='Home' component={Home} />
						<Stack.Screen name='Deck' component={Deck} />
						<Stack.Screen name='Quiz' component={Quiz} />
						<Stack.Screen name='NewQuestion' component={NewQuestion} />
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	layout: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'stretch',
		justifyContent: 'flex-start'
	}
});
