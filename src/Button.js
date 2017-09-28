import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
	render() {
        return (
            <button value={this.props.value} onClick={this.props.clicked} className={this.props.variant}>{this.props.label}</button>
        );
    }
}

export default Button;