import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-storage.js";

const firebaseConfig = {
	apiKey: "AIzaSyAYc2AtdxlSEkD_VrGaIiKjOv0B3xD7uSs",
	authDomain: "ti-nspire-programs-database.firebaseapp.com",
	projectId: "ti-nspire-programs-database",
	storageBucket: "ti-nspire-programs-database.appspot.com",
	messagingSenderId: "1026879731613",
	appId: "1:1026879731613:web:03c983f8072ebae67ba174"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function GetCollection(collectionName) {
	try {
		return await getDocs(collection(db, collectionName));
	} catch (err) {
		console.error("Error reading data from database.");
		return null;
	}
}

async function GetDocument(collectionName, documentName) {
	try {
		return await getDoc(doc(db, collectionName, documentName));
	} catch (err) {
		console.error("Error reading data from database.");
		return null;
	}
}

async function CreateDocument(collectionName, object) {
	try {
		return await addDoc(collection(db, collectionName), object);
	} catch (err) {
		console.error("Error creating data on database.");
		return null;
	}
}

async function UpdateDocument(collectionName, documentName, object) {
	try {
		return await updateDoc(doc(db, collectionName, documentName), object);
	} catch (err) {
		console.error("Error updating data on database.");
		return null;
	}
}

async function DeleteDocument(collectionName, documentName) {
	try {
		return await deleteDoc(doc(db, collectionName, documentName));
	} catch (err) {
		console.error("Error deleting data from database.");
		return null;
	}
}

async function UploadFile(file, path) {
	try {
		return await uploadBytes(ref(storage, path + "/" + file.name), file);
	} catch (err) {
		console.error("Error uploading to database:", err);
		return err;
	}
}

async function DeleteFile(path) {
	try {
		return await deleteObject(ref(storage, path));
	} catch (err) {
		console.error("Error deleting from database:", err);
		return err;
	}
}

async function GetFileURL(path, file) {
	try {
		return await getDownloadURL(ref(storage, path + "/" + file));
	} catch (err) {
		console.error("An error occurred downloading from the database:", err);
		return err;
	}
}

export { GetCollection, GetDocument, CreateDocument, UpdateDocument, DeleteDocument, UploadFile, DeleteFile, GetFileURL };
