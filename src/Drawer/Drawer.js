import PropTypes from 'prop-types';
import React from 'react';
import Permanent from './Permanent';
import Persistent from './Persistent';
import Temporary from './Temporary';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  permanent: PropTypes.bool,
  persistent: PropTypes.bool,
};

const Drawer = ({ className, children, permanent, persistent, ...otherProps }) => {
  if (permanent) {
    return (
      <Permanent
        className={className}
        {...otherProps}
      >
        {children}
      </Permanent>
    );
  } else if (persistent) {
    return (
      <Persistent
        className={className}
        {...otherProps}
      >
        {children}
      </Persistent>
    );
  }
  return (
    <Temporary
      className={className}
      {...otherProps}
    >
      {children}
    </Temporary>
  );
};

Drawer.propTypes = propTypes;
export default Drawer;
