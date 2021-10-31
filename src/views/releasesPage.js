import { html } from "https://unpkg.com/lit-html?module";
import { getReleases } from "../api/data.js";
import { deleteRelease } from "../api/data.js";

const releasesTemplate = (data) => html `
  <section class="releasesWrapper">${data.length !==0? data.map(releaseCard): 'No Releases Currently'}</section>
`;

const releaseCard = (item) => html `
  <article class="singleRelease">
    <a href=${item[1].bandCamp} target="_blank">
      <div class="imgWrapper">
        <img class="releaseImg" src=${item[1].URL} alt="releaseImage" />
      </div>
      <div class="releaseInfo">
        <p>${item[1].artist}</p>
        <p class="beforeElement">${item[1].track}</p>
      </div>
      <div class="mobileReleaseInfo">
        <p class="mobileArtist">${item[1].artist}</p>
        <p class="mobileTrack">${item[1].track}</p>
      </div>
    </a>
    <div class="creativesAdminButtons">
            ${(sessionStorage.getItem("email") === 'fieldconspiracy@gmail.com')
            ?
            html`<a class="editButton" href="/releases/edit/${item[0]}">Edit</a>
            <button  id = ${item[0]} href='javascript:void(0)' class="creativesDeleteButton">Delete</button>`
            : 
            html``}
        </div>
  </article>
`;

export async function releasesPage(ctx) {
  let dataObj = await getReleases();
  let data;
  if(dataObj===null){
    data = [];
  }else{
    data = Object.entries(dataObj);
  }
  
  ctx.render(releasesTemplate(data, releaseCard));

  const delButton = document.getElementsByClassName("releasesWrapper")[0];
  delButton.addEventListener("click", (e) => {
    if (e.target.textContent === "Delete") {
      e.preventDefault();
      const id = e.target.id;
      onDelete(id);
    }
  });

  async function onDelete(id) {
    const confirmed = confirm("Are you sure you want to delete the item?");
    if (confirmed) {
      await deleteRelease(id);
      ctx.page.redirect("/releases");
    }
  }
}