import {html} from 'https://unpkg.com/lit-html?module';
import { getInstaVideos } from '../api/data.js';

const homeTemplate = (data) => html`
<video width="1080" height="720" src="../../assets/landingVideo.webm" autoplay loop muted>
    Your browser does not support the video tag.
</video>
<div class="description">
    <p>Field Conspiracy is a social experiment & a record label, which nurtures community and creativity. It
        aims to be a playground of creative space for musicians, where the inspiration and courage to be free in
        a community are leading the life we want to live – so that we can live the life we want to lead.
        Together we imagine a reality where the “human management systems” are defined by the interest of
        communities to live a life that provides them with the security and a space to be free in the creation
        of their own reality.</p>
    <p>When we realize that more can be achieved through the force of creative love than destructive fear and
        fight, then we open the door to collective humanity. The choice lies within all of us, here and now and
        it is what has brought us together in this experiment of positive radicalism in a form of co-operation
        over competition.</p>

</div>
<section class="instaVideos">
    <!-- instagram video links goes here dynamicaly -->
    ${data.map(cardTemplate)}
</section>
<div class="instaDescription">instagram @fieldconspiracy</div>
<section class="newstlerWrapper">
    <article class="newstler">Subscribe to Newstler</article>
    <p class="newstlerDesc">Subscribe to Our Newstler to recieve occasional news and updates. We do not share your email
        to any third
        parties. For more information, please view our Privacy Policy.</p>
</section>
`;

const cardTemplate = (item) => html`
<article class='instaVideosFetched'>
    <img src=${item.URL} alt="" />
</article>
`;

document.getElementsByClassName('instaVideos')[0];

export async function homePage(ctx) {
    let data = await getInstaVideos();
    console.log(data);
    ctx.render(homeTemplate(data));

}