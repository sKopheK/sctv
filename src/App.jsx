import React, ***REMOVED*** useEffect, useState ***REMOVED*** from 'react';
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
import ***REMOVED*** getStoredData, storeData ***REMOVED*** from './storage';

const SCREEN_ON = 'screenOn';
const getScreenOnValue = () => getStoredData(SCREEN_ON) === 'true';

function App() ***REMOVED***
  // cannot manage state here and get context inside useVolume
  // const [volume, setVolumeState] = useState(VOLUME_DEFAULT);
  const volume = useVolume();
  const channel = useChannel();
  const channelList = useChannelList();
  const channelChange = useChannelChange();

  const [state, setState] = useState(***REMOVED***
    screenOn: getScreenOnValue(),
    toggleScreenOn: () => ***REMOVED***
      volume.toggleBar(false);
      channel.reset();
      channel.toggleBar(true);
      channelChange.toggleBar(false);
      setState((oldState) => (***REMOVED*** ...oldState, screenOn: !oldState.screenOn ***REMOVED***));
      storeData(SCREEN_ON, !getScreenOnValue());
  ***REMOVED***,
    hasSignal: false,
    setSignal: (value) => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, hasSignal: value ***REMOVED***));
  ***REMOVED***,
    isYtApiLoaded: false,
    isRemoteVisible: true,
    setRemoteVisible: (value) => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, isRemoteVisible: value ***REMOVED***));
  ***REMOVED***,
***REMOVED***);

  useEffect(() => new Youtube(), []);
  useEffect(() => ***REMOVED***
    window.onYouTubePlayerAPIReady = () => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, isYtApiLoaded: true ***REMOVED***));
  ***REMOVED***;
***REMOVED***, []);

  return (
    <AppCtx.Provider value=***REMOVED***state***REMOVED***>
      <Overlay />
      <VolumeCtx.Provider value=***REMOVED***volume***REMOVED***>
        ***REMOVED***volume.visible && <VolumeBar value=***REMOVED***volume.value***REMOVED*** />***REMOVED***
        ***REMOVED***state.screenOn && volume.muted && <MutedStatus />***REMOVED***
        <ChannelCtx.Provider value=***REMOVED***channel***REMOVED***>
          ***REMOVED***state.screenOn && <Player />***REMOVED***
          ***REMOVED***state.screenOn && channel.visible
          && (
          <ProgrammeInfo
            channelId=***REMOVED***channel?.id***REMOVED***
            channelTitle=***REMOVED***channel?.title***REMOVED***
            programmeTitle=***REMOVED***channel?.currentShow?.title***REMOVED***
            starts=***REMOVED***channel?.currentShow?.start***REMOVED***
            ends=***REMOVED***channel?.currentShow?.end***REMOVED***
            isLoading=***REMOVED***channel?.isLoading***REMOVED***
          />
          )***REMOVED***
          <ChannelChangeCtx.Provider value=***REMOVED***channelChange***REMOVED***>
            ***REMOVED***state.screenOn && channelChange.visible
            && (
              <ChannelChange ref=***REMOVED***channelChange.input***REMOVED*** />
            )***REMOVED***
            <ChannelListCtx.Provider value=***REMOVED***channelList***REMOVED***>
              ***REMOVED***state.screenOn && channelList.visible && Array.isArray(channelList.list)
              && (
                <ChannelList list=***REMOVED***channelList.list***REMOVED*** activeChannel=***REMOVED***channel.id***REMOVED*** />
              )***REMOVED***
              <RemoteControl />
            </ChannelListCtx.Provider>
          </ChannelChangeCtx.Provider>
        </ChannelCtx.Provider>
      </VolumeCtx.Provider>
    </AppCtx.Provider>
  );
***REMOVED***

export default App;
