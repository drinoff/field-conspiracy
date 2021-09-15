import * as api from "./api/data.js";
import { render } from "https://unpkg.com/lit-html?module";
import page from "https://unpkg.com/page/page.mjs";

import { homePage } from "./views/homePage.js";
import { releasesPage } from "./views/releasesPage.js";
import { artistsPage } from "./views/artistsPage.js";
import { creativesPage } from "./views/creativesPage.js";
import { showsPage } from "./views/showsPage.js";
import { blogPage } from "./views/blogPage.js";
import { contactPage } from "./views/contactPage.js";
import { loginPage } from "./views/loginPage.js";
import { detailsPage } from "./views/detailsPage.js";
import { editPage } from "./views/editPage.js";
import { editCreativePage } from "./views/editCreativePage.js";
import { detailsBlogPage } from "./views/detailsBlogPage.js";
import { editBlogPage } from "./views/editBlogPage.js";

window.api = api;

const main = document.getElementsByTagName("main")[0];
let adminPanel = document.getElementById("adminPanel");
let logout = document.getElementById("logout");

page("/", decorateContext, homePage);
page("/releases", decorateContext, releasesPage);
page("/artists", decorateContext, artistsPage);
page("/creatives", decorateContext, creativesPage);
page("/contact", decorateContext, contactPage);
page("/blog", decorateContext, blogPage);
page("/shows", decorateContext, showsPage);
page("/login", decorateContext, loginPage);
page("/details/:id", decorateContext, detailsPage);
page("/edit/:id", decorateContext, editPage);
page("/edit/creatives/:id", decorateContext, editCreativePage);
page("/blog", decorateContext, blogPage);
page("/blog/:id", decorateContext, detailsBlogPage);
page("/blog/edit/:id", decorateContext, editBlogPage);

// page('/create',decorateContext, createPage);

setUserNav();
page.start();
page(window.location.pathname);

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    if (window.sessionStorage.length !== 0) {
        adminPanel.style.display = "block";
        logout.style.display = "block";
    } else {
        adminPanel.style.display = "none";
        logout.style.display = "none";
    }
}

logout.addEventListener("click", function() {
    if (sessionStorage.length !== 0) {
        sessionStorage.clear();
        setUserNav();
        page.redirect("/");
    }
});