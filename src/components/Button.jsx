import React, {PropTypes} from 'react';
import classNames from 'classnames';

export default class Button extends React.Component {
  constructor(props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    console.log(this.props);
    this.props.clickHandler(this.props.index);
  }

  render() {
    var btnClass = classNames(
      'ui',
      'button',
      {active: (this.props.activeButtonIndex == this.props.index ? true : false)}
    );

    return (
      <button className={btnClass} onClick={this.clickHandler}>{this.props.text}</button>
    )
  }
}

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  clickHandler: React.PropTypes.func.isRequired
};

//export default Button;
