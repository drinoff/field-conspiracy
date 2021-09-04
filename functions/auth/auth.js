
const fetch = require('node-fetch');
const base64 = require('base-64');
exports.handler = async (event, context) => {
  console.log(event)
  //   Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const errorGen = msg => {
    return { statusCode: 500, body: msg };
  };
  try {
    const { email_address, pass} = JSON.parse(event.body);
    //const email = email_address;
    //const password = pass;
    if (!email) {
      return errorGen('Missing Email');
    }
    if (!password) {
      return errorGen('Missing Password');
    }
    const subscriber = {
      email: email_address,
      password: pass,
      returnSecureToken: true  
    };
    const API = `any:${process.env.FIREBASE_AUTH}`;
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`, {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
       // Authorization: `Basic ${base64.encode(creds)}`,
      },
      body: JSON.stringify(subscriber),
    });
    const data = await response.json();

    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300 
      return { statusCode: data.status, body: data.detail };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Authenticated", detail: data, }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log 
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message }),
    };
  }
};