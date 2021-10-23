import { html } from "https://unpkg.com/lit-html?module";
import { createBlogArticle } from '../api/data.js';


const createBlogArticleTemplate = (onSubmit) => html `
  <div className="formWrapper">
    <form @submit=${onSubmit} id="edit-form">
      <div>
        <label for="author">Author</label>
        <input type="text" name="author" value='' />
      </div>

      <div>
        <label for="title">Title</label>
        <input type="text" name="title" value='' />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description">
             
        </textarea>
      </div>

      <div>
        <label for="img">Image</label>
        <input type="text" name="img" value='' />
      </div>

      <div>
        <label for="link">Link</label>
        <input type="text" name="link" value='' />
      </div>

      <div>
        <label for="embed">Embed</label>
        <input type="text" name="embed" value='' />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Create Article" />
      </div>

    </form>
  </div>
`;

export async function createBlogArticlePage(ctx) {
    ctx.render(createBlogArticleTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let author = formData.get('author');
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let link = formData.get('link');
        let time = new Date();
        const [day, month, year] = [time.getDate(), time.getMonth(), time.getFullYear()]
        let date = `${day}.${month}.${year}`;
        let createDate = Date.parse(time);
        let embed = formData.get('embed');

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
        await createBlogArticle(body)
        ctx.setUserNav();
        ctx.page.redirect('/blog');
    }
}