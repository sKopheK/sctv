import React, ***REMOVED***
  useContext, useEffect, useMemo, useRef, useState,
***REMOVED*** from 'react';
import useSchedule from '../../hooks/useSchedule';
import AppCtx from '../../state/AppCtx';
import ChannelCtx from '../../state/ChannelCtx';
import VolumeCtx from '../../state/VolumeCtx';
import './Player.scss';

/* global YT */
const YOUTUBE_PLAYER_ID = 'ytplayer';

function Player() ***REMOVED***
  const ***REMOVED***
    muted,
    value: volume,
***REMOVED*** = useContext(VolumeCtx);

  const ***REMOVED*** setSignal, isYtApiLoaded ***REMOVED*** = useContext(AppCtx);
  const ***REMOVED***
    setCurrentShow,
    setTitle: setChannelTitle,
    id: channelId,
***REMOVED*** = useContext(ChannelCtx);
  const ***REMOVED*** getCurrentVideo, getChannelTitle ***REMOVED*** = useSchedule(channelId);

  const player = useRef(null);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);

  const setPlayerVolume = (value) => ***REMOVED***
    if (isPlayerReady) ***REMOVED***
      player.current.setVolume(value);
  ***REMOVED***
***REMOVED***;
  const setPlayerMute = (enable) => ***REMOVED***
    if (isPlayerReady) ***REMOVED***
      if (enable) ***REMOVED***
        player.current.mute();
    ***REMOVED*** else ***REMOVED***
        player.current.unMute();
    ***REMOVED***
  ***REMOVED***
***REMOVED***;
  const startBroadcast = async () => ***REMOVED***
    if (!isPlayerReady) ***REMOVED***
      return;
  ***REMOVED***
    const video = await getCurrentVideo();
    if (video) ***REMOVED***
      player.current.loadVideoById(***REMOVED***
        videoId: video.id,
        startSeconds: video.offset / 1000,
    ***REMOVED***);
  ***REMOVED***
    setCurrentShow(video);
    const channelTitle = await getChannelTitle();
    setChannelTitle(channelTitle);
***REMOVED***;

  useEffect(() => ***REMOVED***
    if (isYtApiLoaded) ***REMOVED***
      player.current = new YT.Player(YOUTUBE_PLAYER_ID, ***REMOVED***
        width: '100%',
        height: '100%',
        playerVars: ***REMOVED***
          autoplay: 1,
          controls: 0,
      ***REMOVED***,
        events: ***REMOVED***
          onReady: () => ***REMOVED***
            setPlayerReady(true);
        ***REMOVED***,
          onStateChange: (event) => ***REMOVED***
            if (event.data === YT.PlayerState.PLAYING) ***REMOVED***
              setSignal(true);
          ***REMOVED*** else if (event.data === YT.PlayerState.ENDED) ***REMOVED***
              setFinishedCount((prevValue) => prevValue + 1);
          ***REMOVED***
        ***REMOVED***,
          onError: () => ***REMOVED***
            setSignal(false);
        ***REMOVED***,
      ***REMOVED***,
    ***REMOVED***);
  ***REMOVED***

    return () => ***REMOVED***
      if (isPlayerReady) ***REMOVED***
        player.current.destroy();
        player.current = null;
        setSignal(false);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [isYtApiLoaded]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPlayerVolume(volume), [volume, isPlayerReady]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPlayerMute(muted), [muted, isPlayerReady]);
  useEffect(() => ***REMOVED***
    if (isPlayerReady) ***REMOVED***
      startBroadcast();
  ***REMOVED***

    return () => ***REMOVED***
      if (isPlayerReady) ***REMOVED***
        if (player.current) ***REMOVED***
          player.current.stopVideo();
      ***REMOVED***
        setSignal(false);
    ***REMOVED***
  ***REMOVED***;
***REMOVED***,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [isPlayerReady, channelId]);

  useEffect(() => ***REMOVED***
    if (isPlayerReady) ***REMOVED***
      startBroadcast();
  ***REMOVED***
***REMOVED***,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [finishedCount]);

  return useMemo(() => (
    <div className="Player">
      <div id=***REMOVED***YOUTUBE_PLAYER_ID***REMOVED*** />
    </div>
  ), []);
***REMOVED***

export default Player;
