import { html } from "https://unpkg.com/lit-html?module";
import { getShowById } from "../api/data.js";
import { editShow } from "../api/data.js";

const editShowTemplate = (data, onSubmit, day, month, year) => html `
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
        <label for="date">Date</label>
        <input type="date" name="date" value=${`${year}-${month<10?"0"+month:month}-${day<10?"0"+day:day}`} />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Edit Article" />
      </div>

    </form>
  </div>
`;

export async function editShowPage(ctx) {
    const data = await getShowById(ctx.params.id);
    let createDate = new Date(data.createDate);

    let [day, month, year] = [createDate.getDate(), createDate.getMonth(), createDate.getFullYear()]
    ctx.render(editShowTemplate(data, onSubmit, day, month, year));
    

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let embed = formData.get('embed');
        let time = new Date(formData.get('date'));
        console.log(time)
        const [day, month, year] = [time.getDate(), time.getMonth(), time.getFullYear()]
        let date = `${day}.${month}.${year}`;
        

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