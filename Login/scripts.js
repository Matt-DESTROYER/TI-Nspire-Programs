import { GetCollection } from "../Modules/Database.js";
import { nav } from "../Modules/Tools.js";

nav("Create Account", "Create-Account", "Login", "Login");

const usernameInput = document.getElementById("username"),
	passwordInput = document.getElementById("password"),
	errormessage = document.getElementById("error-message");

function err(msg) {
	errormessage.hidden = false;
	errormessage.textContent = "Error: " + msg;
}

document.getElementById("login").addEventListener("click", async () => {
	errormessage.hidden = true;
	if (usernameInput.value.trim() === "") {
		err("No username entered.");
	} else if (usernameInput.value.trim().length > 50) {
		err("No user was found with this username.");
	} else if (passwordInput.value.trim() === "") {
		err("No password entered.");
	} else if (passwordInput.value.trim().length < 8) {
		err("Incorrect password.");
	} else {
		let account = null;
		(await GetCollection("Accounts")).forEach(function (acc) {
			const data = acc.data();
			data.id = acc.id;
			if (btoa(usernameInput.value.trim()) === data.username && btoa(passwordInput.value.trim()) === account.password) {
				account = data;
			}
		});
		if (!account) {
			err("Login failed.");
		} else {
			window.localStorage.setItem("id", account.id);
			window.localStorage.setItem("username", account.username);
			window.localStorage.setItem("password", account.password);
			window.location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		}
	}
});
