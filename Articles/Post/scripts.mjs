import { GetCollection, CreateDocument, UpdateDocument } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Database.js";
import { Redirect, Account, nav } from "../../Modules/Tools.js";

if (Account) {
	nav("Upload Program", "Upload-Program", "Maze Escape Level Editor", "Maze-Escape-Level-Editor", "Logout", "Logout");
} else {
	nav("Login", "Login", "Create Account", "Create-Account");
}

const title = document.getElementById("title"),
      description = document.getElementById("description"),
      content = document.getElementById("content");

{
	if (window.localStorage.getItem("description") && window.localStorage.getItem("content") && window.localStorage.getItem("title")) {
		title.value = window.localStorage.getItem("title");
		description.value = window.localStorage.getItem("description");
		content.value = window.localStorage.getItem("content");
		window.localStorage.removeItem("title");
		window.localStorage.removeItem("description");
		window.localStorage.removeItem("content");
	}
}

const errormessage = document.getElementById("error-message");
document.getElementById("post").addEventListener("click", async () => {
	if (!Account) {
		Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs/Login");
	}
	errormessage.hidden = true;
	if (title.value.trim() === "") {
		errormessage.textContent = "Error: No title.";
		errormessage.hidden = false;
	} else if (title.value.length > 100) {
		errormessage.textContent = "Error: Title too long.";
		errormessage.hidden = false;
	} else if (description.value.trim() === "") {
		errormessage.textContent = "Error: No description.";
		errormessage.hidden = false;
	} else if (description.value.length > 1000) {
		errormessage.textContent = "Error: Description too long.";
		errormessage.hidden = false;
	} else if (content.value.trim() === "") {
		errormessage.textContent = "Error: No content.";
		errormessage.hidden = false;
	} else if (content.length > 25000) {
		errormessage.textContent = "Error: Content too long.";
		errormessage.hidden = false;
	} else {
		let alreadyExists = false, id = null;
		(await GetCollection("Articles")).forEach((program) => {
			const data = program.data();
			if (data.title === title.value) {
				alreadyExists = true;
				id = program.id;
			}
		});
		if (alreadyExists) {
			await UpdateDocument("Articles", id, {
				"description": description.value,
				"content": content.value,
				"date": Date.now()
			});
		} else {
			await CreateDocument("Articles", {
				"title": title.value,
				"author": atob(localStorage.getItem("username")),
				"description": description.value,
				"content": content.value,
				"date": Date.now()
			});
		}
		Redirect("https://matt-destroyer.github.io/TI-Nspire-Programs/Articles");
	}
});
