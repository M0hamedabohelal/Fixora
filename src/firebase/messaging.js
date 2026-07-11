import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { doc, updateDoc } from "firebase/firestore";
import app, { db } from "./config";

let messaging;

try {
  messaging = getMessaging(app);
} catch (error) {
  console.error("Firebase Messaging could not be initialized:", error);
}

export const requestNotificationPermission = async (userId) => {
  if (!messaging) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Get FCM token. In production, you should pass a vapidKey from Firebase Console.
      // E.g. getToken(messaging, { vapidKey: 'YOUR_PUBLIC_VAPID_KEY' })
      const currentToken = await getToken(messaging);
      
      if (currentToken) {
        console.log("FCM Token retrieved:", currentToken);
        // Save the token to the user's Firestore document
        if (userId) {
          const userRef = doc(db, "users", userId);
          await updateDoc(userRef, {
            fcmToken: currentToken
          });
          console.log("FCM token saved to user doc.");
        }
        return currentToken;
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
  return null;
};

export const onMessageListener = () => {
  if (!messaging) return new Promise((resolve) => resolve(null));
  
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
};
