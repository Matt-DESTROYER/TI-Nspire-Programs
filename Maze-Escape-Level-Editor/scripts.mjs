import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, doc, addDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

async function GetCollection(collectionName) {
	try {
		return await getDocs(collection(db, collectionName));
	} catch (err) {
		console.log("Error reading from database:", err);
		return err;
	}
}

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d", { alpha: false });

canvas.width = 320;
canvas.height = 240;

canvas.imageSmoothingEnabled = false;
canvas.mozImageSmoothingEnabled = false;
canvas.webkitImageSmoothingEnabled = false;
canvas.msImageSmoothingEnabled = false;

window.onresize = function() {
	canvas.imageSmoothingEnabled = false;
	canvas.mozImageSmoothingEnabled = false;
	canvas.webkitImageSmoothingEnabled = false;
	canvas.msImageSmoothingEnabled = false;
};

const Input = {};

let tool = "#", grid = [];
{
	const row = " ".repeat(32).split("");
	for (let y = 0; y < 24; y++) {
		grid.push(row.slice());
	}
	for (let y = 0; y < 24; y++) {
		for (let x = 0; x < 32; x++) {
			if (y === 0 || y === 23 || x === 0 || x === 31) {
				grid[y][x] = "#";
			}
		}
	}
	grid[1][1] = "@";
	grid[22][30] = "*";
}

canvas.addEventListener("mousemove", (e) => {
	e = e || window.event;
	Input.mouseX = e.layerX;
	Input.mouseY = e.layerY;
});

canvas.addEventListener("mousedown", () => {
	Input.mouseDown = true;
});

canvas.addEventListener("mouseup", () => {
	if (tool === "@") {
		for (let y = 0; y < 24; y++) {
			for (let x = 0; x < 32; x++) {
				if (grid[y][x] === tool) {
					grid[y][x] = " ";
				}
			}
		}
		grid[~~(Input.mouseY / 10)][~~(Input.mouseX / 10)] = tool;
	} else if (tool !== "#") {
		grid[~~(Input.mouseY / 10)][~~(Input.mouseX / 10)] = tool;
	}
	Input.mouseDown = false;
});

document.getElementById("reset").addEventListener("click", function () {
	grid = [];
	const row = " ".repeat(32).split("");
	for (let y = 0; y < 24; y++) {
		grid.push(row.slice());
	}
	for (let y = 0; y < 24; y++) {
		for (let x = 0; x < 32; x++) {
			if (y === 0 || y === 23 || x === 0 || x === 31) {
				grid[y][x] = "#";
			}
		}
	}
	grid[1][1] = "@";
	grid[22][30] = "*";
});

document.getElementById("tool").addEventListener("input", (e) => {
	switch ((e || window.event).target.value) {
		case "Air":
			tool = " ";
			break;
		case "Solid Wall":
			tool = "#";
			break;
		case "Player Spawn":
			tool = "@";
			break;
		case "Level Finish":
			tool = "*";
			break;
		default:
			alert("An unsupported block type was selected...");
			break;
	}
});

document.getElementById("generate").addEventListener("click", async function() {
	const levelData = "{\n" + grid.map((row) => '\t{ "' + row.join("") + '" }').join(",\n") + "\n }";
	let playerSpawns = 0, levelFinishes = 0;
	for (let y = 0; y < 24; y++) {
		for (let x = 0; x < 32; x++) {
			if (grid[y][x] === "@") {
				playerSpawns++;
			} else if (grid[y][x] === "*") {
				levelFinishes++;
			}
		}
	}
	if (playerSpawns === 0) {
		alert("Level invalid: no player spawn!");
	} else if (levelFinishes === 0) {
		alert("Level invalid: no level finish!");
	} else if (playerSpawns > 1) {
		alert("Level invalid: too many player spawns!");
	} else {
		navigator.clipboard.writeText(levelData);
	}
	const levelName = prompt("Enter a name for your level:");
	const author = prompt("Enter your name or a pseudonym/nickname:");
	let alreadyExists = false;
	(await GetCollection("Levels")).forEach(async (level) => {
		const data = level.data();
		console.log(data);
		if (data.levelName === levelName && data.author === author) {
			alreadyExists = true;
		}
	});
	await CreateDocument("Levels", null, {
		"levelName": levelName,
		"author": author,
		"levelData": grid
	});
});

ctx.strokeStyle = "#000000";
function render() {
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	for (let y = 0; y <= 24; y++) {
		ctx.moveTo(0, y * 10);
		ctx.lineTo(canvas.width, y * 10);
	}
	for (let x = 0; x <= 32; x++) {
		ctx.moveTo(x * 10, 0);
		ctx.lineTo(x * 10, canvas.height);
	}
	ctx.stroke();
	ctx.closePath();
	for (let y = 0; y < 24; y++) {
		for (let x = 0; x < 32; x++) {
			if (grid[y][x] === "#") {
				ctx.fillStyle = "#000000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (grid[y][x] === "@") {
				ctx.fillStyle = "#0000ff";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			} else if (grid[y][x] === "*") {
				ctx.fillStyle = "#008000";
				ctx.fillRect(x * 10, y * 10, 10, 10);
			}
		}
	}
}
window.requestAnimationFrame(render);

function update() {
	if (Input.mouseDown) {
		if (tool === "#" || tool === " ") {
			grid[~~(Input.mouseY / 10)][~~(Input.mouseX / 10)] = tool;
		}
	}
	render();
	window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
