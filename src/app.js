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
import { editShowPage } from "./views/editShowPage.js";
import { createReleasePage } from "./views/createReleasePage.js";
import { createArtistPage } from "./views/createArtistPage.js";
import { createCreativePage } from "./views/createCreativePage.js";
import { createBlogArticlePage } from "./views/createBlogArticlePage.js";
import { createShowPage } from "./views/createShowPage.js";
import { editReleasePage } from "./views/editReleasePage.js";
import { notFoundPage } from "./views/notFound.js";
import { privacyPage } from "./views/privacy.js";

window.api = api;

const main = document.getElementsByTagName("main")[0];
let authButtons = document.getElementsByClassName("authButtons")[0];
let logout = document.getElementById("logout");

page("/", decorateContext, homePage);
page("/releases", decorateContext, releasesPage);
page("/releases/edit/:id", decorateContext, editReleasePage);
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
page("/shows/:id", decorateContext, editShowPage);
page("/createRelease", decorateContext, createReleasePage);
page("/createArtist", decorateContext, createArtistPage);
page("/createCreative", decorateContext, createCreativePage);
page("/createBlogArticle", decorateContext, createBlogArticlePage);
page("/createShow", decorateContext, createShowPage);
page("/privacy", decorateContext, privacyPage);
page("/*", decorateContext, notFoundPage);

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
        authButtons.style.display = "flex";
    } else {
        authButtons.style.display = "none";
    }
}

logout.addEventListener("click", function() {
    if (sessionStorage.length !== 0) {
        sessionStorage.clear();
        setUserNav();
        page.redirect("/");
    }
});

// Burger menu functionality

let burgerMenuIcon = document.getElementsByClassName("fa-bars")[0];
let closeBurgerMenuIcon = document.getElementsByClassName("fa-times")[0];
let mobileNav = document.getElementsByClassName("navWrapperMobile")[0];
let body = document.getElementsByTagName('body')[0];

burgerMenuIcon.addEventListener("click", () => {
    mobileNav.style.display = 'flex';
    myMove();
    burgerMenuIcon.style.opacity = 0;
    var id = null;

    function myMove() {
        var pos = -610;
        clearInterval(id);
        id = setInterval(frame, 10);

        function frame() {
            if (pos == 5) {
                clearInterval(id);
            } else {
                pos += 15;
                mobileNav.style.right = pos + "px";
            }
        }
    }
});

closeBurgerMenuIcon.addEventListener("click", () => {
    mobileNav.style.right = -610 + 'px';
    mobileNav.style.display = 'none';
    burgerMenuIcon.style.opacity = 1;
});
mobileNav.addEventListener('click', () => {
    mobileNav.style.display = 'none';
    burgerMenuIcon.style.opacity = 1;
})