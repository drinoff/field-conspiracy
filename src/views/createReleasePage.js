import { html } from 'https://unpkg.com/lit-html?module';
import { createRelease } from '../api/data.js';


const createReleaseTemplate = (onSubmit) => html `
<section id="editArtistSection">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Create Release</h1>
        <div class="editContainer">
            <div>
                <label for="name">Artist:</label>
                <input id="artist" type="text" value='' name="artist">
            </div>

            <div>
                <label for="track">Track:</label>
                <input id="track" name="track" value = '' name="track" >   
            </div>

            <div>
                <label for="URL">Image:</label>
                <input id="URL" name="URL" value = '' name="URL" >   
            </div>
            
            <div>
                <label for="bandCamp">Bandcamp:</label>
                <input type="text" name="bandCamp" value='' id="bandcampEdit" />
            </div>
            <input type="submit" class="editArtistButton" value="Create">
        </div>
    </form>
</section>
`;

export async function createReleasePage(ctx) {
    ctx.render(createReleaseTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let artist = formData.get('artist');
        let track = formData.get('track');
        let URL = formData.get('URL');
        let bandCamp = formData.get('bandCamp');
        let id = (Math.random() + 1).toString(36).substring(2);;
        console.log(id)

        const body = {
            artist,
            track,
            URL,
            bandCamp,
            id
        }
        await createRelease(body)
        ctx.setUserNav();
        ctx.page.redirect('/releases');

    }
}