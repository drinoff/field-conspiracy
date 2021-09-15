import { html } from "https://unpkg.com/lit-html?module";
import { getArticleById } from "../api/data.js";

const detailsBlogTemplate = (data) => html `
  <article id="blogArticleDetails" class="">
    <div class="detailsImgWrapper">
      <a href=${data.link ? data.link : ""}><img src=${data.img} alt="" /></a>
    </div>

    <div class="detailsDescWrapper">
      <h1>${data.title}</h1>
      <p>${data.description}</p>
      <p>${data.author}</p>
      <p>${data.date}</p>
    </div>
  </article>
  <div class="adminButtons">
    ${sessionStorage.getItem("email") === "fieldconspiracy@gmail.com"
      ? html`<a class="editButton" href="/edit/">Edit</a>
          <button href="javascript:void(0)" class="deleteButton">
            Delete
          </button>`
      : html``}
  </div>
`;

export async function detailsBlogPage(ctx) {
  let data = await getArticleById(ctx.params.id);
  console.log(data);
  ctx.render(detailsBlogTemplate(data));
}