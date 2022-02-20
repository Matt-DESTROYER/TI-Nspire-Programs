import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

const programsContainer = document.getElementById("programs");
let programs = [];
(await GetCollection("Programs")).forEach((program) => programs.push(program.data()));
programs.sort((a, b) => a.date < b.date ? -1 : 1);
programs.forEach(async (program) => {
	programsContainer.appendChild(document.createElement("br"));
	programsContainer.appendChild(document.createElement("br"));
	const div = document.createElement("div");
	programsContainer.appendChild(div);
	const header = document.createElement("h2");
	header.textContent = program.title + "" + program.version;
	div.appendChild(header);
	const description = document.createElement("p");
	description.textContent = program.description;
	div.appendChild(description);
	const link = documnet.createElement("a");
	link.href = program.file;
	const button = document.createElement("button");
	button.textContent = "Download";
	link.appendChild(button);
	div.appendChild(link);
	programsContainer.appendChild(div);
});
