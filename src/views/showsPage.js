import { html } from "https://unpkg.com/lit-html?module";
import { getShows } from "../api/data.js";

const showsTemplate = (data) => html `
  <div class="allShowsWrapper">${data.map(showsCard)}</div>
`;

const showsCard = (item) => html `
  <article className="showWrapper">
    <section class="imgAndDesc">
      <div>
        <img src=${item[1].img} alt="showImg" />
      </div>

      <div>
        <h1>${item[1].title}</h1>
        <p>${item[1].description}</p>
        <p>${item[1].date}</p>
      </div>
    </section>
    <div class="embedOptions">
      <p>Listen to the show here:</p>
      <p>
        <iframe
          width="100%"
          height="66"
          scrolling="no"
          frameborder="no"
          allow="autoplay"
          src=${item[1].embed}
        >
        </iframe>
      </p>
    </div>
  </article>
`;

export async function showsPage(ctx) {
    let dataObj = await getShows();
    let data = Object.entries(dataObj);
    console.log(data);

    ctx.render(showsTemplate(data, showsCard));
}