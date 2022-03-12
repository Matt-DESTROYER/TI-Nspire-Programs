import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

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
const Markdown=(function(){const e={lua:["and","break","do","else","elseif","end","for","function","if","in","local","nil","not","or","repeat","return","then","until","while"]},t=/<\/?[a-zA-Z]+?.*?>/g,s=function(){const e=/(\d+\.\d+e\d*|\.\d+e\d*|\d+e\d*)|\d+\.\d+|\.\d+|\d+/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(t){return"number"==typeof t||"string"==typeof t&&e.test(t)},closeGrouper:function(e){return this.settings.groupers.includes(e)?this.settings.groupers[this.settings.groupers.indexOf(e)+1]:null},tokenType:function(e){return this.settings.operators.includes(e)?"operator":this.settings.separators.includes(e)?"separator":this.settings.groupers.includes(e)?"grouper":"other"},parseString:function(e){if("string"!=typeof e){if(null===e)return"null";e="object"==typeof e?JSON.stringify(e):e.toString()}let t=[],s="";for(let n=0;n<e.length;n++)this.tokenType(e[n])!==this.tokenType(s)||"separator"===this.tokenType(e[n])?(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s=e[n],"separator"===this.tokenType(s)&&(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s="")):s+=e[n];return""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),t.filter(e=>""!==e)}}}();function n(t,r=null){if(!r)return t;"python"===(r=r.toLowerCase())?r="py":"javascript"===r?r="js":"c#"===r||"csharp"===r||"c-sharp"===r?r="cs":"c++"!==r&&"cplusplus"!==r&&"c-plus-plus"!==r||(r="cpp");const i=s.parseString(t),o=[];let l="";for(let t=0;t<i.length;t++)switch(r){case"lua":if("-"===i[t][0]){for(l+="<comment>";i[t].includes("\n");)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+n(i[t].substr(i[t].indexOf("\n")+1),r)}else if("-[["===i[t].substr(0,3)){for(l+="<comment>"+i[t];!i[t].includes("\n");)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+n(i[t].substr(i[t].indexOf("\n")+1),r)}else"true"===i[t]||"false"===i[t]?l+="<boolean>"+i[t]+"</boolean>":e.lua.includes(i[t])&&(l+="<keyword>"+i[t]+"</keyword>");break;case"js":if("/*"===i[t].substr(0,2)){for(l+="<comment>"+i[t],t++;"*/"!==i[t];)l+=i[t],t++;l+=i[t]+"</comment>"}else if("//"===i[t].substr(0,2)){for(l+="<comment>"+i[t];!newLineRegex.test(i[t]);)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+n(i[t].substr(i[t].indexOf("\n")+1),r)}else if("true"===i[t]||"false"===i[t])l+="<boolean>"+i[t]+"</boolean>";else if(e.js.includes(i[t])){if(l+="<keyword>"+i[t]+"</keyword>","var"===i[t]||"let"===i[t]||"const"===i[t])for(;t<i.length&&!(++t>=i.length);){for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if(o.push(i[t]),l+="<variable>"+i[t]+"</variable>",++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if("="===i[t]){if(l+="<operator>"+i[t]+"</operator>",++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if("grouper"===s.tokenType(i[t])){const e=i[t];let n=i[t];if(++t>=i.length)break;for(;i[t]!==s.closeGrouper(e)&&!(t>=i.length);)n+=i[t],t++;if(t>=i.length)break;l+=codifyJS(n+i[t])}else l+=codifyJS(i[t]);if(++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break}if(t>=i.length)break;if(","!==i[t]){t--;break}l+=i[t]}}else if(s.isNumber(i[t]))l+="<number>"+i[t]+"</number>";else if('"'===i[t]||"'"===i[t]){let e=i[t];for(t++;i[t]!==e[0]&&"\\"!==i[t-1];)e+=i[t],t++;l+="<string>"+e+e[0]+"</string>"}else o.includes(i[t])?l+="<variable>"+i[t]+"</variable>":l+=i[t]}return l}return console.log("Loaded Tokeniser.js by Matthew James"),function(e){e=e.replace(t,"");let s,r="";for(let t=0;t<e.length;t++)switch(e[t]){case"*":-1!==(s=e.indexOf("*",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>s)?(r+="<strong>"+e.substr(t+1,s-t-1)+"</strong>",t=s):r+=e[t];break;case"_":-1!==(s=e.indexOf("_",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>s)?(r+="<em>"+e.substr(t+1,s-t-1)+"</em>",t=s):r+=e[t];break;case"`":if("```"===e.substr(t,3))if(-1!==(s=e.indexOf("```",t+1))){let i="";for(t+=3;t<e.length;t++){if("\n"===e[t]){t++;break}i+=e[t]}r+="<code>"+n(e.substr(t,s-t),i)+"</code>",t=s+2}else r+=e[t];else-1!==(s=e.indexOf("`",t+1))?(r+="<code>"+e.substr(t+1,s-t-1)+"</code>",t=s):r+=e[t];break;default:r+=e[t]}return r}})();console.log("Loaded Markdown.js by Matthew James");

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", renderArticles);
const articlesContainer = document.getElementById("articles"), articles = [];
(async function () {
	(await GetCollection("Articles")).forEach((article) => {
		const data = article.data();
		data.id = article.id;
		articles.push(data);
	});
	renderArticles();
})();

async function renderArticles() {
	while (articlesContainer.firstChild) {
		articlesContainer.removeChild(articlesContainer.lastChild);
	}
	switch (sortSelect.value) {
		case "newest-oldest":
			articles.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
		case "oldest-newest":
			articles.sort((a, b) => a.date > b.date ? 1 : -1);
			break;
		default:
			articles.sort((a, b) => a.date < b.date ? 1 : -1);
			break;
	}
	articles.forEach((article) => {
		articlesContainer.appendChild(document.createElement("br"));
		articlesContainer.appendChild(document.createElement("br"));
		const div = document.createElement("div");
		div.classList.add("program-container");
		articlesContainer.appendChild(div);
		const heading = document.createElement("div");
		if (loggedIn) {
			const editButton = document.createElement("button");
			editButton.textContent = "Edit";
			editButton.classList.add("right-align");
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
		const description = document.createElement("p");
		description.innerHTML = Markdown(article.description);
		div.appendChild(description);
		const readButton = document.createElement("button");
		readButton.textContent = "Read";
		readButton.addEventListener("click", function () {
			localStorage.setItem("article_id", article.id);
			location.href = "https://matt-destroyer.github.io/TI-Nspire-Programs/Articles/Read/";
		});
		div.appendChild(readButton);
		articlesContainer.appendChild(div);
	});
}
