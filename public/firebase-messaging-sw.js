importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyClf0C3qZj5QQgwpNVvdkomneP3iTMnnys",
  authDomain: "fixora-d1cc2.firebaseapp.com",
  projectId: "fixora-d1cc2",
  storageBucket: "fixora-d1cc2.firebasestorage.app",
  messagingSenderId: "402081696626",
  appId: "1:402081696626:web:1c41255f8c2b00171d2beb",
  measurementId: "G-LYNXN6HL12"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Fixora';
  const notificationOptions = {
    body: payload.notification?.body,
    icon: '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
