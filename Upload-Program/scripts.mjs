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

function downloadURI(url, name) {
	const link = document.createElement("a");
	link.download = name;
	link.href = url;
	(document.body || document.getElementsByTagName("body")[0]).appendChild(link);
	link.click();
	(document.body || document.getElementsByTagName("body")[0]).removeChild(link);
	URL.revokeObjectURL(url);
	URL.revokeObjectURL(link);
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
	if (!title.value || title.value === "") {
		alert("No title...");
	} else if (!version.value || version.value === "") {
		alert("No version...");
	} else if (!description.value || description.value === "") {
		alert("No description...");
	} else if (!fileUrl) {
		alert("No file uploaded...");
	} else if (!password.value || password.value.length < 4) {
		alert("Password must be at least four characters long...");
	} else if (password.value !== confirmPassword.value) {
		alert("Passwords do not match...");
	} else {
		let alreadyExists = false, passwordAccepted = false, id = null;
		(await GetCollection("Programs")).forEach((program) => {
			const data = programs.data();
			if (data.title === title.value) {
				alreadyExists = true;
				if (data.password === btoa(password.value)) {
					passwordAccepted = true;
					console.log(program.id, data.id);
					id = program.id;
				}
			}
		});
		if (alreadyExists) {
			if (passwordAccepted) {
				await UpdateDocument("Programs", id, {
					"title": title.value,
					"version": version.value,
					"description": description.value,
					"date": Date.now(),
					"file": fileUrl,
				});
			} else {
				alert("A program with this title already exists. If you are attempting to update said program, please input the password used to create that program. Otherwise use a different title to publish your program.");
			}
		} else {
			await CreateDocument("Programs", null, {
				"title": title.value,
				"version": version.value,
				"description": description.value,
				"date": Date.now(),
				"file": fileUrl,
				"password": btoa(password.value)
			});
		}
	}
});
