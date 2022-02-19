import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

const body = document.body || document.getElementsByTagName("body")[0];
(await GetCollection("Levels")).forEach(async (level) => {
	const data = level.data();
	body.appendChild(document.createElement("br"));
	body.appendChild(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	const heading = document.createElement("h2");
	heading.textContent = data.levelName;
	div.appendChild(heading);
	const author = document.createElement("p");
	author.textContent = "Created by: " + data.author;
	div.appendChild(author);
	const levelDisplay = document.createElement("canvas");
	levelDisplay.width = data.levelData[0].length * 10;
	levelDisplay.height = data.levelData.length * 10;
	const ctx = levelDisplay.getContext("2d");
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, levelDisplay.width, levelDisplay.height);
	ctx.beginPath();
	for (let y = 0; y <= data.levelData.length; y++) {
		ctx.moveTo(0, y * 10);
		ctx.lineTo(levelDisplay.width, y * 10);
	}
	for (let x = 0; x <= data.levelData[0].length; x++) {
		ctx.moveTo(x * 10, 0);
		ctx.lineTo(x * 10, levelDisplay.height);
	}
	ctx.stroke();
	ctx.closePath();
	for (let y = 0; y < data.levelData.length; y++) {
		for (let x = 0; x < data.levelData[y].length; x++) {
			if (data.levelData[y][x] === "#") {
				ctx.fillStyle = "#000000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (data.levelData[y][x] === "@") {
				ctx.fillStyle = "#0000ff";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (data.levelData[y][x] === "*") {
				ctx.fillStyle = "#008000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			}
		}
	}
	div.appendChild(levelDisplay);
	body.appendChild(div);
});
