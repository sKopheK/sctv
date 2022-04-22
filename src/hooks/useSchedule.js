import axios from 'axios';
import { DateTime, Duration } from 'luxon';
import { useMemo, useRef } from 'react';
import * as cache from '../cache';

const getCacheKey = (channelId) => `schedule-${channelId}`;

const useSchedule = (channelId) => {
  const request = useRef(null);
  const fetch = async (id) => {
    if (request.current) {
      request.current.cancel();
    }
    const cached = cache.get(getCacheKey(channelId));
    if (cached) {
      if (cached.id) {
        return cached;
      }
      cache.clear(channelId);
    }

    request.current = axios.CancelToken.source();
    try {
      const response = await axios.get('api/schedule', {
        cancelToken: request.current.token,
        params: {
          id,
        },
      });
      cache.set(getCacheKey(channelId), response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
    return {};
  };

  const payload = useMemo(
    async () => fetch(channelId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [channelId],
  );

  const getChannelTitle = async () => {
    const data = await payload;
    return data?.title;
  };

  const getCurrentVideo = async () => {
    const data = await payload;
    if (data?.duration && data?.items?.length) {
      const scheduleStart = new Date(data.items[0].start).getTime();
      const scheduleDuration = Duration.fromISO(data.duration).toMillis();
      const now = (new Date()).getTime();
      const currentTimeOffset = (now - scheduleStart) % scheduleDuration;
      const nowInSchedule = scheduleStart + currentTimeOffset;
      const currentVideo = data.items.reduce((carry, programme) => {
        const start = (new Date(programme.start)).getTime();
        const programmeDuration = Duration.fromISO(programme.duration);
        const end = DateTime.fromMillis(start)
          .plus(programmeDuration)
          .toMillis();
        const offset = nowInSchedule - start;
        return start <= nowInSchedule && nowInSchedule <= end ? {
          id: programme.id,
          title: programme.title,
          start: now - offset,
          end: DateTime.fromMillis(now - offset).plus(programmeDuration).toMillis(),
          offset,
        } : carry;
      }, null);
      return currentVideo;
    }
    return null;
  };

  const cleanup = () => {
    if (request.current) {
      request.current.cancel();
    }
  };

  return {
    getChannelTitle,
    getCurrentVideo,
    cleanup,
  };
};

export default useSchedule;
