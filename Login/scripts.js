import { GetCollection } from "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/Database.js";

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
		let accountData = {};
		(await GetCollection("Accounts")).forEach((account) => {
			const data = account.data();
			if (usernameInput.value.trim() === atob(data.username)) {
				accountData = data;
			}
		});
		if (!accountData.hasOwnProperty("username")) {
			errormessage.innerHTML = "Error: No user was found with this username.";
			errormessage.hidden = false;
		} else if (passwordInput.value.trim() === atob(accountData.password)) {
			localStorage.setItem("username", accountData.username);
			localStorage.setItem("password", accountData.password);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		} else {
			errormessage.innerHTML = "Error: Incorrect password.";
			errormessage.hidden = false;
		}
	}
});
