//import {  };

const page = function(name, path) {
	const anchor = document.createElement("a");
	anchor.setAttribute("href", "https://mattdestroyer.repl.co/" + (path || ""));
	const button = document.createElement("button");
	button.textContent = (name || "Home");
	anchor.append(button);
	return anchor;
};

const nav = function() {
	const nav = document.createElement("nav");
	nav.append(page());
	nav.append(page("Login", "Login"));
	document.body.prepend(nav);
	return nav;
};

nav();

export { nav, page };
