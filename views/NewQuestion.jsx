import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addQuestionAsync } from '../store/reducers/deck.reducer';

function NewQuestion() {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const route = useRoute();

	// @ts-ignore
	const { id } = route.params;

	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [error, setError] = useState({ question: false, answer: false });

	const submit = () => {
		if (!question) {
			// @ts-ignore
			setError({ question: true });
		} else if (!answer) {
			// @ts-ignore
			setError({ answer: true });
		} else {
			dispatch(addQuestionAsync({ title: id, card: { question, answer } }));

			setQuestion('');
			setAnswer('');

			navigation.goBack();
		}
	};

	return (
		<View style={styles.layout}>
			<View>
				<TextInput
					style={styles.textInput}
					onChangeText={text => setQuestion(text)}
					// @ts-ignore
					onFocus={() => setError({ question: false })}
					placeholder='Question'
					value={question}
				/>

				{error && error.question && <Text style={styles.error}>Question is required</Text>}

				<TextInput
					style={styles.textInput}
					onChangeText={text => setAnswer(text)}
					// @ts-ignore
					onFocus={() => setError({ answer: false })}
					placeholder='Answer'
					value={answer}
				/>

				{error && error.answer && <Text style={styles.error}>Answer is required</Text>}
			</View>

			<View style={{ position: 'relative', top: '60%' }}>
				<TouchableOpacity style={styles.button} onPress={submit}>
					<Text style={styles.buttonText}>Submit</Text>
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
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		marginBottom: 10
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
	},
	error: {
		color: 'red',
		fontWeight: 'bold',
		marginBottom: 10
	}
});

export default NewQuestion;
