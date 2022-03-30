import { GetCollection, CreateDocument, UpdateDocument } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Database.mjs";

const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d", { alpha: false });

canvas.width = 320;
canvas.height = 240;

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
	const rect = canvas.getBoundingClientRect();
	Input.mouseX = e.clientX - rect.left;
	Input.mouseY = e.clientY - rect.top;
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

const levelnameInput = document.getElementById("level-name"),
      errormessage = document.getElementById("error-message");
let name = null;

{
	if (localStorage.getItem("name")) {
		levelnameInput.value = name =  localStorage.getItem("name");
		localStorage.removeItem("name");
	}
	if (localStorage.getItem("data")) {
		grid = localStorage.getItem("data").split(",").map((row) => row.split(""));
		localStorage.removeItem("data");
	}
}

document.getElementById("generate").addEventListener("click", async () => {
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
	let playerSpawns = 0, levelFinishes = 0;
	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[y].length; x++) {
			if (grid[y][x] === "@") {
				playerSpawns++;
			} else if (grid[y][x] === "*") {
				levelFinishes++;
			}
		}
	}
	errormessage.hidden = true;
	if (playerSpawns === 0) {
		errormessage.textContent = "Error: Level invalid: no player spawn.";
		errormessage.hidden = false;
	} else if (levelFinishes === 0) {
		errormessage.textContent = "Error: Level invalid: no level finish.";
		errormessage.hidden = false;
	} else if (playerSpawns > 1) {
		errormessage.textContent = "Error: Level invalid: too many player spawns.";
		errormessage.hidden = false;
	} else if (levelnameInput.value.trim() === "") {
		errormessage.textContent = "Error: A level name is required.";
		errormessage.hidden = false;
	} else {
		let updateLevel = false, id;
		(await GetCollection("Levels")).forEach((level) => {
			const data = level.data();
			if (data.levelName === name ? name : levelnameInput.value.trim() &&
			    data.author === atob(localStorage.getItem("username"))) {
				updateLevel = true;
				id = level.id;
			}
		});
		if (updateLevel) {
			await UpdateDocument("Levels", id, {
				"levelName": levelnameInput.value,
				"date": Date.now(),
				"levelData": grid.map((row) => row.join(""))
			});
		} else {
			await CreateDocument("Levels", null, {
				"levelName": levelnameInput.value,
				"author": atob(localStorage.getItem("username")),
				"date": Date.now(),
				"levelData": grid.map((row) => row.join(""))
			});
		}
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Maze-Escape-Level-Editor/Published-Levels/";
	}
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
