import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { NOTIFICATION_KEY } from './constants';

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(() => {
		Notifications.cancelAllScheduledNotificationsAsync;
	});
}

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (data === null) {
				Notifications.requestPermissionsAsync().then(({ status }) => {
					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync();

						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(20);
						tomorrow.setMinutes(30);

						Notifications.scheduleNotificationAsync({
							content: {
								title: 'Study your cards',
								body: "👋 don't forget to study today"
							},
							trigger: {
								date: tomorrow,
								repeats: true
							}
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
}
