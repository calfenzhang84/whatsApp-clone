import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAqxcEeoyu3TgqDB12IJQSSpAPqL9dG_xo",
    authDomain: "whatsapp-clone-f090e.firebaseapp.com",
    projectId: "whatsapp-clone-f090e",
    storageBucket: "whatsapp-clone-f090e.appspot.com",
    messagingSenderId: "980968431022",
    appId: "1:980968431022:web:833a61a9c384926bb3bc3f",
    measurementId: "G-VV1W5F9P2M"
  };

  const firebaseApp = firebase.initializeApp (firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  

  export {auth, provider};
  export default db;
