import { GetCollection } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Database.mjs";

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
(await GetCollection("Levels")).forEach((level) => {
	const data = level.data();
	data.id = level.id;
	levels.push(data);
});
levels.sort((a, b) => a.date < b.date ? 1 : -1);
for (const level of levels) {
	levelContainer.appendChild(document.createElement("br"));
	levelContainer.appendChild(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	const heading = document.createElement("div");
	if (loggedIn) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("right-align");
		editButton.classList.add("edit-button");
		editButton.addEventListener("click", () => {
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Maze-Escape-Level-Editor/?id=" + level.id;
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
}
