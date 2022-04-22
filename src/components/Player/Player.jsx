import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import useSchedule from '../../hooks/useSchedule';
import AppCtx from '../../state/AppCtx';
import ChannelCtx from '../../state/ChannelCtx';
import VolumeCtx from '../../state/VolumeCtx';
import './Player.scss';

/* global YT */
const YOUTUBE_PLAYER_ID = 'ytplayer';

function Player() {
  const {
    muted,
    value: volume,
  } = useContext(VolumeCtx);

  const { setSignal, isYtApiLoaded } = useContext(AppCtx);
  const {
    id: channelId,
    setCurrentShow,
    setTitle: setChannelTitle,
    toggleBar: toggleChannelBar,
    setLoading,
  } = useContext(ChannelCtx);
  const { getCurrentVideo, getChannelTitle, cleanup: cleanupSchedule } = useSchedule(channelId);

  const player = useRef(null);
  const [isPlayerReady, setPlayerReady] = useState(false);
  const [finishedCount, setFinishedCount] = useState(0);

  const setPlayerVolume = (value) => {
    if (isPlayerReady) {
      player.current.setVolume(value);
    }
  };
  const setPlayerMute = (enable) => {
    if (isPlayerReady) {
      if (enable) {
        player.current.mute();
      } else {
        player.current.unMute();
      }
    }
  };
  const startBroadcast = async () => {
    if (!isPlayerReady) {
      return;
    }
    setLoading(true);
    toggleChannelBar(true);
    const video = await getCurrentVideo();
    if (video) {
      player.current.loadVideoById({
        videoId: video.id,
        startSeconds: video.offset / 1000,
      });
    } else {
      setSignal(false);
    }
    setCurrentShow(video);
    const channelTitle = await getChannelTitle();
    setChannelTitle(channelTitle);
    setLoading(false);
  };

  useEffect(
    () => {
      if (isYtApiLoaded) {
        player.current = new YT.Player(YOUTUBE_PLAYER_ID, {
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 1,
            controls: 0,
          },
          events: {
            onReady: () => {
              setPlayerReady(true);
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                setSignal(true);
              } else if (event.data === YT.PlayerState.ENDED) {
                setFinishedCount((prevValue) => prevValue + 1);
              }
            },
            onError: () => {
              setSignal(false);
            },
          },
        });
      }

      return () => {
        if (isPlayerReady) {
          player.current.destroy();
          player.current = null;
          setSignal(undefined);
        }
        cleanupSchedule();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isYtApiLoaded],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPlayerVolume(volume), [volume, isPlayerReady]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setPlayerMute(muted), [muted, isPlayerReady]);
  useEffect(
    () => {
      if (isPlayerReady) {
        startBroadcast();
      } else {
        setLoading(true);
        toggleChannelBar(true);
      }

      return () => {
        if (isPlayerReady) {
          if (player.current) {
            player.current.stopVideo();
          }
          setSignal(undefined);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isPlayerReady, channelId],
  );

  useEffect(
    () => {
      if (isPlayerReady) {
        startBroadcast();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [finishedCount],
  );

  return useMemo(() => (
    <div className="Player">
      <div id={YOUTUBE_PLAYER_ID} />
    </div>
  ), []);
}

export default Player;
