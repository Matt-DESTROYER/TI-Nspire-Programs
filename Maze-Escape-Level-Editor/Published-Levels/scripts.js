import { GetCollection } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Modules/Database.js";
import { Redirect, Account, nav } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Modules/Tools.js";

if (Account) {
	nav("Level Editor", "Maze-Escape-Level-Editor", "Logout", "Logout");
} else {
	nav("Login", "Login", "Create Account", "Create-Account");
}

const levelContainer = document.getElementById("levels");
let levels = [];
(await GetCollection("Levels")).forEach(function (level) {
	const data = level.data();
	data.id = level.id;
	data.levelData = JSON.parse(data.levelData);
	levels.push(data);
});
levels.sort(function (a, b) {
	return a.date < b.date ? 1 : -1;
});
for (const level of levels) {
	levelContainer.append(document.createElement("br"));
	levelContainer.append(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	const heading = document.createElement("div");
	const ingame = document.createElement("span");
	ingame.textContent = "In game: " + (level["in-game"] ? "✔️" : "❌");
	ingame.classList.add("right-align");
	div.append(ingame);
	if (Account && btoa(level.author) === Account.username) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("right-align");
		editButton.classList.add("edit-button");
		editButton.addEventListener("click", function () {
			Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs/Maze-Escape-Level-Editor/?id=" + level.id);
		});
		heading.append(editButton);
	}
	const header = document.createElement("h2");
	header.textContent = level.levelName;
	heading.append(header);
	div.append(heading);
	const author = document.createElement("p");
	author.textContent = "Created by: " + level.author;
	div.append(author);
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
	div.append(levelDisplay);
	levelContainer.append(div);
}
