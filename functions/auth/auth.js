// for a full working demo of Netlify Identity + Functions, see https://netlify-gotrue-in-react.netlify.com/

const fetch = require('node-fetch')

const handler = async function (event, context) {
  const { email_address, pass} = JSON.parse(event.body);
    
  
  try {
    const API = `any:${process.env.FIREBASE_AUTH}`;
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify(subscriber),
    });

    const data = await response.json();
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ identity, user, msg: data.value }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
