import { GetDocument } from "./Database.js";

const Redirect = function (url) {
    if ("location" in window && "href" in window.location) {
        window.location.href = url;
    } else {
        const anchor = document.createElement("a");
        anchor.setAttribute("href", url);
        anchor.click();
    }
};

const Account = await (async function () {
    if (window.localStorage.getItem("id")) {
        const account = await GetDocument("Accounts", window.localStorage.getItem("id"));
        if (window.localStorage.getItem("username") !== account.username || window.localStorage.getItem("password") !== account.password) {
            return null;
        }
        if (account) {
            account.id = window.localStorage.getItem("id");
        }
        return account;
    }
    return null;
})();

const page = function (name, path) {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", "https://mattdestroyer.repl.co/" + (path || ""));
    const button = document.createElement("button");
    button.textContent = (name || "Home");
    anchor.append(button);
    return anchor;
};

const nav = function () {
    const nav = document.createElement("nav");
    const icon = document.createElement("img");
    icon.setAttribute("src", "https://Matt-DESTROYER.github.io/TI-Nspire-Programs/calculator-icon.png");
    icon.setAttribute("width", 32);
    icon.setAttribute("height", 32);
    nav.append(icon);
    const heading = document.createElement("h1");
    heading.textContent = "TI-Nspire Programs";
    nav.append(heading);
    nav.append(page());
    nav.append(page("Login", "Login"));
    document.body.prepend(nav);
    return nav;
};

nav();

export { Redirect, Account, page, nav };