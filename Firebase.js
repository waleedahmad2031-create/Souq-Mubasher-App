import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAXZqvb11VBhk7OfH68zY5VPQe01ZtKa-w",
    authDomain: "souq-mubasher-c9d87.firebaseapp.com",
    projectId: "souq-mubasher-c9d87",
    storageBucket: "souq-mubasher-c9d87.firebasestorage.app",
    messagingSenderId: "34321703167",
    appId: "1:34321703167:web:bbea33f93d9485fc97acca"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
