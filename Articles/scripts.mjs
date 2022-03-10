import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", renderArticles);
const articlesContainer = document.getElementById("articles"), articles = [];
(async function () {
	(await GetCollection("Articles")).forEach((article) => {
		const data = article.data();
		data.id = article.id;
		articles.push(data);
	});
	renderArticles();
})();

async function renderArticles() {
	while (articlesContainer.firstChild) {
		articlesContainer.removeChild(articlesContainer.lastChild);
	}
	switch (sortSelect.value) {
		case "newest-oldest":
			articles.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
		case "oldest-newest":
			articles.sort((a, b) => a.date > b.date ? 1 : -1);
			break;
		default:
			articles.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
	}
	articles.forEach((article) => {
		articlesContainer.appendChild(document.createElement("br"));
		articlesContainer.appendChild(document.createElement("br"));
		const div = document.createElement("div");
		div.classList.add("program-container");
		articlesContainer.appendChild(div);
		const heading = document.createElement("div");
		if (loggedIn) {
			const editButton = document.createElement("button");
			editButton.textContent = "Edit";
			editButton.classList.add("edit-button");
			editButton.addEventListener("click", () => {
				location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/Post/";
			});
			heading.appendChild(editButton);
		}
		const header = document.createElement("h2");
		header.textContent = article.title;
		heading.appendChild(header);
		div.appendChild(heading);
		const author = document.createElement("p");
		author.textContent = "Published by: " + article.author;
		div.appendChild(author);
		const description = document.createElement("p");
		description.textContent = article.description;
		div.appendChild(description);
		const readButton = document.createElement("button");
		readButton.textContent = "Read";
		readButton.addEventListener("click", function () {
			localStorage.setItem("article_id", article.id);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/Read/";
		});
		div.appendChild(readButton);
		articlesContainer.appendChild(div);
	});
}
