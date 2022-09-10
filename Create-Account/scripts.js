import { GetCollection, CreateDocument } from "../Modules/Database.js";

const firstnameInput = document.getElementById("firstname"),
	lastnameInput = document.getElementById("lastname"),
	usernameInput = document.getElementById("username"),
	passwordInput = document.getElementById("password"),
	confirmpasswordInput = document.getElementById("confirm-password"),
	errormessage = document.getElementById("error-message");

document.getElementById("create-account").addEventListener("click", async () => {
	errormessage.hidden = true;
	if (firstnameInput.value.trim() === "") {
		errormessage.textContent = "Error: A firstname is required.";
		errormessage.hidden = false;
	} else if (firstnameInput.value.trim().length > 50) {
		errormessage.textContent = "Error: Firstname too long";
		errormessage.hidden = false;
	} else if (lastnameInput.value.trim() === "") {
		errormessage.textContent = "Error: A lastname is required.";
		errormessage.hidden = false;
	} else if (lastnameInput.value.trim().length > 50) {
		errormessage.textContent = "Error: Lastname too long.";
		errormessage.hidden = false;
	} else if (usernameInput.value.trim() === "") {
		errormessage.textContent = "Error: A username is required.";
		errormessage.hidden = false;
	} else if (usernameInput.value.trim().length > 50) {
		errormessage.textContent = "Error: Username too long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim() === "") {
		errormessage.textContent = "Error: A password is required.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim().length < 8) {
		errormessage.textContent = "Error: Password must be at least 8 characters long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim().length > 50) {
		errormessage.textContent = "Error: Password too long.";
		errormessage.hidden = false;
	} else if (passwordInput.value.trim() !== confirmpasswordInput.value.trim()) {
		errormessage.textContent = "Error: Passwords do not match.";
		errormessage.hidden = false;
	} else {
		let accountExists = false;
		(await GetCollection("Accounts")).forEach(function (account) {
			const data = account.data();
			if (usernameInput.value.trim() === data.username) {
				accountExists = true;
			}
		});
		if (accountExists) {
			errormessage.textContent = "Error: An account with this username already exists, if this is your account please <a href=\"https://matt-destroyer.github.io/TI-Nspire-Programs/Login/\">login</a>.";
			errormessage.hidden = false;
		} else {
			await CreateDocument("Accounts", {
				"firstname": btoa(firstnameInput.value.trim()),
				"lastname": btoa(lastnameInput.value.trim()),
				"username": btoa(usernameInput.value.trim()),
				"password": btoa(passwordInput.value.trim()),
				"votes": []
			});
			localStorage.setItem("username", btoa(usernameInput.value.trim()));
			localStorage.setItem("password", btoa(passwordInput.value.trim()));
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/";
		}
	}
});
