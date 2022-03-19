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
const Markdown=function(){const e={lua:{keywords:["and","break","do","else","elseif","end","for","function","if","in","local","nil","not","or","repeat","return","then","until","while"],operators:["<",">","=","+","-","*","/","^","%","==","~=","<=",">="],groupers:[]},js:{keywords:["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","try","typeof","var","void","volatile","while","with","yield"],operators:["<",">","=","+","-","*","/","?","!","**","??","~","&","&&","^","%","==","===","|","||","|=","&=","^="],groupers:["`","`","/*","*/"]}},t=/\n/g,s=/\s/g,r=/<\/?[a-zA-Z]+?.*?>/g,n=function(){const e=/-?\d+(\.\d+)?((e|E)(\+|-)?\d+)?/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(t){return"number"==typeof t||"string"==typeof t&&e.test(t)},closeGrouper:function(e){return this.settings.groupers.includes(e)?this.settings.groupers[this.settings.groupers.indexOf(e)+1]:null},tokenType:function(e){return this.settings.operators.includes(e)?"operator":this.settings.separators.includes(e)?"separator":this.settings.groupers.includes(e)?"grouper":"other"},parseString:function(e){if("string"!=typeof e){if(null===e)return"null";e="object"==typeof e?JSON.stringify(e):e.toString()}let t=[],s="";for(let r=0;r<e.length;r++)this.tokenType(e[r])!==this.tokenType(s)||"separator"===this.tokenType(e[r])?(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s=e[r],"separator"===this.tokenType(s)&&(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s="")):s+=e[r];return""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),t.filter(e=>""!==e)}}}();function i(t,s=null){s?("python"===(s=s.toLowerCase())?s="py":"javascript"===s?s="js":"c#"===s||"csharp"===s||"c-sharp"===s?s="cs":"c++"!==s&&"cplusplus"!==s&&"c-plus-plus"!==s||(s="cpp"),s in e||(s="js")):s="js",n.settings.operators=e[s].operators,n.settings.groupers=e[s].groupers;const r=n.parseString(t),o=[];let l="";for(let t=0;t<r.length;t++)switch(console.log(r[t]),s){case"lua":if("-"===r[t][0]){for(l+="<comment>";r[t].includes("\n");)l+=r[++t].includes("\n")?r[t].substr(0,r[t].indexOf("\n"))+"</comment>":r[t];l+="\n"+i(r[t].substr(r[t].indexOf("\n")+1),s)}else if("-[["===r[t].substr(0,3)){for(l+="<comment>"+r[t];!r[t].includes("\n");)l+=r[++t].includes("\n")?r[t].substr(0,r[t].indexOf("\n"))+"</comment>":r[t];l+="\n"+i(r[t].substr(r[t].indexOf("\n")+1),s)}else if(r[t].includes('"')||r[t].includes("'")){let e;e=r[t].includes('"')?'"':"'";for(let s=0;s<r[t].length;t++){if(r[t][s]===e){t=s+1;break}l+=r[t]}for(;r[t](e[0])&&"\\"!==r[t-1];)e+=r[t],t++;l+="<string>"+e+e[0]+"</string>"}else"true"===r[t]||"false"===r[t]?l+="<boolean>"+r[t]+"</boolean>":e.lua.keywords.includes(r[t])?l+="<keyword>"+r[t]+"</keyword>":n.isNumber(r[t])?l+="<number>"+r[t]+"</number>":o.includes(r[t])?l+="<variable>"+r[t]+"</variable>":l+=r[t];break;case"js":if("/*"===r[t]){for(l+="<comment>"+r[t],t++;"*/"!==r[t];)l+=r[t],t++;l+=r[t]+"</comment>"}else if("//"===r[t].substr(0,2)){for(l+="<comment>"+r[t];!newLineRegex.test(r[t]);)l+=r[++t].includes("\n")?r[t].substr(0,r[t].indexOf("\n"))+"</comment>":r[t];l+="\n"+codifyJS(r[t].substr(r[t].indexOf("\n")+1))}else if("true"===r[t]||"false"===r[t])l+="<boolean>"+r[t]+"</boolean>";else if(keywords.includes(r[t])){if(l+="<keyword>"+r[t]+"</keyword>","var"===r[t]||"let"===r[t]||"const"===r[t])for(;t<r.length&&!(++t>=r.length);){for(;""===r[t].trim()&&!(t>=r.length);)l+=r[t],t++;if(t>=r.length)break;if(o.push(r[t]),l+="<variable>"+r[t]+"</variable>",++t>=r.length)break;for(;""===r[t].trim()&&!(t>=r.length);)l+=r[t],t++;if(t>=r.length)break;if("="===r[t]){if(l+="<operator>"+r[t]+"</operator>",++t>=r.length)break;for(;""===r[t].trim()&&!(t>=r.length);)l+=r[t],t++;if(t>=r.length)break;if("grouper"===n.tokenType(r[t])){const e=r[t];let s=r[t];if(++t>=r.length)break;for(;r[t]!==n.closeGrouper(e)&&!(t>=r.length);)s+=r[t],t++;if(t>=r.length)break;l+=codifyJS(s+r[t])}else l+=codifyJS(r[t]);if(++t>=r.length)break;for(;""===r[t].trim()&&!(t>=r.length);)l+=r[t],t++;if(t>=r.length)break}if(t>=r.length)break;if(","!==r[t]){t--;break}l+=r[t]}}else if(n.isNumber(r[t]))l+="<number>"+r[t]+"</number>";else if('"'===r[t]||"'"===r[t]){let e=r[t];for(t++;r[t]!==e[0]&&"\\"!==r[t-1];)e+=r[t],t++;l+="<string>"+e+e[0]+"</string>"}else o.includes(r[t])?l+="<variable>"+r[t]+"</variable>":l+=r[t]}return l}return console.log("Loaded Tokeniser.js by Matthew James"),n.settings.keepWhiteSpacesAsTokens=!0,n.settings.trimTokens=!1,function(e){e=e.replace(r,"");let n,o="";for(let t=0;t<e.length;t++)switch(e[t]){case"*":-1!==(n=e.indexOf("*",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>n)?(o+="<strong>"+e.substr(t+1,n-t-1)+"</strong>",t=n):o+=e[t];break;case"_":-1!==(n=e.indexOf("_",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>n)?(o+="<em>"+e.substr(t+1,n-t-1)+"</em>",t=n):o+=e[t];break;case"`":if("```"===e.substr(t,3))if(-1!==(n=e.indexOf("```",t+1))){let r="";for(t+=3;t<e.length;t++){if(s.test(e[t])){t++;break}r+=e[t]}o+='<br><pre class="code">'+i(e.substr(t,n-t),r)+"</pre><br>",t=n+2}else o+=e[t];else-1!==(n=e.indexOf("`",t+1))?(o+='<pre class="code">'+e.substr(t+1,n-t-1)+"</pre>",t=n):o+=e[t];break;default:o+=e[t]}return o.replace(t,"<br>")}}();console.log("Loaded Markdown.js by Matthew James");

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
