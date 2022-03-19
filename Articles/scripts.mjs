import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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
const Markdown=(function(){const e={lua:{keywords:["and","break","do","else","elseif","end","for","function","if","in","local","nil","not","or","repeat","return","then","until","while"],operators:["<",">","=","+","-","*","/","^","%","==","~=","<=",">="],groupers:[]},js:{keywords:["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","try","typeof","var","void","volatile","while","with","yield"],operators:["<",">","=","+","-","*","/","?","!","**","??","~","&","&&","^","%","==","===","|","||","|=","&=","^="],groupers:["`","`","/*","*/"]}},s=/\n/g,t=/\s/g,n=/<\/?[a-zA-Z]+?.*?>/g,r=function(){const e=/-?\d+(\.\d+)?((e|E)(\+|-)?\d+)?/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(s){return"number"==typeof s||"string"==typeof s&&e.test(s)},closeGrouper:function(e){return this.settings.groupers.includes(e)?this.settings.groupers[this.settings.groupers.indexOf(e)+1]:null},tokenType:function(e){return this.settings.operators.includes(e)?"operator":this.settings.separators.includes(e)?"separator":this.settings.groupers.includes(e)?"grouper":"other"},parseString:function(e){if("string"!=typeof e){if(null===e)return"null";e="object"==typeof e?JSON.stringify(e):e.toString()}let s=[],t="";for(let n=0;n<e.length;n++)this.tokenType(e[n])!==this.tokenType(t)||"separator"===this.tokenType(e[n])?(""!==t.trim()?s.push(this.settings.trimTokens?t.trim():t):this.settings.keepWhiteSpacesAsTokens&&s.push(t),t=e[n],"separator"===this.tokenType(t)&&(""!==t.trim()?s.push(this.settings.trimTokens?t.trim():t):this.settings.keepWhiteSpacesAsTokens&&s.push(t),t="")):t+=e[n];return""!==t.trim()?s.push(this.settings.trimTokens?t.trim():t):this.settings.keepWhiteSpacesAsTokens&&s.push(t),s.filter(e=>""!==e)}}}();function i(s,t=null){t?("python"===(t=t.toLowerCase())?t="py":"javascript"===t?t="js":"c#"===t||"csharp"===t||"c-sharp"===t?t="cs":"c++"!==t&&"cplusplus"!==t&&"c-plus-plus"!==t||(t="cpp"),t in e||(t="js")):t="js",r.settings.operators=e[t].operators,r.settings.groupers=e[t].groupers;const n=r.parseString(s),o=[];let l="";for(let s=0;s<n.length;s++)switch(console.log(n[s]),t){case"lua":if("-"===n[s][0]){for(l+="<comment>";n[s].includes("\n");)l+=n[++s].includes("\n")?n[s].substr(0,n[s].indexOf("\n"))+"</comment>":n[s];l+="\n"+i(n[s].substr(n[s].indexOf("\n")+1),t)}else if("-[["===n[s].substr(0,3)){for(l+="<comment>"+n[s];!n[s].includes("\n");)l+=n[++s].includes("\n")?n[s].substr(0,n[s].indexOf("\n"))+"</comment>":n[s];l+="\n"+i(n[s].substr(n[s].indexOf("\n")+1),t)}else if(n[s].includes('"')||n[s].includes("'")){let e;e=n[s].includes('"')?'"':"'";for(let t=0;t<n[s].length;s++){if(n[s][t]===e){s=t+1;break}l+=n[s]}for(;n[s](e[0])&&"\\"!==n[s-1];)e+=n[s],s++;l+="<string>"+e+e[0]+"</string>"}else"true"===n[s]||"false"===n[s]?l+="<boolean>"+n[s]+"</boolean>":e.lua.keywords.includes(n[s])?l+="<keyword>"+n[s]+"</keyword>":r.isNumber(n[s])?l+="<number>"+n[s]+"</number>":o.includes(n[s])?l+="<variable>"+n[s]+"</variable>":l+=n[s];break;case"js":if("/*"===n[s].substr(0,2)){for(l+="<comment>"+n[s],s++;"*/"!==n[s];)l+=n[s],s++;l+=n[s]+"</comment>"}else if("//"===n[s].substr(0,2)){for(l+="<comment>"+n[s];!newLineRegex.test(n[s]);)l+=n[++s].includes("\n")?n[s].substr(0,n[s].indexOf("\n"))+"</comment>":n[s];l+="\n"+i(n[s].substr(n[s].indexOf("\n")+1),t)}else if("true"===n[s]||"false"===n[s])l+="<boolean>"+n[s]+"</boolean>";else if(e.js.keywords.includes(n[s]))l+="<keyword>"+n[s]+"</keyword>";else if(r.isNumber(n[s]))l+="<number>"+n[s]+"</number>";else if('"'===n[s]||"'"===n[s]){let e=n[s];for(s++;n[s]!==e[0]&&"\\"!==n[s-1];)e+=n[s],s++;l+="<string>"+e+e[0]+"</string>"}else o.includes(n[s])?l+="<variable>"+n[s]+"</variable>":l+=n[s]}return l}return console.log("Loaded Tokeniser.js by Matthew James"),r.settings.keepWhiteSpacesAsTokens=!0,r.settings.trimTokens=!1,function(e){e=e.replace(n,"");let r,o="";for(let s=0;s<e.length;s++)switch(e[s]){case"*":-1!==(r=e.indexOf("*",s+1))&&(-1===e.indexOf("\n",s+1)||e.indexOf("\n",s+1)>r)?(o+="<strong>"+e.substr(s+1,r-s-1)+"</strong>",s=r):o+=e[s];break;case"_":-1!==(r=e.indexOf("_",s+1))&&(-1===e.indexOf("\n",s+1)||e.indexOf("\n",s+1)>r)?(o+="<em>"+e.substr(s+1,r-s-1)+"</em>",s=r):o+=e[s];break;case"`":if("```"===e.substr(s,3))if(-1!==(r=e.indexOf("```",s+1))){let n="";for(s+=3;s<e.length;s++){if(t.test(e[s])){s++;break}n+=e[s]}o+='<br><pre class="code">'+i(e.substr(s,r-s),n)+"</pre><br>",s=r+2}else o+=e[s];else-1!==(r=e.indexOf("`",s+1))?(o+='<pre class="code">'+e.substr(s+1,r-s-1)+"</pre>",s=r):o+=e[s];break;default:o+=e[s]}return o.replace(s,"<br>")}})();console.log("Loaded Markdown.js by Matthew James");

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
