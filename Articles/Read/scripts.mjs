import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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

async function GetDocument(collectionName, documentName) {
	try {
		const snap = await getDoc(doc(db, collectionName, documentName));
		if (snap.exists()) {
			return snap;
		} else {
			throw new Error("Document does not exist.");
		}
	} catch (err) {
		return err;
	}
}

let loggedIn = false;
(async function() {
	(await GetCollection("Accounts")).forEach((account) => {
		const data = account.data();
		if (localStorage.getItem("username") === data.username &&
		    localStorage.getItem("password") === data.password) {
			loggedIn = true;
		}
	});
})();

// BASIC Markdown: https://github.com/Matt-DESTROYER/CDN/tree/main/JS/Markdown
const Markdown=(function(){const e=/<\/?[a-zA-Z]+?.*?>/g;return function(n){n=n.replace(e,"");let t,r="";for(let e=0;e<n.length;e++)switch(n[e]){case"*":-1!==(t=n.indexOf("*",e+1))&&(-1===n.indexOf("\n",e+1)||n.indexOf("\n",e+1)>t)?(r+="<strong>"+n.substr(e+1,t-e-1)+"</strong>",e=t):r+=n[e];break;case"_":-1!==(t=n.indexOf("_",e+1))&&(-1===n.indexOf("\n",e+1)||n.indexOf("\n",e+1)>t)?(r+="<em>"+n.substr(e+1,t-e-1)+"</em>",e=t):r+=n[e];break;case"`":n[e+1]+n[e+2]==="``"?-1!==(t=n.indexOf("```",e+1))&&(r+="<code>"+t.substr(e+3,t-e-3)+"</code>"):-1!==(t=n.indexOf("`",e+1))?(r+="<code>"+n.substr(e+1,t-e-1)+"</code>",e=t):r+=n[e];break;default:r+=n[e]}return r}})();

let article_id;
if (localStorage.getItem("article_id")) {
	article_id = localStorage.getItem("article_id");
	localStorage.removeItem("article_id");
} else {
	location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/";
}

const article = (await GetDocument("Articles", article_id)).data();

const articlesContainer = document.getElementById("article");
const div = document.createElement("div");
div.classList.add("generic-container");
articlesContainer.appendChild(div);
const heading = document.createElement("div");
if (loggedIn) {
	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.classList.add("edit-button");
	editButton.addEventListener("click", () => {
		localStorage.setItem("title", article.title);
		localStorage.setItem("description", article.description);
		localStorage.setItem("content", article.content);
		location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/Post/";
	});
	heading.appendChild(editButton);
}
const header = document.createElement("h2");
header.textContent = article.title;
heading.appendChild(header);
div.appendChild(heading);
const author = document.createElement("p");
author.textContent = "Published by: " + article.author;
div.appendChild(author);
const content = document.createElement("p");
content.innerHTML = Markdown(article.content);
div.appendChild(content);
articlesContainer.appendChild(div);
