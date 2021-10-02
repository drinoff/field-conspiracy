import { html } from "https://unpkg.com/lit-html?module";
import { getArticleById } from "../api/data.js";
import { editBlogArticle } from "../api/data.js";

const editBlogTemplate = (data, onSubmit) => html `
  <div className="formWrapper">
    <form @submit=${onSubmit} id="edit-form">
      <div>
        <label for="author">Author</label>
        <input type="text" name="author" value=${data.author} />
      </div>

      <div>
        <label for="title">Title</label>
        <input type="text" name="title" value=${data.title} />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description">
            ${data.description} 
        </textarea>
      </div>

      <div>
        <label for="img">Image</label>
        <input type="text" name="img" value=${data.img} />
      </div>

      <div>
        <label for="link">Link</label>
        <input type="text" name="link" value=${data.link} />
      </div>

      <div>
        <label for="embed">Link</label>
        <input type="text" name="embed" value=${data.embed} />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Edit Article" />
      </div>

    </form>
  </div>
`;

export async function editBlogPage(ctx) {
    const data = await getArticleById(ctx.params.id);
    let createDate = data.createDate;
    ctx.render(editBlogTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let author = formData.get('author');
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let link = formData.get('link');
        let date = data.date;
        let embed = formData.get('embed')

        const body = {
            author,
            title,
            description,
            img,
            link,
            date,
            createDate,
            embed
        }
        await editBlogArticle(ctx.params.id, body)
        ctx.setUserNav();
        ctx.page.redirect('/blog');
    }
}