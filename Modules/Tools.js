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
        const account = (await GetDocument("Accounts", window.localStorage.getItem("id"))).data();
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
    anchor.setAttribute("href", "https://matt-destroyer.github.io/TI-Nspire-Programs/" + (path || ""));
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
    for (let i = 0; i < arguments.length; i += 2) {
        nav.append(page(arguments[i], arguments[i + 1]));
    }
    document.body.prepend(nav);
    return nav;
};

export { Redirect, Account, page, nav };