import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, addDoc, updateDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function CreateDocument(collectionName, object) {
	try {
		return await addDoc(collection(db, collectionName), object);
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
const description = document.getElementById("description");
let fileUrl = null;
const screenshots = document.getElementById("screenshots");
const screenshotInputs = [];

{
	if (localStorage.getItem("title")) {
		title.value = localStorage.getItem("title");
		localStorage.removeItem("title");
	}
	if (localStorage.getItem("version")) {
		version.value = localStorage.getItem("version");
		localStorage.removeItem("version");
	}
	if (localStorage.getItem("description")) {
		description.value = localStorage.getItem("description");
		localStorage.removeItem("description");
	}
}

document.getElementById("file").addEventListener("input", (e) => {
	return new Promise((res, rej) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => res(reader.result);
		reader.onerror = error => rej(error);
	}).then((url) => fileUrl = url);
});

document.getElementById("add-screenshot").addEventListener("click", () => {
	const br = document.createElement("br");
	screenshots.appendChild(br);
	const screenshotInput = document.createElement("input");
	screenshotInput.type = "file";
	screenshotInput.accept = "image/*";
	screenshotInputs.push(screenshotInput);
	screenshots.appendChild(screenshotInput);
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	screenshots.appendChild(deleteButton);
	deleteButton.addEventListener("click", () => {
		screenshots.removeChild(br);
		screenshots.removeChild(screenshotInput);
		screenshots.removeChild(deleteButton);
		screenshotInputs.splice(screenshotInputs.indexOf(screenshotInput), 1);
	});
});

const errormessage = document.getElementById("error-message");
document.getElementById("upload").addEventListener("click", async () => {
	if (localStorage.getItem("username") === null ||
	    localStorage.getItem("password") === null) {
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Login/";
	} else {
		let loggedIn = false;
		(await GetCollection("Accounts")).forEach((account) => {
			const data = account.data();
			if (localStorage.getItem("username") === data.username &&
			    localStorage.getItem("password") === data.password) {
				loggedIn = true;
			}
		});
		if (!loggedIn) {
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Login/";
		}
	}
	errormessage.hidden = true;
	if (title.value.trim() === "") {
		errormessage.textContent = "No title...";
		errormessage.hidden = false;
	} else if (title.value.length > 100) {
		errormessage.textContent = "Title too long...";
		errormessage.hidden = false;
	} else if (version.value.trim() === "") {
		errormessage.textContent = "No version...";
		errormessage.hidden = false;
	} else if (version.value.length > 100) {
		errormessage.textContent = "Version too long...";
		errormessage.hidden = false;
	} else if (description.value.trim() === "") {
		errormessage.textContent = "No description...";
		errormessage.hidden = false;
	} else if (description.length > 10000) {
		errormessage.textContent = "Description too long...";
		errormessage.hidden = false;
	} else if (!fileUrl) {
		errormessage.textContent = "No file uploaded...";
		errormessage.hidden = false;
	} else {
		let alreadyExists = false, id = null;
		(await GetCollection("Programs")).forEach((program) => {
			const data = program.data();
			if (data.title === title.value) {
				alreadyExists = true;
				id = program.id;
			}
		});
		async function upload() {
			if (alreadyExists) {
				await UpdateDocument("Programs", id, {
					"version": version.value,
					"description": description.value,
					"date": Date.now(),
					"file": fileUrl,
					"screenshots": screenshotUrls
				});
			} else {
				await CreateDocument("Programs", {
					"title": title.value,
					"version": version.value,
					"author": atob(localStorage.getItem("username")),
					"description": description.value,
					"date": Date.now(),
					"file": fileUrl,
					"screenshots": screenshotUrls,
					"votes": 0,
					"downvotes": 0
				});
			}
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		}
		const screenshotUrls = [];
		if (screenshotInputs.length > 0) {
			for (const screenshot of screenshotInputs) {
				new Promise((res, rej) => {
					const reader = new FileReader();
					reader.readAsDataURL(screenshot.files[0]);
					reader.onload = () => res(reader.result);
					reader.onerror = error => rej(error);
				}).then((url) => {
					console.log(url);
					screenshotUrls.push(url);
				}).catch((err) => {
					screenshotUrls.push(null);
				}).finally(() => {
					if (screenshotUrls.length === screenshotInputs.length) {
						upload();
					}
				});
			}
		} else {
			upload();
		}
	}
});
