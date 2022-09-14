import { GetCollection, GetDocument, UpdateDocument, GetFileURL } from "./Modules/Database.js";
import { Redirect, Account, nav } from "./Modules/Tools.js";

if (Account) {
	nav("Upload Program", "Upload-Program", "Maze Escape Level Editor", "Maze-Escape-Level-Editor", "Logout", "Logout");
} else {
	nav("Login", "Login", "Create Account", "Create-Account");
}

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("input", renderPrograms);
const programsContainer = document.getElementById("programs"), programs = [];
(async function () {
	const _programs = (await GetCollection("Programs"));
	_programs.forEach(async function (program) {
		const data = program.data();
		data.id = program.id;
		data.file = await GetFileURL(data.author + "/" + data.title, data.file);
		const screenshots = data.screenshots;
		data.screenshots = [];
		for (let i = 0; i < screenshots.length; i++) {
			data.screenshots.push(await GetFileURL(data.author + "/" + data.title + "/Screenshots", screenshots[i]));
		}
		programs.push(data);
		await renderProgram(data);
	});
})();

async function renderProgram(program) {
	programsContainer.append(document.createElement("br"));
	const div = document.createElement("div");
	div.classList.add("program-container");
	programsContainer.append(div);
	const heading = document.createElement("div");
	if (Account) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("right-align");
		editButton.addEventListener("click", function () {
			Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs/Upload-Program/?id=" + program.id);
		});
		heading.append(editButton);
		heading.append(document.createElement("br"));
		heading.append(document.createElement("br"));
		heading.append(document.createElement("br"));
		const voteCounter = document.createElement("span");
		voteCounter.classList.add("right-align");
		voteCounter.classList.add("vote-counter");
		voteCounter.textContent = program.upvoters.length - program.downvoters.length;
		const upvoteButton = document.createElement("button");
		upvoteButton.addEventListener("click", async function () {
			const prog = (await GetDocument("Programs", program.id)).data();
			prog.id = program.id;
			if (prog.upvoters.includes(Account.username)) {
				return;
			}
			const acc = (await GetDocument("Accounts", Account.id)).data();
			acc.id = Account.id;
			let downIdx = prog.downvoters.indexOf(acc.username);
			if (downIdx !== -1) {
				prog.downvoters.splice(downIdx, 1);
				acc["prog-votes-dir"][acc["prog-votes-id"].indexOf(prog.id)] = 1;
			}
			prog.upvoters.push(acc.username);
			if (!acc["prog-votes-id"].includes(prog.id)) {
				acc["prog-votes-id"].push(prog.id);
				acc["prog-votes-dir"].push(1);
			}
			await UpdateDocument("Programs", prog.id, {
				"upvoters": prog.upvoters,
				"downvoters": prog.downvoters
			});
			await UpdateDocument("Accounts", acc.id, {
				"prog-votes-id": acc["prog-votes-id"],
				"prog-votes-dir": acc["prog-votes-dir"]
			});
			voteCounter.textContent = prog.upvoters.length - prog.downvoters.length;
		});
		upvoteButton.classList.add("right-align");
		upvoteButton.textContent = "Upvote";
		const downvoteButton = document.createElement("button");
		downvoteButton.addEventListener("click", async function () {
			const prog = (await GetDocument("Programs", program.id)).data();
			prog.id = program.id;
			if (prog.downvoters.includes(Account.username)) {
				return;
			}
			const acc = (await GetDocument("Accounts", Account.id)).data();
			acc.id = Account.id;
			let upIdx = prog.upvoters.indexOf(acc.username);
			if (upIdx !== -1) {
				prog.upvoters.splice(upIdx, 1);
				acc["prog-votes-dir"][acc["prog-votes-id"].indexOf(prog.id)] = -1;
			}
			prog.downvoters.push(acc.username);
			if (!acc["prog-votes-id"].includes(prog.id)) {
				acc["prog-votes-id"].push(prog.id);
				acc["prog-votes-dir"].push(-1);
			}
			await UpdateDocument("Programs", prog.id, {
				"upvoters": prog.upvoters,
				"downvoters": prog.downvoters
			});
			await UpdateDocument("Accounts", acc.id, {
				"prog-votes-id": acc["prog-votes-id"],
				"prog-votes-dir": acc["prog-votes-dir"]
			});
			voteCounter.textContent = prog.upvoters.length - prog.downvoters.length;
		});
		downvoteButton.classList.add("right-align");
		downvoteButton.textContent = "Downvote";
		heading.append(voteCounter);
		heading.append(downvoteButton);
		heading.append(upvoteButton);
	}
	const header = document.createElement("h2");
	header.textContent = program.title + " - " + program.version;
	heading.append(header);
	div.append(heading);
	const author = document.createElement("p");
	author.textContent = "Published by: " + program.author;
	div.append(author);
	const screenshots = document.createElement("div");
	screenshots.classList.add("screenshots");
	for (let i = 0; i < program.screenshots.length; i++) {
		const screenshot = document.createElement("img");
		screenshot.src = program.screenshots[i];
		screenshot.height = 120;
		screenshots.append(screenshot);
	}
	div.append(screenshots);
	const description = document.createElement("p");
	description.textContent = program.description;
	div.append(description);
	const link = document.createElement("a");
	link.download = program.title;
	link.href = program.file;
	const button = document.createElement("button");
	button.textContent = "Download";
	link.append(button);
	div.append(link);
	programsContainer.append(div);
	programsContainer.append(document.createElement("br"));
}

async function renderPrograms() {
	while (programsContainer.firstChild) {
		programsContainer.removeChild(programsContainer.lastChild);
	}
	switch (sortSelect.value) {
		case "newest-oldest":
			programs.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
		case "oldest-newest":
			programs.sort((a, b) => a.date > b.date ? 1 : -1);
			break;
		case "top-voted":
			programs.sort((a, b) => a.votes < b.votes ? 1 : -1);
			break;
		case "bottom-voted":
			programs.sort((a, b) => a.votes > b.votes ? 1 : -1);
			break;
		default:
			programs.sort((a, b) => a.votes < b.votes ? 1 : -1);
			break;
	}
	for (const program of programs) {
		await renderProgram(program);
	}
}
