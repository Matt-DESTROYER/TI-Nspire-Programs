import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

const firstnameInput = document.getElementById("firstname"),
      lastnameInput = document.getElementById("lastname"),
      usernameInput = document.getElementById("username"),
      passwordInput = document.getElementById("password"),
      confirmpasswordInput = document.getElementById("confirm-password"),
      errormessage = document.getElementById("error-message");

document.getElementById("create-account").addEventListener("click", async () => {
	errormessage.hidden = true;
	if (firstnameInput.value.trim() === "") {
		errormessage.innerHTML = "Error: A firstname is required.";
		errormessage.hidden = false;
	} else if (firstnameInput.value.trim().length > 50) {
		errormessage.innerHTML = "Error: Firstname too long";
		errormessage.hidden = false;
	} else if (lastnameInput.value.trim() === "") {
		errormessage.innerHTML = "Error: A lastname is required.";
		errormessage.hidden = false;
	} else if (lastnameInput.value.trim().length > 50) {
		errormessage.innerHTML = "Error: Lastname too long.";
		errormessage.hidden = false;
	} else if (usernameInput.value.trim() === "") {
		errormessage.innerHTML = "Error: A username is required.";
		errormessage.hidden = false;
	} else if (usernameInput.value.trim().length > 50) {
		errormessage.innerHTML = "Error: Username too long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim() === "") {
		errormessage.innerHTML = "Error: A password is required.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim().length < 8) {
		errormessage.innerHTML = "Error: Password must be at least 8 characters long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim().length > 50) {
		errormessage.innerHTML = "Error: Password too long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim() !== confirmpasswordInput.value.trim()) {
		errormessage.innerHTML = "Error: Passwords do not match.";
		errormessage.hidden = false;
	} else {
		let accountExists = false;
		(await GetCollection("Accounts")).forEach((account) => {
			const data = account.data();
			if (usernameInput.value.trim() === atob(data.username)) {
				accountExists = true;
			}
		});
		if (accountExists) {
			errormessage.innerHTML = "Error: An account with this username already exists, if this is your account please <a href=\"https://matt-destroyer.github.io/TI-Nspire-Programs/Login/\">login</a>.";
			errormessage.hidden = false;
		} else {
			await CreateDocument("Accounts", {
				"firstname": btoa(firstnameInput.value.trim()),
				"lastname": btoa(lastnameInput.value.trim()),
				"username": btoa(usernameInput.value.trim()),
				"password": btoa(passwordInput.value.trim()),
				"votes": []
			});
			localStorage.setItem("username", btoa(usernameInput.value.trim()));
			localStorage.setItem("password", btoa(passwordInput.value.trim()));
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		}
	}
});
