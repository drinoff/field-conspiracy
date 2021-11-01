import { html } from "https://unpkg.com/lit-html?module";
import { getBlog } from "../api/data.js";

const blogTemplate = (data) => html `
    <div class="blogWrapper">
        ${data.length !== 0 ? data.map(blogCard) : "Currently No Articles"}
    </div>
`;

const blogCard = (item) => html `
    <article id="singleArticle" class="singleArticle">
        ${item[1].link
            ? html`
                  <div class="blogImgWrapper">
                      <a href=${item[1].link} target="_blank"
                          ><img src=${item[1].img} alt=""
                      /></a>
                  </div>

                  <div class="blogDescWrapper">
                      <div class="readMore">
                          <h1>${item[1].title}</h1>
                          <a
                              href="/blog/${item[0]}"
                              class="readMoreBtn"
                              id=${item[0]}
                              >Read More</a
                          >
                      </div>
                      <p>${item[1].description}</p>
                      <p>${item[1].author}</p>
                      <p>${item[1].date}</p>
                  </div>
              `
            : html`
                  <div class="blogImgWrapper">
                      <img src=${item[1].img} alt="" />
                  </div>
                  <div class="blogDescWrapper">
                      <div class="readMore">
                          <h1>${item[1].title}</h1>
                          <a href="/blog/${item[0]}" id=${item[0]}>Read More</a>
                      </div>
                      <p class="articleDescription">${item[1].description}</p>
                      <p>${item[1].author}</p>
                      <p>${item[1].date}</p>
                  </div>
              `}
    </article>
`;

export async function blogPage(ctx) {
    let dataObj = await getBlog();
    let data;
    if (dataObj === null) {
        data = [];
    } else {
        data = Object.entries(dataObj);
        data.sort((a,b)=>a[1].createDate-b[1].createDate).reverse();
    }

    ctx.render(blogTemplate(data));
    document
        .getElementsByClassName("blogWrapper")[0]
        .addEventListener("click", (e) => {
            if (e.target.value === "Read More") {
                let itemId = e.target.id;
                ctx.page.redirect(`/blog/${itemId}`);
            }
        });
}