import PropTypes from 'prop-types';
import React, { useContext, useMemo } from 'react';
import AppCtx from '../../state/AppCtx';
import Button from '../Button/Button';
import './MainSwitch.scss';

function MainSwitch({ className }) {
  const { toggleScreenOn } = useContext(AppCtx);
  return useMemo(() => (
    <Button className={`MainSwitch btn--round ${className}`} onClick={toggleScreenOn} />
  ), [className, toggleScreenOn]);
}

MainSwitch.propTypes = {
  className: PropTypes.string,
};

MainSwitch.defaultProps = {
  className: '',
};

export default MainSwitch;
