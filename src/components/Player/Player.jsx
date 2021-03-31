import React, ***REMOVED***
  useContext, useEffect, useMemo, useRef,
***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import VolumeCtx from '../../state/VolumeCtx';
import Youtube from '../Youtube/Youtube';
import './Player.scss';

/* global YT */

function Player() ***REMOVED***
  const ***REMOVED***
    muted,
    value: volume,
***REMOVED*** = useContext(VolumeCtx);

  const ***REMOVED*** setSignal, ytApi, setYtApi ***REMOVED*** = useContext(AppCtx);

  useRef(new Youtube());
  const player = useRef(null);
  const isPlayerReady = useRef(false);

  const setPlayerVolume = (value) => ***REMOVED***
    if (isPlayerReady.current) ***REMOVED***
      player.current.setVolume(value);
  ***REMOVED***
***REMOVED***;
  const setPlayerMute = (enable) => ***REMOVED***
    if (isPlayerReady.current) ***REMOVED***
      if (enable) ***REMOVED***
        player.current.mute();
    ***REMOVED*** else ***REMOVED***
        player.current.unMute();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePlayerVolume = () => setPlayerVolume(volume);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updatePlayerMute = () => setPlayerMute(muted);

  useEffect(() => ***REMOVED***
    window.onYouTubePlayerAPIReady = () => ***REMOVED***
      setYtApi(true);
  ***REMOVED***;
***REMOVED***, [setYtApi]);

  useEffect(() => ***REMOVED***
    if (ytApi) ***REMOVED***
      player.current = new YT.Player('ytplayer', ***REMOVED***
        width: '100%',
        height: '100%',
        videoId: 'WlYSqcKdkHI',
        playerVars: ***REMOVED***
          autoplay: 1,
          controls: 0,
      ***REMOVED***,
        events: ***REMOVED***
          onReady: () => ***REMOVED***
            isPlayerReady.current = true;
            updatePlayerVolume();
            updatePlayerMute();
        ***REMOVED***,
          onStateChange: (event) => ***REMOVED***
            if (event.data === YT.PlayerState.PLAYING) ***REMOVED***
              setSignal(true);
          ***REMOVED***
        ***REMOVED***,
          onError: () => ***REMOVED***
            setSignal(false);
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***);
  ***REMOVED***

    return () => ***REMOVED***
      if (isPlayerReady.current) ***REMOVED***
        player.current.destroy();
        player.current = null;
        setSignal(false);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [ytApi]);

  useEffect(() => setPlayerVolume(volume), [volume]);
  useEffect(() => setPlayerMute(muted), [muted]);

  return useMemo(() => (
    <div className="Player">
      <div id="ytplayer" />
    </div>
  ), []);
***REMOVED***

export default Player;
