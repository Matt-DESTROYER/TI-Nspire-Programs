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

const programsContainer = document.getElementById("programs");
let programs = [];
(await GetCollection("Programs")).forEach((program) => programs.push(program.data()));
programs.sort((a, b) => a.date < b.date ? 1 : -1);
programs.forEach((program) => {
	programsContainer.appendChild(document.createElement("br"));
	programsContainer.appendChild(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	programsContainer.appendChild(div);
	const heading = document.createElement("div");
	if (loggedIn) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("edit-button");
		editButton.addEventListener("click", () => {
			localStorage.setItem("title", program.title);
			localStorage.setItem("version", program.version);
			localStorage.setItem("description", program.description);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Upload-Program/";
		});
		heading.appendChild(editButton);
	}
	const header = document.createElement("h2");
	header.textContent = program.title + " - " + program.version;
	heading.appendChild(header);
	div.appendChild(heading);
	const author = document.createElement("p");
	author.textContent = "Published by: " + program.author;
	div.appendChild(author);
	const screenshots = document.createElement("div");
	screenshots.classList.add("screenshots");
	for (let i = 0; i < program.screenshots.length; i++) {
		const screenshot = document.createElement("img");
		screenshot.src = program.screenshots[i];
		screenshot.width = 160;
		screenshots.appendChild(screenshot);
	}
	div.appendChild(screenshots);
	const description = document.createElement("p");
	description.textContent = program.description;
	div.appendChild(description);
	const link = document.createElement("a");
	link.download = program.title;
	link.href = program.file;
	const button = document.createElement("button");
	button.textContent = "Download";
	link.appendChild(button);
	div.appendChild(link);
	programsContainer.appendChild(div);
});
