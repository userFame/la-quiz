import React from 'react';
import Btn from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.any,
  };

  render() {
    const { title } = this.props;

    return (
      <Btn
        variant={this.props.variant ? this.props.variant : 'outlined'}
        style = {{backgroundColor: "#30CCB9", color: "white", fontSize: 16}}
        onClick={this.props.onClick}
      >
        {title}
      </Btn>
    );
  }
}

export default Button;
