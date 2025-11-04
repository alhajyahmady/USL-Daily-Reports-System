// firebase-config.js
// USL Daily Reports System - Firebase Configuration

// ======== TAFADHALI SOMA HAPA ========
// Baada ya kuunda Firebase project yako, nenda:
// Firebase Console → Project Settings → Your apps → SDK setup
// Bandika config yako halisi kwenye sehemu ya `firebaseConfig` hapa chini.

const firebaseConfig = {
  apiKey: "AIzaSyC-Xq75VxHyMiGXHahtR4C0KH1vKs7oP0g",
  authDomain: "daily-reports-app-bc7cf.firebaseapp.com",
  databaseURL: "https://daily-reports-app-bc7cf-default-rtdb.firebaseio.com",
  projectId: "daily-reports-app-bc7cf",
  storageBucket: "daily-reports-app-bc7cf.firebasestorage.app",
  messagingSenderId: "1007493011795",
  appId: "1:1007493011795:web:425b4681b84aa0aad6e9a6",
};

// Usibadilishe code hii chini — inachochea Firebase + Offline support
if (typeof firebase === "undefined") {
  document.write('<script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js"></script>');
  document.write('<script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-auth-compat.js"></script>');
  document.write('<script src="https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore-compat.js"></script>');
}

setTimeout(() => {
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Ruhusu offline persistence
  db.enablePersistence().catch(err => {
    console.warn("Offline persistence haikuwezeshwa:", err.code);
  });

  window.USL_FIREBASE = { app, auth, db };
}, 1000);
