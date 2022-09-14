import { GetDocument, GetCollection, CreateDocument, UpdateDocument, UploadFile, DeleteFile } from "../Modules/Database.js";
import { Redirect, Account, nav } from "../Modules/Tools.js";
import { SearchParameters } from "../Modules/SearchParameters.js";

if (Account) {
	nav("Logout", "Logout");
} else {
	Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs");
}

const title = document.getElementById("title"),
	version = document.getElementById("version"),
	description = document.getElementById("description"),
	file = document.getElementById("file"),
	screenshots = document.getElementById("screenshots"),
	screenshotInputs = [];

let searchParams = null;
const program = (async function loadProgram() {
	if ("location" in window && "href" in window.location) {
		searchParams = new SearchParameters(window.location.href);
		const id = searchParams.getParam("id");
		if (id) {
			const program = (await GetDocument("Programs", id)).data();
			title.value = program.title;
			version.value = program.version;
			description.value = program.description;
			return program;
		}
	}
	return null;;
})();

document.getElementById("add-screenshot").addEventListener("click", () => {
	const br = document.createElement("br");
	screenshots.append(br);
	const screenshotInput = document.createElement("input");
	screenshotInput.setAttribute("type", "file");
	screenshotInput.setAttribute("accept", "image/*");
	screenshotInputs.push(screenshotInput);
	screenshots.append(screenshotInput);
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	screenshots.append(deleteButton);
	deleteButton.addEventListener("click", function () {
		screenshots.removeChild(br);
		screenshots.removeChild(screenshotInput);
		screenshots.removeChild(deleteButton);
		screenshotInputs.splice(screenshotInputs.indexOf(screenshotInput), 1);
	});
});

const errormessage = document.getElementById("error-message");

function err(message = "An unexpected error occurred.") {
	errormessage.textContent = "Error: " + message;
	errormessage.hidden = false;
}

document.getElementById("upload").addEventListener("click", async function () {
	errormessage.hidden = true;
	if (title.value.trim() === "") {
		err("No title.");
	} else if (title.value.trim().includes(",")) {
		err("Title may not contain commas (\",\").");
	} else if (title.value.length > 100) {
		err("Title too long.");
	} else if (version.value.trim() === "") {
		err("No version.");
	} else if (version.value.length > 100) {
		err("Version too long.");
	} else if (description.value.trim() === "") {
		err("No description.");
	} else if (description.length > 5000) {
		err("Description too long.");
	} else if (!file.files || !file.files[0]) {
		err("No file uploaded.");
	} else {
		let screenshotFiles = [];
		if (screenshotInputs.length > 0) {
			screenshotFiles = screenshotInputs.filter(function (input) {
				return "files" in input && input.files[0];
			}).map(function (input) {
				return input.files[0];
			});
		}
		await UploadFile(file.files[0], atob(Account.username) + "/" + title.value);
		if (program) {
			await DeleteFile(atob(Account.username) + "/" + title.value + "/" + data.file);
			for (let i = 0; i < program.screenshots.length; i++) {
				await DeleteFile(atob(Account.username) + "/" + title.value + "/Screenshots/" + program.screenshots[i]);
			}
			await UpdateDocument("Programs", program.id, {
				"title": title.value,
				"version": version.value,
				"description": description.value,
				"lastUpdated": Date.now(),
				"file": file.files[0].name,
				"screenshots": screenshotFiles.map(function (file) {
					return file.name;
				})
			});
			for (let i = 0; i < screenshotFiles.length; i++) {
				await UploadFile(screenshotFiles[i], atob(Account.username) + "/" + title.value + "/Screenshots");
			}
			Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs");
		} else {
			await CreateDocument("Programs", {
				"title": title.value,
				"version": version.value,
				"author": atob(Account.username),
				"description": description.value,
				"dateCreated": Date.now(),
				"lastUpdated": Date.now(),
				"file": file.files[0].name,
				"screenshots": screenshotFiles.map(function (file) {
					return file.name;
				}),
				"votes": 0
			});
			for (const image of screenshotFiles) {
				await UploadFile(image, atob(window.localStorage.getItem("username")) + "/" + title.value + "/Screenshots");
			}
		}
		Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs/");
	}
});