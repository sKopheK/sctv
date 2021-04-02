import React, ***REMOVED*** useEffect, useState ***REMOVED*** from 'react';
import './App.scss';
import MutedStatus from './components/MutedStatus/MutedStatus';
import Overlay from './components/Overlay/Overlay';
import Player from './components/Player/Player';
import ProgrammeInfo from './components/ProgrammeInfo/ProgrammeInfo';
import RemoteControl from './components/RemoteControl/RemoteControl';
import VolumeBar from './components/VolumeBar/VolumeBar';
import Youtube from './components/Youtube/Youtube';
import useChannel from './hooks/useChannel';
import useVolume from './hooks/useVolume';
import AppCtx from './state/AppCtx';
import ChannelCtx from './state/ChannelCtx';
import VolumeCtx from './state/VolumeCtx';

function App() ***REMOVED***
  // cannot manage state here and get context inside useVolume
  // const [volume, setVolumeState] = useState(VOLUME_DEFAULT);
  const volume = useVolume();
  const channel = useChannel();

  const [state, setState] = useState(***REMOVED***
    screenOn: false,
    toggleScreenOn: () => ***REMOVED***
      volume.toggleBar(false);
      channel.toggleBar(false);
      setState((oldState) => (***REMOVED*** ...oldState, screenOn: !oldState.screenOn ***REMOVED***));
  ***REMOVED***,
    hasSignal: false,
    setSignal: (value) => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, hasSignal: value ***REMOVED***));
  ***REMOVED***,
    isYtApiLoaded: false,
***REMOVED***);

  useEffect(() => new Youtube(), []);
  useEffect(() => ***REMOVED***
    window.onYouTubePlayerAPIReady = () => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, isYtApiLoaded: true ***REMOVED***));
  ***REMOVED***;
***REMOVED***, []);

  return (
    <AppCtx.Provider value=***REMOVED***state***REMOVED*** className="App">
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
          />
          )***REMOVED***
          <RemoteControl />
        </ChannelCtx.Provider>
      </VolumeCtx.Provider>
    </AppCtx.Provider>
  );
***REMOVED***

export default App;
