import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYc2AtdxlSEkD_VrGaIiKjOv0B3xD7uSs",
  authDomain: "ti-nspire-programs-database.firebaseapp.com",
  projectId: "ti-nspire-programs-database",
  storageBucket: "ti-nspire-programs-database.appspot.com",
  messagingSenderId: "1026879731613",
  appId: "1:1026879731613:web:03c983f8072ebae67ba174"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
