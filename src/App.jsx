import React, ***REMOVED*** useState ***REMOVED*** from 'react';
import './App.scss';
import MutedStatus from './components/MutedStatus/MutedStatus';
import Overlay from './components/Overlay/Overlay';
// import Player from './components/Player/Player';
import RemoteControl from './components/RemoteControl/RemoteControl';
import VolumeBar from './components/VolumeBar/VolumeBar';
import useVolume from './hooks/useVolume';
import AppCtx from './state/AppCtx';
import VolumeCtx from './state/VolumeCtx';

function App() ***REMOVED***
  // cannot manage state here and get context inside useVolume
  // const [volume, setVolumeState] = useState(VOLUME_DEFAULT);
  const volume = useVolume();

  const [state, setState] = useState(***REMOVED***
    screenOn: false,
    toggleScreenOn: () => ***REMOVED***
      volume.toggleBar(false);
      setState((oldState) => (***REMOVED*** ...oldState, screenOn: !oldState.screenOn ***REMOVED***));
  ***REMOVED***,
***REMOVED***);

  return (
    <AppCtx.Provider value=***REMOVED***state***REMOVED*** className="App">
      <VolumeCtx.Provider value=***REMOVED***volume***REMOVED***>
        ***REMOVED***/* <Player /> */***REMOVED***
        ***REMOVED***volume.muted ? 1 : 0***REMOVED***
        ***REMOVED***volume.value***REMOVED***
        ***REMOVED***volume.visible ? 1 : 0***REMOVED***
        <Overlay />
        ***REMOVED***volume.visible && <VolumeBar value=***REMOVED***volume.value***REMOVED*** />***REMOVED***
        ***REMOVED***state.screenOn && volume.muted && <MutedStatus />***REMOVED***
        <RemoteControl />
      </VolumeCtx.Provider>
    </AppCtx.Provider>
  );
***REMOVED***

export default App;
