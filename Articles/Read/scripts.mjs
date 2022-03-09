import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function GetDocument(collectionName, documentName) {
	try {
		const snap = await getDoc(doc(db, collectionName, documentName));
		if (snap.exists()) {
			return snap;
		} else {
			throw new Error("Document does not exist.");
		}
	} catch (err) {
		return err;
	}
}

let loggedIn = false;
(async function() {
	(await GetCollection("Accounts")).forEach((account) => {
		const data = account.data();
		if (localStorage.getItem("username") === data.username &&
		    localStorage.getItem("password") === data.password) {
			loggedIn = true;
		}
	});
})();

let article_id;
if (localStorage.getItem("article_id")) {
	article_id = localStorage.getItem("article_id");
	localStorage.removeItem("article_id");
} else {
	//location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/";
}

const article = (await GetDocument("Articles", article_id)).data();

const articlesContainer = document.getElementById("article");
const div = document.createElement("div");
div.classList.add("generic-container");
articlesContainer.appendChild(div);
const heading = document.createElement("div");
if (loggedIn) {
	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.classList.add("edit-button");
	editButton.addEventListener("click", () => {
		localStorage.setItem("title", article.title);
		localStorage.setItem("description", article.description);
		localStorage.setItem("content", article.content);
		location.href = "https://matt-destroyer.github.io/TI-Nspire-articles/Articles/Post/";
	});
	heading.appendChild(editButton);
}
const header = document.createElement("h2");
header.textContent = article.title;
heading.appendChild(header);
div.appendChild(heading);
const author = document.createElement("p");
author.textContent = "Published by: " + article.author;
div.appendChild(article.author);
const content = document.createElement("p");
description.textContent = article.content;
div.appendChild(content);
articlesContainer.appendChild(div);
