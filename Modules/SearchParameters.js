"use strict";

const SearchParameters = class {
    constructor(url) {
        this.url = decodeURIComponent(url);
        this.keys = [];
        this.values = [];
        this.params = {};
        const idx = this.url.indexOf("?");
        if (idx > -1) {
            const params = this.url.substr(idx + 1).split("&").map(function (x) {
                return x.split("=");
            });
            for (let i = 0; i < params.length; i++) {
                this.keys.push(params[i][0]);
                this.values.push(params[i][1]);
                this.params[params[i][0]] = params[i][1];
            }
        }
    }
    getParam(name) {
        return this.params[name] || null;
    }
};

export { SearchParameters };
