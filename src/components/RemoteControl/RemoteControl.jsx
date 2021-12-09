import React, ***REMOVED***
  useCallback, useContext, useMemo,
***REMOVED*** from 'react';
import useTimeout from '../../hooks/useTimeout';
import ***REMOVED*** REMOTE_HIDE_TIMEOUT ***REMOVED*** from '../../settings';
import AppCtx from '../../state/AppCtx';
import ChannelChangeCtx from '../../state/ChannelChangeCtx';
import ChannelCtx from '../../state/ChannelCtx';
import ChannelListCtx from '../../state/ChannelListCtx';
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
  const ***REMOVED***
    toggleBar: toggleProgrammeInfo,
    setId: setChannelId,
    id: channelId,
***REMOVED*** = useContext(ChannelCtx);
  const ***REMOVED***
    visible: channelListVisible,
    toggleBar: toggleChannelList,
***REMOVED*** = useContext(ChannelListCtx);
  const ***REMOVED***
    visible: channelChangeVisible,
    toggleBar: toggleChannelChange,
    textInput: channelChangeTextInput,
    pressKey: channelChangeAddChar,
    resetTextInput: channelChangeResetTextInput,
***REMOVED*** = useContext(ChannelChangeCtx);
  const ***REMOVED***
    screenOn,
    toggleScreenOn,
    isRemoteVisible,
    setRemoteVisible,
***REMOVED*** = useContext(AppCtx);

  const changeChannel = useCallback((diff) => ***REMOVED***
    if (!screenOn) return;
    setChannelId(channelId + (channelListVisible ? -diff : diff));
    if (volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
  ***REMOVED***
    if (!channelListVisible) ***REMOVED***
      toggleProgrammeInfo(true);
  ***REMOVED***
***REMOVED***, [
    screenOn,
    setChannelId,
    channelId,
    volumeBarVisible,
    channelListVisible,
    toggleProgrammeInfo,
    toggleVolumeBar,
  ]);
  const channelClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (!channelListVisible) ***REMOVED***
      toggleVolumeBar(false);
      toggleProgrammeInfo(false);
      toggleChannelChange(false);
  ***REMOVED***
    toggleChannelList();
***REMOVED***, [
    channelListVisible,
    screenOn,
    toggleChannelList,
    toggleProgrammeInfo,
    toggleVolumeBar,
    toggleChannelChange,
  ]);
  const upClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    changeChannel(1);
***REMOVED***, [changeChannel, screenOn]);
  const downClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    changeChannel(-1);
***REMOVED***, [changeChannel, screenOn]);
  const leftClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (!volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
      toggleProgrammeInfo(false);
      toggleChannelList(false);
      toggleChannelChange(false);
  ***REMOVED*** else ***REMOVED***
      decreaseVol();
  ***REMOVED***
***REMOVED***, [
    screenOn,
    volumeBarVisible,
    toggleVolumeBar,
    toggleProgrammeInfo,
    toggleChannelList,
    toggleChannelChange,
    decreaseVol,
  ]);
  const rightClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (!volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
      toggleProgrammeInfo(false);
      toggleChannelList(false);
      toggleChannelChange(false);
  ***REMOVED*** else ***REMOVED***
      increaseVol();
  ***REMOVED***
***REMOVED***, [
    screenOn,
    volumeBarVisible,
    toggleVolumeBar,
    toggleProgrammeInfo,
    toggleChannelList,
    toggleChannelChange,
    increaseVol,
  ]);
  const okClick = useCallback(() => ***REMOVED***
    if (!screenOn) return;
    if (channelChangeVisible) ***REMOVED***
      toggleChannelChange();
      setChannelId(Number(channelChangeTextInput));
      toggleProgrammeInfo();
  ***REMOVED*** else if (volumeBarVisible) ***REMOVED***
      toggleVolumeBar();
  ***REMOVED*** else if (channelListVisible) ***REMOVED***
      toggleChannelList();
  ***REMOVED*** else ***REMOVED***
      toggleProgrammeInfo();
  ***REMOVED***
***REMOVED***, [
    screenOn,
    channelChangeTextInput,
    channelChangeVisible,
    volumeBarVisible,
    channelListVisible,
    toggleVolumeBar,
    toggleProgrammeInfo,
    toggleChannelList,
    toggleChannelChange,
    setChannelId,
  ]);
  const numberClick = useCallback(
    (number) => ***REMOVED***
      if (!screenOn) ***REMOVED***
        toggleScreenOn();
    ***REMOVED***
      if (!channelChangeVisible) ***REMOVED***
        toggleVolumeBar(false);
        toggleProgrammeInfo(false);
        toggleChannelList(false);
        toggleChannelChange(true);
        channelChangeResetTextInput();
    ***REMOVED***
      channelChangeAddChar(number);
  ***REMOVED***,
    [screenOn, channelChangeVisible],
  );

  const hideRemote = useCallback(
    () => setRemoteVisible(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRemoteVisible, isRemoteVisible],
  );
  useTimeout(hideRemote, screenOn ? REMOTE_HIDE_TIMEOUT : 2 ** 31 - 1);

  return useMemo(() => (
    <div className=***REMOVED***`RemoteControl$***REMOVED***isRemoteVisible ? '' : ' is-hidden'***REMOVED***`***REMOVED***>
      <div className="content logo grid">
        <MainSwitch className="grid-to" />
        <SoundToggle className="grid-so" />
        ***REMOVED***Array(10).fill(null).map((_, i) => i).map((i) => (
          <Button className=***REMOVED***`grid-n$***REMOVED***i***REMOVED*** highlighted`***REMOVED*** onClick=***REMOVED***() => numberClick(i)***REMOVED*** key=***REMOVED***`nr$***REMOVED***i***REMOVED***`***REMOVED***>***REMOVED***i***REMOVED***</Button>
        ))***REMOVED***
        <Button className="grid-ch" onClick=***REMOVED***channelClick***REMOVED***>Ch</Button>
        <Button className="grid-m">Menu</Button>
        <Button className="grid-ex">Exit</Button>
        <Button className="grid-up btn-arrow btn-arrow--up" onClick=***REMOVED***upClick***REMOVED*** onMouseDown=***REMOVED***upClick***REMOVED*** />
        <Button className="grid-lt btn-arrow btn-arrow--lt" onClick=***REMOVED***leftClick***REMOVED*** onMouseDown=***REMOVED***leftClick***REMOVED*** />
        <Button className="grid-rt btn-arrow btn-arrow--rt" onClick=***REMOVED***rightClick***REMOVED*** onMouseDown=***REMOVED***rightClick***REMOVED*** />
        <Button className="grid-dn btn-arrow btn-arrow--dn" onClick=***REMOVED***downClick***REMOVED*** onMouseDown=***REMOVED***downClick***REMOVED*** />
        <Button className="grid-ok grid--h-center btn--round btn--round-big" onClick=***REMOVED***okClick***REMOVED***>OK</Button>
      </div>
    </div>
  ), [
    isRemoteVisible,
    channelClick,
    upClick,
    leftClick,
    rightClick,
    downClick,
    okClick,
    numberClick,
  ]);
***REMOVED***

export default RemoteControl;
