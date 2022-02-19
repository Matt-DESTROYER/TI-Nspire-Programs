import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
	getFirestore,
	collection,
	doc,
	addDoc,
	setDoc,
	getDocs
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
const firebaseConfig = {
	apiKey: "AIzaSyAYc2AtdxlSEkD_VrGaIiKjOv0B3xD7uSs",
	authDomain: "ti-nspire-programs-database.firebaseapp.com",
	projectId: "ti-nspire-programs-database",
	storageBucket: "ti-nspire-programs-database.appspot.com",
	messagingSenderId: "1026879731613",
	appId: "1:1026879731613:web:45cdecd4e9ed5dc57ba174"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

async function CreateDocument(collectionName, documentName, object) {
	try {
		if (documentName) {
			return await setDoc(doc(db, collectionName, documentName), object);
		} else {
			return await addDoc(collection(db, collectionName), object);
		}
	} catch (err) {
		console.error("Error writing to database:", err);
		return err;
	}
}

async function UpdateDocument(collectionName, documentName, object) {
	try {
		await updateDoc(doc(db, collectionName, documentName), object);
	} catch (err) {
		console.error("Error updating database:", err);
		return err;
	}
}

async function GetCollection(collectionName) {
	try {
		return await getDocs(collection(db, collectionName));
	} catch (err) {
		console.log("Error reading from database:", err);
		return err;
	}
}
