/* global gapi */

class Youtube ***REMOVED***
  constructor() ***REMOVED***
    // Load the JavaScript client library.
    gapi.load('client', this.initGapi);

    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
***REMOVED***

  // eslint-disable-next-line class-methods-use-this
  initGapi() ***REMOVED***
    gapi.client.init(***REMOVED***
      apiKey: 'AIzaSyCejxOr9AhjVezb1E7tqoese3plIEszcOc',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  ***REMOVED***).then();
***REMOVED***
***REMOVED***

export default Youtube;
