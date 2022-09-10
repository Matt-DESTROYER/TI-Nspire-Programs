import { GetCollection, CreateDocument, UpdateDocument } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Database.js";

const title = document.getElementById("title"),
      description = document.getElementById("description"),
      content = document.getElementById("content");

{
	if (localStorage.getItem("title")) {
		title.value = localStorage.getItem("title");
		localStorage.removeItem("title");
	}
	if (localStorage.getItem("description")) {
		description.value = localStorage.getItem("description");
		localStorage.removeItem("description");
	}
	if (localStorage.getItem("content")) {
		content.value = localStorage.getItem("content");
		localStorage.removeItem("content");
	}
}

const errormessage = document.getElementById("error-message");
document.getElementById("post").addEventListener("click", async () => {
	if (!localStorage.getItem("username") ||
	    !localStorage.getItem("password")) {
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
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/";
	}
});
