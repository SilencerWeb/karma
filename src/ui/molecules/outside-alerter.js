import * as React from 'react';
import PropTypes from 'prop-types';


export class OutsideAlerter extends React.Component {
  state = {};

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleClick = (e) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.props.onClick();
    }
  };

  componentDidMount = () => {
    document.addEventListener('click', this.handleClick);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.handleClick);
  };

  render() {
    return (
      <div ref={ this.setWrapperRef }>
        { this.props.children }
      </div>
    );
  }
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func,
};
