import axios from 'axios';
import ***REMOVED*** DateTime, Duration ***REMOVED*** from 'luxon';
import ***REMOVED*** useMemo ***REMOVED*** from 'react';

const useSchedule = () => ***REMOVED***
  const fetch = async () => ***REMOVED***
    try ***REMOVED***
      const response = await axios.get('/schedule.json');
      return response;
  ***REMOVED*** catch (error) ***REMOVED***
      console.error(error);
  ***REMOVED***
    return null;
***REMOVED***;

  const schedule = useMemo(async () => fetch(), []);

  const getCurrentVideoWithOffset = async () => ***REMOVED***
    const ***REMOVED*** data ***REMOVED*** = await schedule;
    if (data?.length) ***REMOVED***
      const now = (new Date()).getTime();
      const currentVideo = data.reduce((carry, programme) => ***REMOVED***
        const start = (new Date(programme.start)).getTime();
        const end = DateTime.fromMillis(start)
          .plus(Duration.fromISO(programme.duration))
          .toMillis();
        return start <= now && now <= end ? ***REMOVED***
          id: programme.id,
          start,
          end,
      ***REMOVED*** : carry;
    ***REMOVED***, null);
      const offset = now - currentVideo.start;
      return [currentVideo.id, offset];
  ***REMOVED***
    return null;
***REMOVED***;

  return ***REMOVED***
    getCurrentVideoWithOffset,
***REMOVED***;
***REMOVED***;

export default useSchedule;
