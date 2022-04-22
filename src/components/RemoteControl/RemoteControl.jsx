import React, {
  useCallback, useContext, useMemo,
} from 'react';
import useTimeout from '../../hooks/useTimeout';
import { REMOTE_HIDE_TIMEOUT } from '../../settings';
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

function RemoteControl() {
  const {
    visible: volumeBarVisible,
    decrease: decreaseVol,
    increase: increaseVol,
    toggleBar: toggleVolumeBar,
  } = useContext(VolumeCtx);
  const {
    toggleBar: toggleProgrammeInfo,
    setId: setChannelId,
    id: channelId,
  } = useContext(ChannelCtx);
  const {
    visible: channelListVisible,
    toggleBar: toggleChannelList,
  } = useContext(ChannelListCtx);
  const {
    visible: channelChangeVisible,
    toggleBar: toggleChannelChange,
    textInput: channelChangeTextInput,
    pressKey: channelChangeAddChar,
    resetTextInput: channelChangeResetTextInput,
  } = useContext(ChannelChangeCtx);
  const {
    screenOn,
    toggleScreenOn,
    isRemoteVisible,
    setRemoteVisible,
  } = useContext(AppCtx);

  const changeChannel = useCallback((diff) => {
    if (!screenOn) return;
    setChannelId(channelId + (channelListVisible ? -diff : diff));
    if (volumeBarVisible) {
      toggleVolumeBar();
    }
    if (!channelListVisible) {
      toggleProgrammeInfo(true);
    }
  }, [
    screenOn,
    setChannelId,
    channelId,
    volumeBarVisible,
    channelListVisible,
    toggleProgrammeInfo,
    toggleVolumeBar,
  ]);
  const channelClick = useCallback(() => {
    if (!screenOn) return;
    if (!channelListVisible) {
      toggleVolumeBar(false);
      toggleProgrammeInfo(false);
      toggleChannelChange(false);
    }
    toggleChannelList();
  }, [
    channelListVisible,
    screenOn,
    toggleChannelList,
    toggleProgrammeInfo,
    toggleVolumeBar,
    toggleChannelChange,
  ]);
  const upClick = useCallback(() => {
    if (!screenOn) return;
    changeChannel(1);
  }, [changeChannel, screenOn]);
  const downClick = useCallback(() => {
    if (!screenOn) return;
    changeChannel(-1);
  }, [changeChannel, screenOn]);
  const leftClick = useCallback(() => {
    if (!screenOn) return;
    if (!volumeBarVisible) {
      toggleVolumeBar();
      toggleProgrammeInfo(false);
      toggleChannelList(false);
      toggleChannelChange(false);
    } else {
      decreaseVol();
    }
  }, [
    screenOn,
    volumeBarVisible,
    toggleVolumeBar,
    toggleProgrammeInfo,
    toggleChannelList,
    toggleChannelChange,
    decreaseVol,
  ]);
  const rightClick = useCallback(() => {
    if (!screenOn) return;
    if (!volumeBarVisible) {
      toggleVolumeBar();
      toggleProgrammeInfo(false);
      toggleChannelList(false);
      toggleChannelChange(false);
    } else {
      increaseVol();
    }
  }, [
    screenOn,
    volumeBarVisible,
    toggleVolumeBar,
    toggleProgrammeInfo,
    toggleChannelList,
    toggleChannelChange,
    increaseVol,
  ]);
  const okClick = useCallback(() => {
    if (!screenOn) return;
    if (channelChangeVisible) {
      toggleChannelChange();
      setChannelId(Number(channelChangeTextInput));
      toggleProgrammeInfo();
    } else if (volumeBarVisible) {
      toggleVolumeBar();
    } else if (channelListVisible) {
      toggleChannelList();
      toggleProgrammeInfo();
    } else {
      toggleProgrammeInfo();
    }
  }, [
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
    (number) => {
      if (!screenOn) {
        toggleScreenOn();
      }
      if (!channelChangeVisible) {
        toggleVolumeBar(false);
        toggleProgrammeInfo(false);
        toggleChannelList(false);
        toggleChannelChange(true);
        channelChangeResetTextInput();
      }
      channelChangeAddChar(number);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenOn, channelChangeVisible],
  );

  const hideRemote = useCallback(
    () => setRemoteVisible(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setRemoteVisible, isRemoteVisible],
  );
  useTimeout(hideRemote, screenOn ? REMOTE_HIDE_TIMEOUT : 2 ** 31 - 1);

  return useMemo(() => (
    <div className={`RemoteControl${isRemoteVisible ? '' : ' is-hidden'}`}>
      <div className="content logo grid">
        <MainSwitch className="grid-to" />
        <SoundToggle className="grid-so" />
        {Array(10).fill(null).map((_, i) => i).map((i) => (
          <Button className={`grid-n${i} highlighted grid-landscape`} onClick={() => numberClick(i)} key={`nr${i}`}>{i}</Button>
        ))}
        <Button className="grid-ch grid-landscape" onClick={channelClick}>Ch</Button>
        <Button className="grid-up btn-arrow btn-arrow--up" onClick={upClick} onMouseDown={upClick} />
        <Button className="grid-lt btn-arrow btn-arrow--lt" onClick={leftClick} onMouseDown={leftClick} />
        <Button className="grid-rt btn-arrow btn-arrow--rt" onClick={rightClick} onMouseDown={rightClick} />
        <Button className="grid-dn btn-arrow btn-arrow--dn" onClick={downClick} onMouseDown={downClick} />
        <Button className="grid-ok grid-h-center btn--round btn--round-big" onClick={okClick}>OK</Button>
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
}

export default RemoteControl;
