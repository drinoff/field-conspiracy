import { html } from 'https://unpkg.com/lit-html?module';
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

    <!-- newstler form -->
    <div id="newstlerForm" class="newstlerForm">

        <form action="https://gmail.us5.list-manage.com/subscribe/post?u=6f6f321dea368576caa3c575b&amp;id=ea5c366cbe"
            method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate"
            target="_blank" novalidate>
            <div id="mc_embed_signup_scroll">
                <h2>Subscribe</h2>
                <!-- <div class="indicates-required"><span class="asterisk">*</span> indicates required</div> -->
                <div class="mc-field-group">
                    <label for="mce-EMAIL">Email Address <span class="asterisk">*</span>
                    </label>
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                </div>
                <div class="mc-field-group">
                    <label for="mce-FNAME">First Name </label>
                    <input type="text" value="" name="FNAME" class="" id="mce-FNAME">
                </div>
                <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                    <input type="text" name="b_6f6f321dea368576caa3c575b_ea5c366cbe" tabindex="-1" value="">
                </div>
                <div class="clear">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                </div>
            </div>
        </form>
    </div>
    <!-- end of newstler form -->

    <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'>
    </script>
    <script type='text/javascript'>
        (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);
    </script>

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

    ctx.render(homeTemplate(data));
    const button = document.getElementById('mc-embedded-subscribe');
    const newstler = document.getElementsByClassName('newstler')[0];
    const newstlerWrapper = document.getElementById('newstlerForm');
    newstler.addEventListener('click', ()=>{
        newstlerWrapper.style.display='flex';
    })
    console.log(button)

    button.addEventListener('click', () => {
        newstlerWrapper.style.display='none'
        document.getElementById('mce-EMAIL').value='';
        document.getElementById('mce-FNAME').value='';
    });

}