import { html } from "https://unpkg.com/lit-html?module";
import { getArtistById } from "../api/data.js";
import { editArtist } from "../api/data.js";

const editTemplate = (data, onSubmit) => html `
  <section id="editArtistSection">
    <form @submit=${onSubmit} id="edit-form">
      <h1>Edit Artist</h1>
      <div class="editContainer">
        <div>
          <label for="name">Name:</label>
          <input id="name" type="text" value=${data.name} name="name" />
        </div>

        <div>
          <label for="description">Description:</label>
          <textarea id="description" name="description">
                    ${data.description} 
                </textarea
          >
        </div>
        <div>
          <label for="imageUrl">Image Url</label>
          <input id="imageUrl" type="text" value=${data.img} name="imageUrl" />
        </div>
        <div class="socialEdit">
          <label for="">Bandcamp:</label>
          <input
            type="text"
            name="bandcamp"
            value=${data.bandcamp}
            id="bandcampEdit"
          />

          <label for="">Soundcloud:</label>
          <input
            type="text"
            name="soundcloud"
            value=${data.soundcloud}
            id="soundcloudEdit"
          />

          <label for="">Spotify:</label>
          <input
            type="text"
            name="spotify"
            value=${data.spotify}
            id="spotifyEdit"
          />

          <label for="">Youtube:</label>
          <input
            type="text"
            name="youtube"
            value=${data.youtube}
            id="youtubeEdit"
          />

          <label for="">Facebook:</label>
          <input
            type="text"
            name="facebook"
            value=${data.facebook}
            id="facebookEdit"
          />

          <label for="">Instagram:</label>
          <input
            type="text"
            name="instagram"
            value=${data.instagram}
            id="instagramEdit"
          />

          <label for="">RA:</label>
          <input type="text" name="ra" value=${data.resident} id="raEdit" />
        </div>
        <input type="submit" class="editArtistButton" value="Edit Artist" />
      </div>
    </form>
  </section>
`;

export async function editPage(ctx) {
    const data = await getArtistById(ctx.params.id);
    ctx.render(editTemplate(data, onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById("edit-form");
        let formData = new FormData(editForm);

        let name = formData.get("name");
        let description = formData.get("description");
        let img = formData.get("imageUrl");
        let bandcamp = formData.get("bandcamp");
        let soundcloud = formData.get("soundcloud");
        let spotify = formData.get("spotify");
        let youtube = formData.get("youtube");
        let facebook = formData.get("facebook");
        let instagram = formData.get("instagram");
        let resident = formData.get("ra");

        const body = {
            name,
            description,
            img,
            bandcamp,
            soundcloud,
            spotify,
            youtube,
            facebook,
            instagram,
            resident,
        };
        await editArtist(ctx.params.id, body);
        ctx.setUserNav();
        ctx.page.redirect("/details/" + ctx.params.id);
    }
}