import { html } from 'https://unpkg.com/lit-html?module';
import { getReleaseById } from '../api/data.js';
import { editRelease } from '../api/data.js'


const editReleaseTemplate = (data, onSubmit) => html `
<section id="editArtistSection">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Release</h1>
        <div class="editContainer">
            <div>
                <label for="artist">Artist:</label>
                <input id="artist" type="text" value=${data.artist} name="artist">
            </div>

            <div>
                <label for="track">Track:</label>
                <input id="track" type="text" name="track" value = ${data.track}>         
            </div>
            <div>
                <label for="bandCamp">BandCamp</label>
                <input id="bandCamp" type="text" value=${data.bandCamp} name="bandCamp">
            </div>

            <div>
                <label for="URL">Image URL</label>
                <input id="URL" type="text" value=${data.URL} name="URL">
            </div>
            
            <input type="submit" class="editArtistButton" value="Edit Release">
        </div>
    </form>
</section>
`;

export async function editReleasePage(ctx) {
    const data = await getReleaseById(ctx.params.id)
    ctx.render(editReleaseTemplate(data, onSubmit))

    async function onSubmit(e) {
        e.preventDefault();
        const editForm = document.getElementById('edit-form');
        let formData = new FormData(editForm);

        let artist = formData.get('artist');
        let track = formData.get('track');
        let URL = formData.get('URL');
        let bandCamp = formData.get('bandCamp');


        const body = {
            artist,
            track,
            URL,
            bandCamp,
        }
        await editRelease(ctx.params.id, body)
        ctx.setUserNav();
        ctx.page.redirect('/releases');

    }
}