import { GetCollection, GetDocument, UpdateDocument, GetFileURL } from "./Modules/Database.js";

let loggedIn = false, id;
(async function () {
	(await GetCollection("Accounts")).forEach((account) => {
		const data = account.data();
		if (localStorage.getItem("username") === data.username &&
			localStorage.getItem("password") === data.password) {
			loggedIn = true;
			id = account.id;
		}
	});
})();

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("input", renderPrograms);
const programsContainer = document.getElementById("programs"), programs = [];
(async function () {
	const _programs = (await GetCollection("Programs"));
	_programs.forEach(async (program) => {
		const data = program.data();
		data.id = program.id;
		data.file = await GetFileURL(data.author + "/" + data.title, data.file);
		const screenshots = data.screenshots;
		data.screenshots = [];
		for (const screenshot of screenshots) {
			data.screenshots.push(await GetFileURL(data.author + "/" + data.title + "/Screenshots", screenshot));
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
	if (loggedIn) {
		const editButton = document.createElement("button");
		editButton.textContent = "Edit";
		editButton.classList.add("right-align");
		editButton.addEventListener("click", () => {
			localStorage.setItem("title", program.title);
			localStorage.setItem("version", program.version);
			localStorage.setItem("description", program.description);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Upload-Program/";
		});
		heading.append(editButton);
		heading.append(document.createElement("br"));
		heading.append(document.createElement("br"));
		heading.append(document.createElement("br"));
		const voteCounter = document.createElement("span");
		voteCounter.classList.add("right-align");
		voteCounter.textContent = program.votes;
		const upvoteButton = document.createElement("button");
		upvoteButton.addEventListener("click", async () => {
			const votes = (await GetDocument("Accounts", id)).data().votes;
			let _votes = (await GetDocument("Programs", program.id)).data().votes,
				updateVote = false;
			for (let i = 0; i < votes.length; i++) {
				const vote = votes[i].split(",");
				if (vote[0] === program.id) {
					if (vote[1] == 1) {
						updateVote = true;
						break;
					}
					votes[i] = vote[0] + "," + 1;
					await UpdateDocument("Accounts", id, {
						"votes": votes
					});
					_votes += 2;
					await UpdateDocument("Programs", program.id, {
						"votes": _votes
					});
					updateVote = true;
					break;
				}
			}
			if (!updateVote) {
				votes.push(program.title + "," + program.author + ",1");
				await UpdateDocument("Accounts", id, {
					"votes": votes
				});
				_votes++;
				await UpdateDocument("Programs", program.id, {
					"votes": _votes
				});
			}
			program.votes = _votes;
			voteCounter.textContent = _votes;
		});
		upvoteButton.classList.add("right-align");
		upvoteButton.textContent = "Upvote";
		const downvoteButton = document.createElement("button");
		downvoteButton.addEventListener("click", async () => {
			const votes = (await GetDocument("Accounts", id)).data().votes;
			let _votes = (await GetDocument("Programs", program.id)).data().votes,
				updateVote = false;
			for (let i = 0; i < votes.length; i++) {
				const vote = votes[i].split(",");
				if (vote[0] === program.id) {
					if (vote[1] == -1) {
						updateVote = true;
						break;
					}
					votes[i] = vote[0] + "," + "-1";
					await UpdateDocument("Accounts", id, {
						"votes": votes
					});
					_votes -= 2;
					await UpdateDocument("Programs", program.id, {
						"votes": _votes
					});
					updateVote = true;
					break;
				}
			}
			if (!updateVote) {
				votes.push(program.title + "," + program.author + ",-1");
				await UpdateDocument("Accounts", id, {
					"votes": votes
				});
				_votes--;
				await UpdateDocument("Programs", program.id, {
					"votes": _votes
				});
			}
			program.votes = _votes;
			voteCounter.textContent = _votes;
		});
		downvoteButton.classList.add("right-align");
		downvoteButton.textContent = "Downvote";
		heading.append(downvoteButton);
		heading.append(upvoteButton);
		heading.append(voteCounter);
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
