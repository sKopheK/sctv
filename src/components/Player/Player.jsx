import React from 'react';
import Youtube from '../Youtube/Youtube';
import './Player.scss';

/* global YT */

class Player extends React.Component ***REMOVED***
    // eslint-disable-next-line react/sort-comp
    #ytApi;

    player;

    constructor() ***REMOVED***
      super();
      this.#ytApi = new Youtube();

      this.init();
  ***REMOVED***

    render() ***REMOVED***
      return (
        <div className="Player">
          <div id="ytplayer" />
        </div>
      );
  ***REMOVED***

    init() ***REMOVED***
      if (!window.ytApiReady) ***REMOVED***
        setTimeout(this.init, 1000);
        return;
    ***REMOVED***

      this.player = new YT.Player('ytplayer', ***REMOVED***
        width: '100%',
        height: '100%',
        videoId: 'WlYSqcKdkHI',
        playerVars: ***REMOVED***
          autoplay: 1,
      ***REMOVED***,
        events: ***REMOVED***
          onError: console.log,
      ***REMOVED***,
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

export default Player;
