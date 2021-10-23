import { html } from "https://unpkg.com/lit-html?module";
import { createShow } from '../api/data.js';


const createShowTemplate = (onSubmit) => html `
  <div className="formWrapper">
    <form @submit=${onSubmit} id="edit-form">
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
        <label for="embed">Embed</label>
        <input type="text" name="embed" value='' />
      </div>

      <div>
        <label for="date">Date</label>
        <input type="date" name="date" value='' />
      </div>

      <div>
        <input type="submit" class="editArtistButton" value="Create Show" />
      </div>

    </form>
  </div>
`;

export async function createShowPage(ctx) {
    ctx.render(createShowTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);


        let title = formData.get('title');
        let description = formData.get('description');
        let img = formData.get('img');
        let embed = formData.get('embed');
        const time = new Date(formData.get('date'));
        const [day, month, year] = [time.getDate(), time.getMonth() + 1, time.getFullYear()]
        let date = `${day}.${month}.${year}`;
        let createDate = Date.parse(time);
        console.log(createDate)


        const body = {
            title,
            description,
            img,
            embed,
            date,
            createDate
        }
        await createShow(body)
        ctx.setUserNav();
        ctx.page.redirect('/shows');
    }
}