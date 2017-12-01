import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classnames from 'classnames';

class Persistent extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    header: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    onClick: PropTypes.func,
    onTouchstart: PropTypes.func,
    onTouchmove: PropTypes.func,
    onTouchend: PropTypes.func,
    onTransitionend: PropTypes.func,
    animating: PropTypes.bool,
    position: PropTypes.number,
  };

  static handleDrawerClick(event) {
    event.stopPropagation();
  }

  static isWrongPointer(pointerType) {
    return pointerType && pointerType !== 'touch';
  }

  constructor(props) {
    super(props);
    this.handleTransitionend = this.handleTransitionend.bind(this);
    this.handleTouchstart = this.handleTouchstart.bind(this);
    this.handleTouchmove = this.handleTouchmove.bind(this);
    this.handleTouchend = this.handleTouchend.bind(this);
    this.close = this.close.bind(this);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    if (this.props.open !== newProps.open) {
      this.setState({ animating: true });
    }
  }

  handleTouchstart({ pointerType, touches, pageX }, drawerWidth) {
    if (!this.props.open) {
      return;
    }

    if (Persistent.isWrongPointer(pointerType)) {
      return;
    }

    this.startX = touches ? touches[0].pageX : pageX;
    this.touchingSideNav = true;
    this.drawerWidth = drawerWidth;
    this.setState({ currentX: this.startX });
  }

  handleTouchmove({ pointerType, touches, pageX }) {
    if (Persistent.isWrongPointer(pointerType)) {
      return;
    }
    const currentX = touches ? touches[0].pageX : pageX;
    this.setState({ currentX });
  }

  handleTouchend({ pointerType }) {
    if (Persistent.isWrongPointer(pointerType)) {
      return;
    }
    const newPosition = this.calculateDrawerPosition();
    this.touchingSideNav = false;

    this.setState({ animating: true });

    // Did the user close the drawer by more than 50%?
    if (Math.abs(newPosition / this.drawerWidth) >= 0.5) {
      this.close();
    }
  }

  close() {
    const { onClose } = this.props;
    if (typeof onClose === 'function') {
      onClose();
    }
  }

  handleTransitionend() {
    this.setState({ animating: false });
  }

  calculateDrawerPosition() {
    if (this.touchingSideNav) {
      return Math.min(0, this.state.currentX - this.startX);
    }
    return null;
  }

  render() {
    const {
      className,
      children,
      open,
      onTouchend,
      onTouchmove,
     ...otherProps } = this.props;
    const { animating } = this.state;

    const childs = React.Children.map(children, child =>
      React.cloneElement(child, { Persistent: true }),
    );

    // const position = this.calculateDrawerPosition();
    const ROOT = 'mdc-persistent-drawer';
    return (
      <aside
        className={classnames(ROOT, {
          [`${ROOT}--open`]: open,
          [`${ROOT}--animating`]: animating,
        }, className)}
        ref={(native) => { this.native = native; }}
        onTouchEnd={onTouchend}
        onTouchMove={onTouchmove}
        {...otherProps}
      >
        <nav
          className="mdc-persistent-drawer__drawer"
        >
          {childs}
        </nav>
      </aside>
    );
  }
}

export default Persistent;
