import ***REMOVED*** DateTime ***REMOVED*** from 'luxon';
import PropTypes from 'prop-types';
import React from 'react';
import './ProgrammeInfo.scss';

function ProgrammeInfo(***REMOVED***
  channelId, programmeTitle, starts, ends,
***REMOVED***) ***REMOVED***
  return (
    <dl className="ProgrammeInfo">
      <dt className="hidden">Channel</dt>
      <dd className="channelId">***REMOVED***channelId***REMOVED***</dd>
      <dt className="hidden">Programme title</dt>
      <dd className="title">***REMOVED***programmeTitle***REMOVED***</dd>
      <dt className="starts-label smaller">Starts</dt>
      <dd className="starts smaller">***REMOVED***starts && DateTime.fromMillis(starts).toFormat('HH:mm')***REMOVED***</dd>
      <dt className="ends-label smaller">Ends</dt>
      <dd className="ends smaller">***REMOVED***ends && DateTime.fromMillis(ends).toFormat('HH:mm')***REMOVED***</dd>
    </dl>
  );
***REMOVED***

ProgrammeInfo.propTypes = ***REMOVED***
  channelId: PropTypes.number.isRequired,
  programmeTitle: PropTypes.string,
  starts: PropTypes.oneOfType([PropTypes.number, undefined]),
  ends: PropTypes.oneOfType([PropTypes.number, undefined]),
***REMOVED***;

ProgrammeInfo.defaultProps = ***REMOVED***
  programmeTitle: '',
  starts: '',
  ends: '',
***REMOVED***;

export default ProgrammeInfo;
