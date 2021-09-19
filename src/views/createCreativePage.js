import { html } from 'https://unpkg.com/lit-html?module';
import { createCreative } from '../api/data.js';




const createCreativeTemplate = (onSubmit) => html `
<section id="editArtistSection">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Creative</h1>
        <div class="editContainer">
            <div>
                <label for="name"> Artist Name:</label>
                <input id="name" type="text" value='' name="name">
            </div>

            <div>
                <label for="creativeName"> Creative Name:</label>
                <input id="creativeName" type="text" value='' name="creativeName">
            </div>
            <div>
                <label for="embed"> Embed URL:</label>
                <input id="embed" type="text" value='' name="embed">
            </div>

            <div>
                <label for="description">Description:</label>
                <textarea id="description" name="description">
                     
                </textarea>
            </div>

            <div>
                <label for="imageUrl">Image Url</label>
                <input id="imageUrl" type="text" value='' name="imageUrl">
            </div>

            <div>
                <label for="pics">Art Work</label>
                <div id="artWork">
                    <input type="text" value=''/>
                    <input type="text" value=''/>
                    <input type="text" value=''/>
                    <input type="text" value=''/>
                    <input type="text" value=''/>
                </div>
            </div>

            <div class="socialEdit">
                <label for="">Bandcamp:</label>
                <input type="text" name="bandcamp" value='' id="bandcampEdit" />

                <label for="">Soundcloud:</label>
                <input type="text" name="soundcloud" value='' id="soundcloudEdit" />

                <label for="">Spotify:</label>
                <input type="text" name="spotify" value='' id="spotifyEdit" />

                <label for="">Youtube:</label>
                <input type="text" name="youtube" value='' id="youtubeEdit" />

                <label for="">Facebook:</label>
                <input type="text" name="facebook" value='' id="facebookEdit" />

                <label for="">Instagram:</label>
                <input type="text" name="instagram" value='' id="instagramEdit" />

                <label for="">RA:</label>
                <input type="text" name="ra" value='' id="raEdit" />
            </div>
            <input type="submit" class="editArtistButton" value="Create Creative">
        </div>
    </form>
</section>
`;

export async function createCreativePage(ctx) {

    ctx.render(createCreativeTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let name = formData.get('name');
        let creativeName = formData.get('creativeName');
        let embed = formData.get('embed');
        let description = formData.get('description');
        let img = formData.get('imageUrl');
        let creatorImgs = Array.from(document.getElementById('artWork').children).map(x => x.value);
        let bandcamp = formData.get('bandcamp');
        let soundcloud = formData.get('soundcloud');
        let spotify = formData.get('spotify');
        let youtube = formData.get('youtube');
        let facebook = formData.get('facebook');
        let instagram = formData.get('instagram');
        let resident = formData.get('ra');

        const body = {
            name,
            creativeName,
            embed,
            description,
            img,
            creatorImgs,
            bandcamp,
            soundcloud,
            spotify,
            youtube,
            facebook,
            instagram,
            resident
        }
        await createCreative(body)
        ctx.setUserNav();
        ctx.page.redirect('/creatives');

    }
}