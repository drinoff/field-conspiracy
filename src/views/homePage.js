import { html } from 'https://unpkg.com/lit-html?module';
import { getInstaVideos } from '../api/data.js';


const homeTemplate = (data, onsubmit) => html`
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
<div class="instaDescription">instagram @fieldconspiracy</div>
<section class="instaVideos">
    <!-- instagram video links goes here dynamicaly -->
    ${data.map(cardTemplate)}
</section>
<section class="newstlerWrapper">
    <article class="newstler">Subscribe to Newstler</article>
    <p class="newstlerDesc">Subscribe to Our Newstler to recieve occasional news and updates. We do not share your email
        to any third
        parties. For more information, please view our Privacy Policy.</p>

        <form action="https://gmail.us5.list-manage.com/subscribe/post" method="POST">
    <input type="hidden" name="u" value="6f6f321dea368576caa3c575b">
    <input type="hidden" name="id" value="ea5c366cbe">
    

    <!-- people should not fill these in and expect good things -->
    <div class="field-shift" aria-label="Please leave the following three fields empty">
        <label for="b_name">Name: </label>
        <input type="text" name="b_name" tabindex="-1" value="" placeholder="Freddie" id="b_name">

        <label for="b_email">Email: </label>
        <input type="email" name="b_email" tabindex="-1" value="" placeholder="youremail@gmail.com" id="b_email">

        <label for="b_comment">Comment: </label>
        <textarea name="b_comment" tabindex="-1" placeholder="Please comment" id="b_comment"></textarea>
    </div>

    <div id="mergeTable" class="mergeTable">
        
        
        <div class="mergeRow dojoDndItem mergeRow-email" id="mergeRow-0">
            <label for="MERGE0">Email Address <span class="req asterisk">*</span></label>
            <div class="field-group">
                <input type="email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" value="">
                
                
            </div>
            
        </div>
        
        
        
        <div class="mergeRow dojoDndItem mergeRow-text" id="mergeRow-1">
            <label for="MERGE1">First Name</label>
            <div class="field-group">
                <input type="text" name="MERGE1" id="MERGE1" size="25" value="">
                
                
            </div>
            
        </div>
        
        


        

        

        
    </div>

    <div class="submit_container clear">
        <input type="submit" class="formEmailButton" name="submit" value="Subscribe">
    </div>
    <input type="hidden" name="ht" value="4a0ffbe8fae9a418dd47f8efa6ead371b41d6cde:MTYzMDUwNTE3MS40OTk5">
    <input type="hidden" name="mc_signupsource" value="hosted">
</form>


    </div>

</section>
`;

const cardTemplate = (item) => html`
<article class='instaVideosFetched'>
    <img src=${item.URL} alt="" />
    <p class="instaVideosPlay">${item.artist} - ${item.track}<i class="fas fa-play"></i></p>

</article>
`;



export async function homePage(ctx) {
    let data = await getInstaVideos();
    ctx.render(homeTemplate(data, onsubmit));
    
           
    const button = document.getElementById('mc-embedded-subscribe');
    const newstler = document.getElementsByClassName('newstler')[0];
    const newstlerWrapper = document.getElementById('newstlerForm');
    newstler.addEventListener('click', () => {
        
        
    })


}