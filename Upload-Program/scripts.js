import { GetCollection, CreateDocument, UpdateDocument, UploadFile, DeleteFile } from "../Modules/Database.js";
import { Redirect, Account, nav } from "../Modules/Tools.js";

if (Account) {
	nav("Upload Program", "Upload-Program", "Maze Escape Level Editor", "Maze-Escape-Level-Editor", "Logout", "Logout");
} else {
	nav("Create Account", "Create-Account", "Login", "Login");
}

if (!Account) {
	Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs");
}

const title = document.getElementById("title"),
	version = document.getElementById("version"),
	description = document.getElementById("description"),
	file = document.getElementById("file"),
	screenshots = document.getElementById("screenshots"),
	screenshotInputs = [];

{
	if (window.localStorage.getItem("title")) {
		title.value = window.localStorage.getItem("title");
		window.localStorage.removeItem("title");
	}
	if (window.localStorage.getItem("version")) {
		version.value = window.localStorage.getItem("version");
		window.localStorage.removeItem("version");
	}
	if (window.localStorage.getItem("description")) {
		description.value = window.localStorage.getItem("description");
		window.localStorage.removeItem("description");
	}
}

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
	deleteButton.addEventListener("click", () => {
		screenshots.removeChild(br);
		screenshots.removeChild(screenshotInput);
		screenshots.removeChild(deleteButton);
		screenshotInputs.splice(screenshotInputs.indexOf(screenshotInput), 1);
	});
});

const errormessage = document.getElementById("error-message");
document.getElementById("upload").addEventListener("click", async () => {
	if (!window.localStorage.getItem("username") ||
		!window.localStorage.getItem("password")) {
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Login/";
	} else {
		let loggedIn = false;
		(await GetCollection("Accounts")).forEach((account) => {
			const data = account.data();
			if (window.localStorage.getItem("username") === data.username &&
				window.localStorage.getItem("password") === data.password) {
				loggedIn = true;
			}
		});
		if (!loggedIn) {
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Login/";
		}
	}
	errormessage.hidden = true;
	if (title.value.trim() === "") {
		errormessage.textContent = "Error: No title.";
		errormessage.hidden = false;
	} else if (/,/.test(title.value.trim())) {
		errormessage.textContent = "Error: Title may not contain commas (\",\").";
		errormessage.hidden = false;
	} else if (title.value.length > 100) {
		errormessage.textContent = "Error: Title too long.";
		errormessage.hidden = false;
	} else if (version.value.trim() === "") {
		errormessage.textContent = "Error: No version.";
		errormessage.hidden = false;
	} else if (version.value.length > 100) {
		errormessage.textContent = "Error: Version too long.";
		errormessage.hidden = false;
	} else if (description.value.trim() === "") {
		errormessage.textContent = "Error: No description.";
		errormessage.hidden = false;
	} else if (description.length > 10000) {
		errormessage.textContent = "Error: Description too long.";
		errormessage.hidden = false;
	} else if (!file.files || !file.files[0]) {
		errormessage.textContent = "Error: No file uploaded.";
		errormessage.hidden = false;
	} else {
		let alreadyExists = false, data;
		(await GetCollection("Programs")).forEach((program) => {
			data = program.data();
			if (data.title === title.value) {
				alreadyExists = true;
				data.id = program.id;
			}
		});
		let screenshotFiles = [];
		if (screenshotInputs.length > 0) {
			screenshotFiles = screenshotInputs.filter((input) => "files" in input && input.files[0]).map((input) => input.files[0]);
		}
		await UploadFile(file.files[0], atob(window.localStorage.getItem("username")) + "/" + title.value);
		if (alreadyExists) {
			await DeleteFile(atob(window.localStorage.getItem("username")) + "/" + title.value + "/" + data.file);
			for (const screenshot of data.screenshots) {
				await DeleteFile(atob(window.localStorage.getItem("username")) + "/" + title.value + "/Screenshots/" + screenshot);
			}
			await UpdateDocument("Programs", data.id, {
				"version": version.value,
				"description": description.value,
				"date": Date.now(),
				"file": file.files[0].name,
				"screenshots": screenshotFiles.map((file) => file.name)
			});
			for (const image of screenshotFiles) {
				await UploadFile(image, atob(window.localStorage.getItem("username")) + "/" + title.value + "/Screenshots");
			}
		} else {
			await CreateDocument("Programs", {
				"title": title.value,
				"version": version.value,
				"author": atob(window.localStorage.getItem("username")),
				"description": description.value,
				"date": Date.now(),
				"file": file.files[0].name,
				"screenshots": screenshotFiles.map((file) => file.name),
				"votes": 0
			});
			for (const image of screenshotFiles) {
				await UploadFile(image, atob(window.localStorage.getItem("username")) + "/" + title.value + "/Screenshots");
			}
		}
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
	}
});
