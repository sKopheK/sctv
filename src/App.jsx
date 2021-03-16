import './App.scss';
import React, ***REMOVED*** useState ***REMOVED*** from 'react';
import Overlay from './components/Overlay/Overlay';
// import Player from './components/Player/Player';
import RemoteControl from './components/RemoteControl/RemoteControl';
import AppCtx from './AppCtx';

function App() ***REMOVED***
  const [state, setState] = useState(***REMOVED***
    screenOn: false,
    toggleScreenOn: () => ***REMOVED***
      setState((oldState) => (***REMOVED*** ...oldState, screenOn: !oldState.screenOn ***REMOVED***));
  ***REMOVED***,
***REMOVED***);
  return (
    <AppCtx.Provider value=***REMOVED***state***REMOVED*** className="App">
      ***REMOVED***/* <Player /> */***REMOVED***
      <Overlay />
      <RemoteControl />
    </AppCtx.Provider>
  );
***REMOVED***

export default App;
