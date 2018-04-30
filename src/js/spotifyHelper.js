const $ = require('jquery');

module.exports = {
  login,
  getUserData
};
function login(callback) {

  var CLIENT_ID = '0696905272324e6c9cff8bc6aaa8864e';
  console.log(process.env.NODE_ENV);
  var REDIRECT_URI = 'http://localhost:3000';
  // var REDIRECT_URI = 'http://vibes.danielpagharion.com';
  function getLoginURL(scopes) {
    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
  }

  var url = getLoginURL([
    'user-read-email'
  ]);

  window.addEventListener("message", function(event) {
      var hash = event;
      if (hash.type === 'access_token') {
          callback(hash.access_token);
      }
  }, false);
  window.location.assign(url);
}

function getUserData(accessToken) {
  return $.ajax({
      url: 'https://api.spotify.com/v1/me',
      headers: {
         'Authorization': 'Bearer ' + accessToken
      },
      success: function(response) {
        console.log(response);
      }
  });
}
