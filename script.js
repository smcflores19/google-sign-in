// Sign in // Sign in // Sign in // Sign in
function handleCredentialResponse(response) {

  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  let infos = {
    fullnameL: responsePayload.name,
    photo_linkL: responsePayload.picture,
    firstL: responsePayload.given_name,
    lastL: responsePayload.family_name,
    mailL: responsePayload.email,
    id_numL: responsePayload.sub,
    id_tokenL: response.credential // Capture the ID token
  };

  fetch('https://console.firebase.google.com/project/quantifine-db-dup/overview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(infos)
  }).then(response => {
    if (response.ok) {
      alert('Token stored successfully!');
    } else {
      alert('Failed to store token.');
    }
  });

}


// decodeJwtResponse()
function decodeJwtResponse(data) {
  let tokens = data.split(".");
  return JSON.parse(atob(tokens[1]))
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: '393871169247-04jpis517k1be3h39rf4c5b5vh6vsgtc.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });

  google.accounts.id.prompt(); // Display the One Tap prompt
}
