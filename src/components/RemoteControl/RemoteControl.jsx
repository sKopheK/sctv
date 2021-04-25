import React, ***REMOVED***
  useCallback, useContext, useMemo,
***REMOVED*** from 'react';
import AppCtx from '../../state/AppCtx';
import ChannelCtx from '../../state/ChannelCtx';
import VolumeCtx from '../../state/VolumeCtx';
import Button from '../Button/Button';
import MainSwitch from '../MainSwitch/MainSwitch';
import SoundToggle from '../SoundToggle/SoundToggle';
import './grid.scss';
import './RemoteControl.scss';

function RemoteControl() ***REMOVED***
  const ***REMOVED***
    visible: volumeBarVisible,
    decrease: decreaseVol,
    increase: increaseVol,
    toggleBar: toggleVolumeBar,
***REMOVED*** = useContext(VolumeCtx);

  const ***REMOVED*** toggleBar: toggleProgrammeInfo ***REMOVED*** = useContext(ChannelCtx);
  const ***REMOVED*** screenOn ***REMOVED*** = useContext(AppCtx);

  const upClick = useCallback(() => ***REMOVED***
***REMOVED***, []);
  const downClick = useCallback(() => ***REMOVED***
***REMOVED***, []);
  const leftClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (!volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
      toggleProgrammeInfo(false);
  ***REMOVED*** else ***REMOVED***
      decreaseVol();
  ***REMOVED***
***REMOVED***, [screenOn, volumeBarVisible, toggleVolumeBar, toggleProgrammeInfo, decreaseVol]);
  const rightClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (!volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
      toggleProgrammeInfo(false);
  ***REMOVED*** else ***REMOVED***
      increaseVol();
  ***REMOVED***
***REMOVED***, [screenOn, volumeBarVisible, toggleVolumeBar, toggleProgrammeInfo, increaseVol]);
  const okClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
  ***REMOVED*** else ***REMOVED***
      toggleProgrammeInfo();
  ***REMOVED***
***REMOVED***, [screenOn, volumeBarVisible, toggleVolumeBar, toggleProgrammeInfo]);

  return useMemo(() => (
    <div className="RemoteControl">
      <div className="content logo grid">
        <MainSwitch className="grid-to" />
        <SoundToggle className="grid-so" />
        <Button className="grid-n1 highlighted">1</Button>
        <Button className="grid-n2 highlighted">2</Button>
        <Button className="grid-n3 highlighted">3</Button>
        <Button className="grid-n4 highlighted">4</Button>
        <Button className="grid-n5 highlighted">5</Button>
        <Button className="grid-n6 highlighted">6</Button>
        <Button className="grid-n7 highlighted">7</Button>
        <Button className="grid-n8 highlighted">8</Button>
        <Button className="grid-n9 highlighted">9</Button>
        <Button className="grid-n0 highlighted">0</Button>
        <Button className="grid-m">Menu</Button>
        <Button className="grid-ex">Exit</Button>
        <Button className="grid-up btn-arrow btn-arrow--up" onClick=***REMOVED***upClick***REMOVED*** onMouseDown=***REMOVED***upClick***REMOVED*** />
        <Button className="grid-lt btn-arrow btn-arrow--lt" onClick=***REMOVED***leftClick***REMOVED*** onMouseDown=***REMOVED***leftClick***REMOVED*** />
        <Button className="grid-rt btn-arrow btn-arrow--rt" onClick=***REMOVED***rightClick***REMOVED*** onMouseDown=***REMOVED***rightClick***REMOVED*** />
        <Button className="grid-dn btn-arrow btn-arrow--dn" onClick=***REMOVED***downClick***REMOVED*** onMouseDown=***REMOVED***downClick***REMOVED*** />
        <Button className="grid-ok grid--h-center btn--round btn--round-big" onClick=***REMOVED***okClick***REMOVED***>OK</Button>
      </div>
    </div>
  ), [upClick, leftClick, rightClick, downClick, okClick]);
***REMOVED***

export default RemoteControl;
