import { GetCollection } from "../Modules/Database.js";

const usernameInput = document.getElementById("username"),
	passwordInput = document.getElementById("password"),
	errormessage = document.getElementById("error-message");

document.getElementById("login").addEventListener("click", async () => {
	errormessage.hidden = true;
	if (usernameInput.value.trim() === "") {
		errormessage.innerHTML = "Error: No username entered.";
		errormessage.hidden = false;
	} else if (usernameInput.value.trim().length > 50) {
		errormessage.innerHTML = "Error: No user was found with this username.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim() === "") {
		errormessage.innerHTML = "Error: No password entered.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim().length < 8) {
		errormessage.innerHTML = "Error: Incorrect password.";
		errormessage.hidden = false;
	} else {
		let accountData = null;
		(await GetCollection("Accounts")).forEach(function (account) {
			const data = account.data();
			data.id = account.id;
			if (usernameInput.value.trim() === atob(data.username) && passwordInput.value.trim() === atob(account.password)) {
				accountData = data;
			}
		});
		if (!accountData) {
			errormessage.innerHTML = "Error: Login failed.";
			errormessage.hidden = false;
		} else {
			window.localStorage.setItem("id", account.id);
			window.localStorage.setItem("username", account.username);
			window.localStorage.setItem("password", account.password);
			window.location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		}
	}
});
