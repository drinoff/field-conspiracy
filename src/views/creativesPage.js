import { html } from 'https://unpkg.com/lit-html?module';
import { getCreatives } from '../api/data.js';

const creativesTemplate = (data) => html`

<section class="artistsWrapper">
    ${data.map(creativeCard)}
</section>

`;

const creativeCard = (item) => html`
<article class="singleArtist">

    <div class="imgWrapper">
        <img class="artistImg" src=${item[1].img} alt="artistImage" />
    </div>
    <div class="artistInfo">
        <p>${item[1].name}</p>
    </div>

</article>

`;

export async function creativesPage(ctx) {
    let dataObj = await getCreatives();
    let data = Object.entries(dataObj)
    console.log(data)
    ctx.render(creativesTemplate(data));
}