var playlistId = 'PLZ0SiHbIVbOTo8DOGB4Cw_eQAONhuL_5L'
var videoId = null;
var clientId = '886659971303-l6vc35cr4fv8dfsndheivbhrq08d77oe.apps.googleusercontent.com';

var scopes = 'https://www.googleapis.com/auth/youtube';

function handleClientLoad() {
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button-google');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  // Step 3: get authorization to use private data
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  // Step 4: Load the Google+ API
  console.log('makeApiCall');
}

function checkAndPublishGoogle() {
  var videoUrl = document.getElementById('link').value;
  videoId = videoUrl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if (videoId) {
    videoId = videoId[1];
    console.log('videoId: ');
    console.log(videoId);
  } else {
    alert('Invalid YouTube video url')
  }
  gapi.client.load('youtube', 'v3').then(function() {
    var request = gapi.client.youtube.playlistItems.list({
      part: 'snippet',
      playlistId: playlistId,
      maxResults: 50
    });

    request.then(function(resp) {
      console.log('Videos in playlist: ');
      console.log(resp);
      var items = JSON.parse(resp.body).items;
      var videoIds = []
      items.forEach(function(el) {
        videoIds.push(el.snippet.resourceId.videoId);
      });
      console.log(videoIds);
      // Check if video is already there in playlist
      if (!videoIds.includes(videoId)) {
        publishGoogle();
      } else {
        console.log('Video already there in playlist hence not adding.')
      }
    });

  });
}

function publishGoogle() {

  gapi.client.load('youtube', 'v3').then(function() {
    // Step 5: Assemble the API request
    var request = gapi.client.youtube.playlistItems.insert({
      part: 'snippet',
      snippet: {
        playlistId: playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId: videoId
        }
      }
    });
    // Step 6: Execute the API request
    request.then(function(resp) {
      // var heading = document.createElement('h4');
      // var image = document.createElement('img');
      // image.src = resp.result.image.url;
      // heading.appendChild(image);
      // heading.appendChild(document.createTextNode(resp.result.displayName));
      //
      // document.getElementById('content').appendChild(heading);
      console.log(resp);
    }, function(reason) {
      console.log('Error: ' + reason.result.error.message);
    });
  });
}
