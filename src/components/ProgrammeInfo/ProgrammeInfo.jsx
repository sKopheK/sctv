import ***REMOVED*** DateTime ***REMOVED*** from 'luxon';
import PropTypes from 'prop-types';
import React, ***REMOVED*** useCallback, useContext, useMemo ***REMOVED*** from 'react';
import useTimeout from '../../hooks/useTimeout';
import ***REMOVED*** INFO_DIALOG_TIMEOUT, INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH ***REMOVED*** from '../../settings';
import ChannelCtx from '../../state/ChannelCtx';
import './ProgrammeInfo.scss';

function ProgrammeInfo(***REMOVED***
  channelId, channelTitle, programmeTitle, starts, ends, isLoading,
***REMOVED***) ***REMOVED***
  const ***REMOVED*** toggleBar ***REMOVED*** = useContext(ChannelCtx);

  const hideProgrammeInfo = useCallback(
    () => ***REMOVED***
      if (!isLoading) ***REMOVED***
        toggleBar(false);
    ***REMOVED***
  ***REMOVED***,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, channelId, isLoading],
  );
  useTimeout(hideProgrammeInfo, INFO_DIALOG_TIMEOUT);

  const programmeTitleCut = programmeTitle && programmeTitle.length > INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH ? `$***REMOVED***programmeTitle.substring(0, INFO_DIALOG_PROGRAMME_TITLE_MAX_LENGTH).trimEnd()***REMOVED***...` : programmeTitle;

  return useMemo(() => (
    <dl className="ProgrammeInfo">
      <dt className="hidden">Channel id</dt>
      <dd className="channel-id small">***REMOVED***channelId***REMOVED***</dd>
      <dt className="hidden">Channel title</dt>
      <dd className="channel-title small">***REMOVED***isLoading ? 'Loading...' : (channelTitle || 'No signal')***REMOVED***</dd>
      <dt className="hidden">Programme title</dt>
      <dd className="programme-title">***REMOVED***isLoading ? '' : programmeTitleCut***REMOVED***</dd>
      <dt className="starts-label smaller">***REMOVED***starts && !isLoading ? 'Starts' : ''***REMOVED***</dt>
      <dd className="starts smaller">***REMOVED***starts && !isLoading ? DateTime.fromMillis(starts).toFormat('HH:mm') : ''***REMOVED***</dd>
      <dt className="ends-label smaller">***REMOVED***ends && !isLoading ? 'Ends' : ''***REMOVED***</dt>
      <dd className="ends smaller">***REMOVED***ends && !isLoading ? DateTime.fromMillis(ends).toFormat('HH:mm') : ''***REMOVED***</dd>
    </dl>
  ), [channelId, channelTitle, programmeTitleCut, starts, ends, isLoading]);
***REMOVED***

ProgrammeInfo.propTypes = ***REMOVED***
  channelId: PropTypes.number.isRequired,
  channelTitle: PropTypes.string,
  programmeTitle: PropTypes.string,
  starts: PropTypes.number,
  ends: PropTypes.number,
***REMOVED***;

ProgrammeInfo.defaultProps = ***REMOVED***
  channelTitle: '',
  programmeTitle: '',
  starts: 0,
  ends: 0,
***REMOVED***;

export default ProgrammeInfo;
