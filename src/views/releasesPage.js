import { html } from 'https://unpkg.com/lit-html?module';
import { getReleases } from '../api/data.js'


const releasesTemplate = (data) => html`
    <section class="releasesWrapper">
        ${data.map(releaseCard)}
    </section>
`;

const releaseCard = (item) => html`
    <article class="singleRelease">
        <a href=${item.bandCamp} target="_blank">
            <div class="imgWrapper">
                <img class="releaseImg" src=${item.URL} alt="releaseImage" />
            </div>
            <div class="releaseInfo">
                <p>${item.artist}</p>
                <p>${item.track}</p>
            </div>
        </a>
    </article>
   

`;

export async function releasesPage(ctx) {

    let data = await getReleases();
    ctx.render(releasesTemplate(data));

}