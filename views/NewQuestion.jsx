import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';

function NewQuestion() {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');

	const addQuestion = () => {};

	return (
		<View>
			<TextInput placeholder='Question' defaultValue={question} onChangeText={text => setQuestion(text)} />
			<TextInput placeholder='Answer' defaultValue={answer} onChangeText={text => setAnswer(text)} />
			<Button title='Submit' color='black' onPress={addQuestion} />
		</View>
	);
}

export default NewQuestion;
