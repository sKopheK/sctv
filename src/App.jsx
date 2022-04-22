import React, { useEffect, useState } from 'react';
import './App.scss';
import ChannelChange from './components/ChannelChange/ChannelChange';
import ChannelList from './components/ChannelList/ChannelList';
import MutedStatus from './components/MutedStatus/MutedStatus';
import Overlay from './components/Overlay/Overlay';
import Player from './components/Player/Player';
import ProgrammeInfo from './components/ProgrammeInfo/ProgrammeInfo';
import RemoteControl from './components/RemoteControl/RemoteControl';
import VolumeBar from './components/VolumeBar/VolumeBar';
import Youtube from './components/Youtube/Youtube';
import useChannel from './hooks/useChannel';
import useChannelChange from './hooks/useChannelChange';
import useChannelList from './hooks/useChannelList';
import useVolume from './hooks/useVolume';
import AppCtx from './state/AppCtx';
import ChannelChangeCtx from './state/ChannelChangeCtx';
import ChannelCtx from './state/ChannelCtx';
import ChannelListCtx from './state/ChannelListCtx';
import VolumeCtx from './state/VolumeCtx';
import { getStoredData, storeData } from './storage';

const SCREEN_ON = 'screenOn';
const getScreenOnValue = () => getStoredData(SCREEN_ON) === 'true';

function App() {
  // cannot manage state here and get context inside useVolume
  // const [volume, setVolumeState] = useState(VOLUME_DEFAULT);
  const volume = useVolume();
  const channel = useChannel();
  const channelList = useChannelList();
  const channelChange = useChannelChange();

  const [state, setState] = useState({
    screenOn: getScreenOnValue(),
    toggleScreenOn: () => {
      volume.toggleBar(false);
      channel.toggleBar(true);
      channelChange.toggleBar(false);
      channelList.toggleBar(false);
      setState((oldState) => ({ ...oldState, screenOn: !oldState.screenOn }));
      storeData(SCREEN_ON, !getScreenOnValue());
    },
    hasSignal: undefined,
    setSignal: (value) => {
      setState((oldState) => ({ ...oldState, hasSignal: value }));
    },
    isYtApiLoaded: false,
    isRemoteVisible: true,
    setRemoteVisible: (value) => {
      setState((oldState) => ({ ...oldState, isRemoteVisible: value }));
    },
  });

  useEffect(() => new Youtube(), []);
  useEffect(() => {
    window.onYouTubePlayerAPIReady = () => {
      setState((oldState) => ({ ...oldState, isYtApiLoaded: true }));
    };
  }, []);

  const isLoading = channel?.isLoading || state.hasSignal === undefined;

  return (
    <AppCtx.Provider value={state}>
      <Overlay />
      <VolumeCtx.Provider value={volume}>
        {volume.visible && <VolumeBar value={volume.value} />}
        {state.screenOn && volume.muted && <MutedStatus />}
        <ChannelCtx.Provider value={channel}>
          {state.screenOn && <Player />}
          {state.screenOn && channel.visible && !channelList.visible
          && (
          <ProgrammeInfo
            channelId={channel?.id}
            channelTitle={channel?.title}
            programmeTitle={channel?.currentShow?.title}
            starts={channel?.currentShow?.start}
            ends={channel?.currentShow?.end}
            isLoading={isLoading}
          />
          )}
          <ChannelChangeCtx.Provider value={channelChange}>
            {state.screenOn && channelChange.visible
            && (
              <ChannelChange ref={channelChange.input} />
            )}
            <ChannelListCtx.Provider value={channelList}>
              {state.screenOn && channelList.visible && Array.isArray(channelList.list)
              && (
                <ChannelList list={channelList.list} activeChannel={channel.id} />
              )}
              <RemoteControl />
            </ChannelListCtx.Provider>
          </ChannelChangeCtx.Provider>
        </ChannelCtx.Provider>
      </VolumeCtx.Provider>
    </AppCtx.Provider>
  );
}

export default App;
