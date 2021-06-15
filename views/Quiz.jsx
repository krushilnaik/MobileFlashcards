import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux';
import { answeredQuestion, startQuiz, correctAnswer, resetQuiz } from '../store/reducers/quiz.reducer';
import { clearLocalNotification, setLocalNotification } from '../util/helpers';

function Quiz() {
	const dispatch = useDispatch();
	const route = useRoute();

	// @ts-ignore
	const { id } = route.params;

	// @ts-ignore
	const deck = useSelector(state => state.decks[id]);
	console.log('params:', route.params);

	// @ts-ignore
	const quiz = useSelector(state => state.quiz[id]);

	const [question, setQuestion] = useState(true);

	useEffect(() => {
		if (!quiz) {
			dispatch(startQuiz({ deck: id, questions: deck.questions }));
		}

		return () => {
			dispatch(resetQuiz(id));
		};
	}, []);

	const submit = (correct = false) => {
		dispatch(answeredQuestion(id));
		correct && dispatch(correctAnswer(id));

		setQuestion(true);

		if (quiz.answered === quiz.initial) {
			clearLocalNotification().then(setLocalNotification);
		}
	};

	const reset = () => {
		dispatch(resetQuiz(id));
		dispatch(startQuiz({ deck: id, questions: deck.questions }));
	};

	if (deck && deck.questions.length < 1) {
		return (
			<View style={styles.layout}>
				<Text style={{ fontSize: 24 }}>You haven't added any cards to test with.</Text>
			</View>
		);
	}

	if (!quiz) {
		return <AppLoading />;
	}

	if (quiz.answered === quiz.initial) {
		return (
			<View style={[styles.layout, { position: 'relative', top: '30%' }]}>
				<Text style={styles.card}>You scored:</Text>
				<Text style={styles.card}>{Math.round((quiz.correct * 100) / quiz.initial)}%</Text>

				<TouchableOpacity
					style={[styles.button, { backgroundColor: 'darkslategray', marginTop: 5 }]}
					onPress={reset}
				>
					<Text style={styles.buttonText}>Restart Quiz</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.layout}>
			<Text style={[styles.text, { marginBottom: 5 }]}>{`${quiz.answered + 1}/${quiz.initial}`}</Text>

			<View style={{ position: 'relative', top: '10%', alignItems: 'center' }}>
				<Text style={styles.card}>{quiz.questions[0][question ? 'question' : 'answer']}</Text>

				<TouchableOpacity onPress={() => setQuestion(!question)}>
					<Text style={[styles.text, { color: 'coral' }]}>
						{question ? 'View Answer' : ' View Question'}
					</Text>
				</TouchableOpacity>
			</View>

			<View style={{ position: 'relative', top: '50%' }}>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: 'green' }]}
					onPress={() => submit(true)}
				>
					<Text style={styles.buttonText}>Correct</Text>
				</TouchableOpacity>

				<TouchableOpacity style={[styles.button, { backgroundColor: 'coral' }]} onPress={() => submit()}>
					<Text style={styles.buttonText}>Incorrect</Text>
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
		marginBottom: 10
	},
	buttonText: {
		color: 'white',
		fontSize: 22,
		textAlign: 'center'
	},
	text: {
		fontWeight: 'bold',
		fontSize: 18,
		marginTop: 5
	},
	card: {
		fontWeight: 'bold',
		fontSize: 28,
		textAlign: 'center'
	}
});

export default Quiz;
