/* global gapi */

class Youtube {
  constructor() {
    // Load the JavaScript client library.
    gapi.load('client', this.initGapi);

    // Load the IFrame Player API code asynchronously.
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/player_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  // eslint-disable-next-line class-methods-use-this
  initGapi() {
    gapi.client.init({
      apiKey: '***REMOVED***',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    }).then();
  }
}

export default Youtube;
