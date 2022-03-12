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
		return await getDoc(doc(db, collectionName, documentName));
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
const Markdown=(function(){const e={lua:["and","break","do","else","elseif","end","for","function","if","in","local","nil","not","or","repeat","return","then","until","while"],js:["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","try","typeof","var","void","volatile","while","with","yield"]},t=/\n/g,s=/<\/?[a-zA-Z]+?.*?>/g,n=function(){const e=/(\d+\.\d+e\d*|\.\d+e\d*|\d+e\d*)|\d+\.\d+|\.\d+|\d+/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(t){return"number"==typeof t||"string"==typeof t&&e.test(t)},closeGrouper:function(e){return this.settings.groupers.includes(e)?this.settings.groupers[this.settings.groupers.indexOf(e)+1]:null},tokenType:function(e){return this.settings.operators.includes(e)?"operator":this.settings.separators.includes(e)?"separator":this.settings.groupers.includes(e)?"grouper":"other"},parseString:function(e){if("string"!=typeof e){if(null===e)return"null";e="object"==typeof e?JSON.stringify(e):e.toString()}let t=[],s="";for(let n=0;n<e.length;n++)this.tokenType(e[n])!==this.tokenType(s)||"separator"===this.tokenType(e[n])?(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s=e[n],"separator"===this.tokenType(s)&&(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s="")):s+=e[n];return""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),t.filter(e=>""!==e)}}}();function r(t,s=null){if(!s)return t;"python"===(s=s.toLowerCase())?s="py":"javascript"===s?s="js":"c#"===s||"csharp"===s||"c-sharp"===s?s="cs":"c++"!==s&&"cplusplus"!==s&&"c-plus-plus"!==s||(s="cpp");const i=n.parseString(t),o=[];let l="";for(let t=0;t<i.length;t++)switch(s){case"lua":if("-"===i[t][0]){for(l+="<comment>";i[t].includes("\n");)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+r(i[t].substr(i[t].indexOf("\n")+1),s)}else if("-[["===i[t].substr(0,3)){for(l+="<comment>"+i[t];!i[t].includes("\n");)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+r(i[t].substr(i[t].indexOf("\n")+1),s)}else"true"===i[t]||"false"===i[t]?l+="<boolean>"+i[t]+"</boolean>":e.lua.includes(i[t])?l+="<keyword>"+i[t]+"</keyword>":l+=i[t];break;case"js":if("/*"===i[t].substr(0,2)){for(l+="<comment>"+i[t],t++;"*/"!==i[t];)l+=i[t],t++;l+=i[t]+"</comment>"}else if("//"===i[t].substr(0,2)){for(l+="<comment>"+i[t];!newLineRegex.test(i[t]);)l+=i[++t].includes("\n")?i[t].substr(0,i[t].indexOf("\n"))+"</comment>":i[t];l+="\n"+r(i[t].substr(i[t].indexOf("\n")+1),s)}else if("true"===i[t]||"false"===i[t])l+="<boolean>"+i[t]+"</boolean>";else if(e.js.includes(i[t])){if(l+="<keyword>"+i[t]+"</keyword>","var"===i[t]||"let"===i[t]||"const"===i[t])for(;t<i.length&&!(++t>=i.length);){for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if(o.push(i[t]),l+="<variable>"+i[t]+"</variable>",++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if("="===i[t]){if(l+="<operator>"+i[t]+"</operator>",++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break;if("grouper"===n.tokenType(i[t])){const e=i[t];let o=i[t];if(++t>=i.length)break;for(;i[t]!==n.closeGrouper(e)&&!(t>=i.length);)o+=i[t],t++;if(t>=i.length)break;l+=r(o+i[t],s)}else l+=r(i[t],s);if(++t>=i.length)break;for(;""===i[t].trim()&&!(t>=i.length);)l+=i[t],t++;if(t>=i.length)break}if(t>=i.length)break;if(","!==i[t]){t--;break}l+=i[t]}}else if(n.isNumber(i[t]))l+="<number>"+i[t]+"</number>";else if('"'===i[t]||"'"===i[t]){let e=i[t];for(t++;i[t]!==e[0]&&"\\"!==i[t-1];)e+=i[t],t++;l+="<string>"+e+e[0]+"</string>"}else o.includes(i[t])?l+="<variable>"+i[t]+"</variable>":l+=i[t]}return l}return console.log("Loaded Tokeniser.js by Matthew James"),n.settings.operators.push("**","??","~","&","&&","^","%","==","===","|","||","|=","&=","^="),n.settings.groupers.push("`","`","/*","*/"),n.settings.keepWhiteSpacesAsTokens=!0,n.settings.trimTokens=!1,function(e){e=e.replace(s,"");let n,i="";for(let t=0;t<e.length;t++)switch(e[t]){case"*":-1!==(n=e.indexOf("*",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>n)?(i+="<strong>"+e.substr(t+1,n-t-1)+"</strong>",t=n):i+=e[t];break;case"_":-1!==(n=e.indexOf("_",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>n)?(i+="<em>"+e.substr(t+1,n-t-1)+"</em>",t=n):i+=e[t];break;case"`":if("```"===e.substr(t,3))if(-1!==(n=e.indexOf("```",t+1))){let s="";for(t+=3;t<e.length;t++){if("\n"===e[t]){t++;break}s+=e[t]}i+='<br><pre class="code">'+r(e.substr(t,n-t),s)+"</pre><br>",t=n+2}else i+=e[t];else-1!==(n=e.indexOf("`",t+1))?(i+='<pre class="code">'+e.substr(t+1,n-t-1)+"</pre>",t=n):i+=e[t];break;default:i+=e[t]}return i.replace(t,"<br>")}})();console.log("Loaded Markdown.js by Matthew James");

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
const content = document.createElement("p");
content.innerHTML = Markdown(article.content);
div.appendChild(content);
articlesContainer.appendChild(div);
