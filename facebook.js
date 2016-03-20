var fbGoupID = '638818812812505'
var friendList = [];
  // This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.

    // document.getElementById('fblogin').style = 'display: none;'
    testAPI();
    getFriends();
  } else {
    // document.getElementById('fblogin').style = 'display: block;'
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
    FB.login(function(response) {
      statusChangeCallback(response), {
        scope: 'public_profile,email,publish_actions,user_managed_groups'
      };
    });
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId: '1702320843356340',
    cookie: true, // enable cookies to allow the server to access
    // the session
    xfbml: true, // parse social plugins on this page
    version: 'v2.5' // use graph api version 2.5
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log(response);
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}

function getFriends() {
  //Function to get friends of the user
  FB.api('/me/friends', function(response) {
    console.log('Friend list: ')
    console.log(response);
  })
}

function publishFacebook() {
  //Function to publish the post

  // facebook
  var data = {
    link: document.getElementById('link').value,
    message: document.getElementById('description').value
  }
  console.log('Sending post to facebook:');
  console.log(data);
  FB.api('/' + fbGoupID + '/feed', 'post', data, function(response) {
    console.log('Posted to facebook');
    console.log(response);
    window.open('https://facebook.com/groups/' + fbGoupID, '_blank');
  })
}
