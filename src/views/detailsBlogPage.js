import { html } from "https://unpkg.com/lit-html?module";
import { getArticleById } from "../api/data.js";
import { deleteBlogArticle } from "../api/data.js";

const detailsBlogTemplate = (data, ctx, onDelete) => html `
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
      ? html`<a class="editButton" href="/blog/edit/${ctx.params.id}">Edit</a>
          <button @click=${onDelete} href="javascript:void(0)" class="deleteButton">
            Delete
          </button>`
      : html``}
  </div>
`;

export async function detailsBlogPage(ctx) {
  let data = await getArticleById(ctx.params.id);
  ctx.render(detailsBlogTemplate(data,ctx,onDelete));

  async function onDelete() {
    const confirmed = confirm('Are you sure you want to delete the item?');
    if (confirmed) {
        await deleteBlogArticle(ctx.params.id);
        ctx.page.redirect('/blog');
    }
  }
}