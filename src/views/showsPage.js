import { html } from "https://unpkg.com/lit-html?module";
import { getShows } from "../api/data.js";
import { deleteShow } from "../api/data.js";

const showsTemplate = (data) => html `
  <div class="allShowsWrapper">${data.map(showsCard)}</div>
`;

const showsCard = (item) => html `
  <article class="showWrapper">
    <section class="imgAndDesc">
      <div>
        <img src=${item[1].img} alt="showImg" />
      </div>

      <div class="showDesc">
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
    <div class="creativesAdminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="creativesEditButton" id ='${item[0]}' href="#">Edit</a>
            <button  href='javascript:void(0)' class="creativesDeleteButton">Delete</button>`
            : 
            html``}
        </div>
  </article>
`;

export async function showsPage(ctx) {
    let dataObj = await getShows();
    let data = Object.entries(dataObj);
    console.log(data);

    ctx.render(showsTemplate(data, showsCard));

    const delButton = document.getElementsByClassName('creativesAdminButtons')[0];
    delButton.addEventListener('click',(e)=>{
        e.preventDefault();
        if(e.target.textContent === 'Delete'){
            const id = e.target.previousElementSibling.id;
            onDelete(id);
        }else if(e.target.textContent === 'Edit'){
           const id = e.target.id;
            ctx.page.redirect(`/shows/${id}`)
        }
    })

    async function onDelete(id) {
            const confirmed = confirm('Are you sure you want to delete the item?');
        if (confirmed) {
            await deleteShow(id);
            ctx.page.redirect('/shows');
        }
        
        
    }
}