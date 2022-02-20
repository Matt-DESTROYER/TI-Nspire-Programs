import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, addDoc, updateDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function GetCollection(collectionName) {
	try {
		return await getDocs(collection(db, collectionName));
	} catch (err) {
		return err;
	}
}

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
	await updateDoc(doc(db, collectionName, documentName), object);
}

const title = document.getElementById("title");
const description = document.getElementById("description");
const file = document.getElementById("file");
let fileUrl = null;
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const upload = document.getElementById("upload");

file.addEventListener("input", () => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(file.files[0]);
		reader.onload = () => res(reader.result);
		reader.onerror = error => rej(error);
	}).then((url) => fileUrl = url);
});

upload.addEventListener("click", () => {
	console.log(fileUrl)
});
