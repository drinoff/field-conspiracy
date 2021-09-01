
async function Mailer(data){
  var Mailchimp = require('mailchimp-api-v3')
  
  
  var mailchimp = new Mailchimp('668aa0710d1a612f808f0a4c0c9cdf2a-us5');
  mailchimp.request({
      method: 'post',
      path: 'lists/ea5c366cbe/members/',
      body: data
  
  })
  }

module.exports = { Mailer }
