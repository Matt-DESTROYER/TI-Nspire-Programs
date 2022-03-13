import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

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
const Markdown=(function(){const e={lua:{keywords:["and","break","do","else","elseif","end","for","function","if","in","local","nil","not","or","repeat","return","then","until","while"],operators:["<",">","=","+","-","*","/","^","%","==","~=","<=",">="],groupers:[]},js:{keywords:["abstract","arguments","await","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete","do","double","else","enum","eval","export","extends","final","finally","float","for","function","goto","if","implements","import","in","instanceof","int","interface","let","long","native","new","null","package","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","try","typeof","var","void","volatile","while","with","yield"],operators:["<",">","=","+","-","*","/","?","!","**","??","~","&","&&","^","%","==","===","|","||","|=","&=","^="],groupers:["`","`","/*","*/"]}},t=/\n/g,s=/<\/?[a-zA-Z]+?.*?>/g,r=function(){const e=/(\d+\.\d+e\d*|\.\d+e\d*|\d+e\d*)|\d+\.\d+|\.\d+|\d+/g;return{settings:{operators:["<",">","=","+","-","*","/","?","!"],separators:[",",".",";",":"," ","\t","\n"],groupers:["(",")","[","]","{","}",'"','"',"'","'"],keepWhiteSpacesAsTokens:!1,trimTokens:!0},isNumber:function(t){return"number"==typeof t||"string"==typeof t&&e.test(t)},closeGrouper:function(e){return this.settings.groupers.includes(e)?this.settings.groupers[this.settings.groupers.indexOf(e)+1]:null},tokenType:function(e){return this.settings.operators.includes(e)?"operator":this.settings.separators.includes(e)?"separator":this.settings.groupers.includes(e)?"grouper":"other"},parseString:function(e){if("string"!=typeof e){if(null===e)return"null";e="object"==typeof e?JSON.stringify(e):e.toString()}let t=[],s="";for(let r=0;r<e.length;r++)this.tokenType(e[r])!==this.tokenType(s)||"separator"===this.tokenType(e[r])?(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s=e[r],"separator"===this.tokenType(s)&&(""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),s="")):s+=e[r];return""!==s.trim()?t.push(this.settings.trimTokens?s.trim():s):this.settings.keepWhiteSpacesAsTokens&&t.push(s),t.filter(e=>""!==e)}}}();function n(t,s=null){if(!s)return t;"python"===(s=s.toLowerCase())?s="py":"javascript"===s?s="js":"c#"===s||"csharp"===s||"c-sharp"===s?s="cs":"c++"!==s&&"cplusplus"!==s&&"c-plus-plus"!==s||(s="cpp"),r.settings.operators=e[s].operators,r.settings.groupers=e[s].groupers;const i=r.parseString(t),o=[];let l="";for(let e=0;e<i.length;e++)switch(s){case"lua":if("-"===i[e][0]){for(l+="<comment>";i[e].includes("\n");)l+=i[++e].includes("\n")?i[e].substr(0,i[e].indexOf("\n"))+"</comment>":i[e];l+="\n"+n(i[e].substr(i[e].indexOf("\n")+1),s)}else if("-[["===i[e].substr(0,3)){for(l+="<comment>"+i[e];!i[e].includes("\n");)l+=i[++e].includes("\n")?i[e].substr(0,i[e].indexOf("\n"))+"</comment>":i[e];l+="\n"+n(i[e].substr(i[e].indexOf("\n")+1),s)}else if('"'===i[e]||"'"===i[e]){let t=i[e];for(e++;i[e]!==t[0]&&"\\"!==i[e-1];)t+=i[e],e++;l+="<string>"+t+t[0]+"</string>"}else"true"===i[e]||"false"===i[e]?l+="<boolean>"+i[e]+"</boolean>":keywords.lua.includes(i[e])?l+="<keyword>"+i[e]+"</keyword>":r.isNumber(i[e])?l+="<number>"+i[e]+"</number>":o.includes(i[e])?l+="<variable>"+i[e]+"</variable>":l+=i[e];break;case"js":if("/*"===i[e].substr(0,2)){for(l+="<comment>"+i[e],e++;"*/"!==i[e];)l+=i[e],e++;l+=i[e]+"</comment>"}else if("//"===i[e].substr(0,2)){for(l+="<comment>"+i[e];!newLineRegex.test(i[e]);)l+=i[++e].includes("\n")?i[e].substr(0,i[e].indexOf("\n"))+"</comment>":i[e];l+="\n"+n(i[e].substr(i[e].indexOf("\n")+1),s)}else if("true"===i[e]||"false"===i[e])l+="<boolean>"+i[e]+"</boolean>";else if(keywords.js.includes(i[e])){if(l+="<keyword>"+i[e]+"</keyword>","var"===i[e]||"let"===i[e]||"const"===i[e])for(;e<i.length&&!(++e>=i.length);){for(;""===i[e].trim()&&!(e>=i.length);)l+=i[e],e++;if(e>=i.length)break;if(o.push(i[e]),l+="<variable>"+i[e]+"</variable>",++e>=i.length)break;for(;""===i[e].trim()&&!(e>=i.length);)l+=i[e],e++;if(e>=i.length)break;if("="===i[e]){if(l+="<operator>"+i[e]+"</operator>",++e>=i.length)break;for(;""===i[e].trim()&&!(e>=i.length);)l+=i[e],e++;if(e>=i.length)break;if("grouper"===r.tokenType(i[e])){const t=i[e];let o=i[e];if(++e>=i.length)break;for(;i[e]!==r.closeGrouper(t)&&!(e>=i.length);)o+=i[e],e++;if(e>=i.length)break;l+=n(o+i[e],s)}else l+=n(i[e],s);if(++e>=i.length)break;for(;""===i[e].trim()&&!(e>=i.length);)l+=i[e],e++;if(e>=i.length)break}if(e>=i.length)break;if(","!==i[e]){e--;break}l+=i[e]}}else if(r.isNumber(i[e]))l+="<number>"+i[e]+"</number>";else if('"'===i[e]||"'"===i[e]){let t=i[e];for(e++;i[e]!==t[0]&&"\\"!==i[e-1];)t+=i[e],e++;l+="<string>"+t+t[0]+"</string>"}else o.includes(i[e])?l+="<variable>"+i[e]+"</variable>":l+=i[e]}return l}return console.log("Loaded Tokeniser.js by Matthew James"),r.settings.keepWhiteSpacesAsTokens=!0,r.settings.trimTokens=!1,function(e){e=e.replace(s,"");let r,i="";for(let t=0;t<e.length;t++)switch(e[t]){case"*":-1!==(r=e.indexOf("*",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>r)?(i+="<strong>"+e.substr(t+1,r-t-1)+"</strong>",t=r):i+=e[t];break;case"_":-1!==(r=e.indexOf("_",t+1))&&(-1===e.indexOf("\n",t+1)||e.indexOf("\n",t+1)>r)?(i+="<em>"+e.substr(t+1,r-t-1)+"</em>",t=r):i+=e[t];break;case"`":if("```"===e.substr(t,3))if(-1!==(r=e.indexOf("```",t+1))){let s="";for(t+=3;t<e.length;t++){if("\n"===e[t]){t++;break}s+=e[t]}i+='<br><pre class="code">'+n(e.substr(t,r-t),s)+"</pre><br>",t=r+2}else i+=e[t];else-1!==(r=e.indexOf("`",t+1))?(i+='<pre class="code">'+e.substr(t+1,r-t-1)+"</pre>",t=r):i+=e[t];break;default:i+=e[t]}return i.replace(t,"<br>")}})();console.log("Loaded Markdown.js by Matthew James");

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
