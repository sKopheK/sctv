import PropTypes from 'prop-types';
import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import useTimeout from '../../hooks/useTimeout';
import { CHANNEL_LIST_TIMEOUT } from '../../settings';
import ChannelListCtx from '../../state/ChannelListCtx';
import './ChannelList.scss';

const RESIZE_EVENT = 'resize';

function ChannelList({ list, activeChannel }) {
  const activeChannelIndex = list.findIndex((channel) => channel.id === activeChannel);
  const listElRef = useRef(null);
  const [listItemDimensions, setListItemDimensions] = useState(null);
  const itemCount = list.length;

  const { toggleBar } = useContext(ChannelListCtx);

  const hideProgrammeInfo = useCallback(
    () => toggleBar(false),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleBar, activeChannelIndex],
  );
  useTimeout(hideProgrammeInfo, CHANNEL_LIST_TIMEOUT);

  function getListItemHeight() {
    const listElement = listElRef.current;
    const items = listElement.children;
    const firstItem = items[0];
    const itemSpacing = parseFloat(window.getComputedStyle(firstItem).marginBottom);
    setListItemDimensions([firstItem.offsetHeight, itemSpacing]);
  }

  function resetListItemHeight() {
    setListItemDimensions(null);
    getListItemHeight();
  }

  function getListItems() {
    if (listItemDimensions === null) {
      return list;
    }
    const [itemHeight, itemSpacing] = listItemDimensions;
    const listElement = listElRef.current;
    const wrapperElement = listElement.parentElement;
    const wrapperStyle = window.getComputedStyle(wrapperElement);
    const contentHeightAvailable = wrapperElement.offsetHeight
                                      - parseFloat(wrapperStyle.paddingTop)
                                      - parseFloat(wrapperStyle.paddingBottom);
    const visibleItemCount = Math.max(1, Math.floor((contentHeightAvailable + itemSpacing)
                                          / (itemHeight + itemSpacing)));
    const middleIndex = Math.floor(visibleItemCount / 2);
    const offset = Math.min(
      itemCount - visibleItemCount,
      Math.max(0, activeChannelIndex - middleIndex),
    );
    return list.filter((_, itemIndex) => {
      const isVisible = itemIndex >= offset && itemIndex < visibleItemCount + offset;
      return isVisible;
    });
  }

  useEffect(() => {
    window.addEventListener(RESIZE_EVENT, resetListItemHeight);
    return () => {
      window.removeEventListener(RESIZE_EVENT, resetListItemHeight);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListItemHeight();
    return () => {};
  }, []);

  const listItems = getListItems();

  return (
    <div className="ChannelList">
      <ul className="channel-list" ref={listElRef}>
        {listItems.map((channel) => (
          <li key={channel.id} className={channel.id === activeChannel ? 'is-active' : ''}>
            <span className="channel-id">{channel.id}</span>
            {' '}
            <span className={`channel-title${channel.title ? '' : ' channel-title--empty'}`}>{channel.title ?? 'Empty'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

ChannelList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    active: PropTypes.bool,
  })),
  activeChannel: PropTypes.number,
};

ChannelList.defaultProps = {
  list: [],
  activeChannel: null,
};

export default ChannelList;
