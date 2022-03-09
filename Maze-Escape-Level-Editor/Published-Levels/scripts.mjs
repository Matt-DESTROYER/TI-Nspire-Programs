import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

const levelContainer = document.getElementById("levels");
let levels = [];
(await GetCollection("Levels")).forEach((level) => levels.push(level.data()));
levels.sort((a, b) => a.date < b.date ? 1 : -1);
levels.forEach(async (level) => {
	levelContainer.appendChild(document.createElement("br"));
	levelContainer.appendChild(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	const heading = document.createElement("div");
	if (loggedIn) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("edit-button");
		editButton.addEventListener("click", () => {
			localStorage.setItem("name", level.levelName);
			localStorage.setItem("data", level.levelData);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Maze-Escape-Level-Editor/";
		});
		heading.appendChild(editButton);
	}
	const header = document.createElement("h2");
	header.textContent = level.levelName;
	heading.appendChild(header);
	div.appendChild(heading);
	const author = document.createElement("p");
	author.textContent = "Created by: " + level.author;
	div.appendChild(author);
	const levelDisplay = document.createElement("canvas");
	levelDisplay.width = level.levelData[0].length * 10;
	levelDisplay.height = level.levelData.length * 10;
	const ctx = levelDisplay.getContext("2d", { alpha: false });
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, levelDisplay.width, levelDisplay.height);
	for (let y = 0; y < level.levelData.length; y++) {
		for (let x = 0; x < level.levelData[y].length; x++) {
			if (level.levelData[y][x] === "#") {
				ctx.fillStyle = "#000000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (level.levelData[y][x] === "@") {
				ctx.fillStyle = "#0000ff";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (level.levelData[y][x] === "*") {
				ctx.fillStyle = "#008000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			}
		}
	}
	div.appendChild(levelDisplay);
	levelContainer.appendChild(div);
});
