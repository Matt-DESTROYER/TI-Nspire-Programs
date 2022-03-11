import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function GetDocument(collectionName, documentName) {
	try {
		return await getDoc(doc(db, collectionName, documentName));
	} catch (err) {
		return err;
	}
}

async function UpdateDocument(collectionName, documentName, object) {
	try {
		await updateDoc(doc(db, collectionName, documentName), object);
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
sortSelect.addEventListener("change", renderPrograms);
const programsContainer = document.getElementById("programs"), programs = [];
(async function () {
	(await GetCollection("Programs")).forEach((program) => {
		const data = program.data();
		data.id = program.id;
		programs.push(data);
	});
	renderPrograms();
})();

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
		default:
			programs.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
	}
	for (const program in programs) {
		programsContainer.appendChild(document.createElement("br"));
		const div = document.createElement("div");
		div.classList.add("program-container");
		programsContainer.appendChild(div);
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
			heading.appendChild(editButton);
			const voteCounter = document.createElement("span");
			voteCounter.textContent = program.votes;
			heading.appendChild(voteCounter);
			const upvoteButton = document.createElement("button");
			const _votes = (await GetDocument("Accounts", program.id)).data().votes;
			let id = null;
			(await GetCollection("Accounts")).forEach((account) => {
				const data = account.data();
				if (data.username === localStorage.getItem("username") &&
				    data.password === localStorage.getItem("password")) {
					id = account.id;
				}
			});
			upvoteButton.addEventListener(async () => {
				const votes = (await GetDocument("Accounts", id)).data().votes;
				let updateVote = false;
				for (let i = 0; i < votes.length; i++) {
					if (votes[i][0] === program.title && votes[i][1] === program.author) {
						const prevVote = votes[i][2];
						updateVote = true;
						votes[i][2] = 1;
						await UpdateDocument("Accounts", id, {
							"votes": votes
						});
						await UpdateDocument("Programs", program.id, {
							"votes": _votes + (prevVote === 1 ? 0 : 2)
						});
						break;
					}
				}
				if (!updateVote) {
					votes.push([ program.title, program.author, 1 ]);
					await UpdateDocument("Accounts", id, {
						"votes": votes
					});
					await UpdateDocument("Programs", program.id, {
						"votes": _votes + 1
					});
				}
				voteCounter.textContent = (await GetDocument("Programs", program.id)).data().votes;
			});
			upvoteButton.classList.add("right-align");
			upvoteButton.textContent = "Upvote";
			heading.appendChild(upvoteButton);
			const downvoteButton = document.createElement("button");
			downvoteButton.addEventListener(async () => {
				const votes = (await GetDocument("Accounts", id)).data().votes;
				let updateVote = false;
				for (let i = 0; i < votes.length; i++) {
					if (votes[i][0] === program.title && votes[i][1] === program.author) {
						const prevVote = votes[i][2];
						updateVote = true;
						votes[i][2] = -1;
						await UpdateDocument("Accounts", id, {
							"votes": votes
						});
						await UpdateDocument("Programs", program.id, {
							"votes": _votes - (prevVote === -1 ? 0 : 2)
						});
						break;
					}
				}
				if (!updateVote) {
					votes.push([ program.title, program.author, -1 ]);
					await UpdateDocument("Accounts", id, {
						"votes": votes
					});
					await UpdateDocument("Programs", program.id, {
						"votes": _votes - 1
					});
				}
				voteCounter.textContent = (await GetDocument("Programs", program.id)).data().votes;
			});
			downvoteButton.classList.add("right-align");
			downvoteButton.textContent = "Downvote";
			heading.appendChild(downvoteButton);
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
		programsContainer.appendChild(document.createElement("br"));
	});
}
