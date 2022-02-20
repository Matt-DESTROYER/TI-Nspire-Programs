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
const version = document.getElementById("version");
const author = document.getElementById("author");
const description = document.getElementById("description");
let fileUrl = null;
const screenshots = document.getElementById("screenshots");
const screenshotInputs = [];
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

document.getElementById("file").addEventListener("input", (e) => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => res(reader.result);
		reader.onerror = error => rej(error);
	}).then((url) => fileUrl = url);
});

document.getElementById("addScreenshot").addEventListener("click", () => {
	const screenshotInput = document.createElement("input");
	screenshotInput.type = "file";
	screenshotInput.accept = "image/*";
	screenshotInputs.push(screenshotInput);
	screenshots.appendChild(screenshotInput);
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	screenshotInputs.push(deleteButton);
	screenshots.appendChild(deleteButton);
	deleteButton.addEventListener("click", () => {
		screenshots.removeChild(screenshotInput);
		screenshots.removeChild(deleteButton);
		screenshotInputs.splice(screeshotInputs.indexOf(screenshotInput), 1);
		screenshotInputs.splice(screeshotInputs.indexOf(deleteButton), 1);
	});
});

document.getElementById("upload").addEventListener("click", async () => {
	if (!title.value.trim()) {
		alert("No title...");
	} else if (title.value.length > 100) {
		alert("Title too long...");
	} else if (!version.value.trim()) {
		alert("No version...");
	} else if (version.value.length > 100) {
		alert("Version too long...");
	} else if (!author.value.trim()) {
		alert("No author...");
	} else if (author.value.length > 100) {
		alert("Author too long...");
	} else if (!description.value.trim()) {
		alert("No description...");
	} else if (description.length > 10000) {
		alert("Description too long...");
	} else if (!fileUrl) {
		alert("No file uploaded...");
	} else if (password.value.trim().length < 4) {
		alert("Password must be at least four characters long...");
	} else if (password.value !== confirmPassword.value) {
		alert("Passwords do not match...");
	} else {
		let alreadyExists = false, passwordAccepted = false, id = null;
		(await GetCollection("Programs")).forEach((program) => {
			const data = program.data();
			if (data.title === title.value) {
				alreadyExists = true;
				if (data.password === btoa(password.value)) {
					passwordAccepted = true;
					console.log(program.id, data.id);
					id = program.id;
				}
			}
		});
		const images = [];
		screenshots.forEach(async (image, i) => {
			await (new Promise((res, rej) => {
				const reader = new FileReader();
				reader.readAsDataURL(image.files[0]);
				reader.onload = () => res(reader.result);
			})).then((url) => images.push(url));
		});
		console.log(images);
		if (alreadyExists) {
			if (passwordAccepted) {
				await UpdateDocument("Programs", id, {
					"title": title.value,
					"version": version.value,
					"description": description.value,
					"date": Date.now(),
					"file": fileUrl,
				});
				const a = document.createElement("a");
				a.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
				a.click();
			} else {
				alert("A program with this title already exists. If you are attempting to update said program, please input the password used to create that program. Otherwise use a different title to publish your program.");
			}
		} else {
			await CreateDocument("Programs", null, {
				"title": title.value,
				"version": version.value,
				"author": author.value,
				"description": description.value,
				"date": Date.now(),
				"file": fileUrl,
				"password": btoa(password.value)
			});
			const a = document.createElement("a");
			a.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
			a.click();
		}
	}
});
