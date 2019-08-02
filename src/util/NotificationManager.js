import PushNotification from 'react-native-push-notification';

export const scheduleNotification = ({ date, message }) => {
  console.log('scheduleNotification', date, message);
  PushNotification.localNotificationSchedule({
    //... You can use all the options from localNotifications
    message, // (required)
    date: new Date(Date.now() + 60 * 1000) // in 60 secs
  });
};