import { html } from "https://unpkg.com/lit-html?module";
import { getShowById } from "../api/data.js";
import { editShow } from "../api/data.js";

const editShowTemplate = (data, onSubmit) => html `
  <div className="formWrapper">
    <form @submit=${onSubmit} id="edit-form">
      <div>
        <label for="title">Title</label>
        <input type="text" name="title" value=${data.title} />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description"><pre>${data.description}</pre>
             
        </textarea>
      </div>

      <div>
        <label for="img">Image</label>
        <input type="text" name="img" value=${data.img} />
      </div>

      <div>
        <label for="embed">Embed</label>
        <input type="text" name="embed" value=${data.embed} />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Edit Article" />
      </div>

    </form>
  </div>
`;

export async function editShowPage(ctx) {
    const data = await getShowById(ctx.params.id);
    let createDate = data.createDate;
    ctx.render(editShowTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);


        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let embed = formData.get('embed');
        let date = data.date;

        const body = {
            title,
            description,
            img,
            embed,
            date,
            createDate
        }
        await editShow(ctx.params.id, body)
        ctx.setUserNav();
        ctx.page.redirect('/shows');
    }
}