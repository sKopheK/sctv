/* global gapi */

class Youtube
***REMOVED***
    constructor()
    ***REMOVED***
        // Load the JavaScript client library.
        gapi.load('client', this.initGapi);

        // Load the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  ***REMOVED***

    initGapi()
    ***REMOVED***
        gapi.client.init(***REMOVED***
            'apiKey': '***REMOVED***',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
      ***REMOVED***).then();
  ***REMOVED***
***REMOVED***

export default Youtube;