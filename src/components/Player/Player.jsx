import React, ***REMOVED***
  useContext, useEffect, useMemo, useRef,
***REMOVED*** from 'react';
import useSchedule from '../../hooks/useSchedule';
import AppCtx from '../../state/AppCtx';
import ChannelCtx from '../../state/ChannelCtx';
import VolumeCtx from '../../state/VolumeCtx';
import './Player.scss';

/* global YT */

function Player() ***REMOVED***
  const ***REMOVED***
    muted,
    value: volume,
***REMOVED*** = useContext(VolumeCtx);

  const ***REMOVED*** setSignal, isYtApiLoaded ***REMOVED*** = useContext(AppCtx);
  const ***REMOVED*** setCurrentShow, setTitle: setChannelTitle ***REMOVED*** = useContext(ChannelCtx);
  const ***REMOVED*** getCurrentVideo, getChannelTitle ***REMOVED*** = useSchedule();

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
  const updatePlayerVolume = () => setPlayerVolume(volume);
  const updatePlayerMute = () => setPlayerMute(muted);
  const startBroadcast = async () => ***REMOVED***
    if (!isPlayerReady.current) ***REMOVED***
      return;
  ***REMOVED***
    const video = await getCurrentVideo();
    if (video) ***REMOVED***
      player.current.loadVideoById(***REMOVED***
        videoId: video.id,
        startSeconds: video.offset / 1000,
    ***REMOVED***);
      setCurrentShow(video);
  ***REMOVED*** else ***REMOVED***
      setSignal(false);
  ***REMOVED***

    const channelTitle = await getChannelTitle();
    setChannelTitle(channelTitle);
***REMOVED***;

  useEffect(() => ***REMOVED***
    if (isYtApiLoaded) ***REMOVED***
      player.current = new YT.Player('ytplayer', ***REMOVED***
        width: '100%',
        height: '100%',
        playerVars: ***REMOVED***
          autoplay: 1,
          controls: 0,
      ***REMOVED***,
        events: ***REMOVED***
          onReady: async () => ***REMOVED***
            isPlayerReady.current = true;
            updatePlayerVolume();
            updatePlayerMute();
            startBroadcast();
        ***REMOVED***,
          onStateChange: (event) => ***REMOVED***
            if (event.data === YT.PlayerState.PLAYING && isPlayerReady.current) ***REMOVED***
              setSignal(true);
          ***REMOVED*** else if (event.data === YT.PlayerState.ENDED && isPlayerReady.current) ***REMOVED***
              startBroadcast();
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
  [isYtApiLoaded]);

  useEffect(() => setPlayerVolume(volume), [volume]);
  useEffect(() => setPlayerMute(muted), [muted]);

  return useMemo(() => (
    <div className="Player">
      <div id="ytplayer" />
    </div>
  ), []);
***REMOVED***

export default Player;
