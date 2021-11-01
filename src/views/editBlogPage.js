import { html } from "https://unpkg.com/lit-html?module";
import { getArticleById } from "../api/data.js";
import { editBlogArticle } from "../api/data.js";

const editBlogTemplate = (data, onSubmit, day, month, year) => html `
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
        <label for="date">Date</label>
        <input type="date" name="date" value=${`${year}-${month<10?"0"+month:month}-${day<10?"0"+day:day}`} />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Edit Article" />
      </div>

    </form>
  </div>
`;

export async function editBlogPage(ctx) {
    const data = await getArticleById(ctx.params.id);
    let createDate = new Date(data.createDate);

    let [day, month, year] = [createDate.getDate(), createDate.getMonth(), createDate.getFullYear()]
    ctx.render(editBlogTemplate(data, onSubmit,day,month,year));

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let author = formData.get('author');
        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let link = formData.get('link');
        let embed = formData.get('embed');

        //date
        let time = new Date(formData.get('date'));
        console.log(time)
        const [day, month, year] = [time.getDate(), time.getMonth(), time.getFullYear()]
        let date = `${day}.${month}.${year}`;

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