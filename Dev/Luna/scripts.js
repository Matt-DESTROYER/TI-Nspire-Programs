import { Redirect, Account, nav } from "../../Modules/Tools.js";

if (Account) {
	nav("Upload Program", "Upload-Program", "Maze Escape Level Editor", "Maze-Escape-Level-Editor", "Logout", "Logout");
} else {
	nav("Login", "Login", "Create Account", "Create-Account");
}