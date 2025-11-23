import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    // newer expo typings expect these fields
    shouldShowBanner: true as any,
    shouldShowList: true as any,
  }),
});

export const NotificationService = {
  configure: () => {
    // Additional configuration can go here (listeners etc.)
  },

  requestPermissions: async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (e) {
      console.warn('Notification permission request failed', e);
      return false;
    }
  },

  sendLocalNotification: async (title: string, body?: string) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: { title, body },
        trigger: null,
      });
    } catch (e) {
      console.warn('Failed to send notification', e);
    }
  },
};

export default NotificationService;
