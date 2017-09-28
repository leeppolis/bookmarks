import React, { Component } from 'react';
import "./Quicklinks.css";
import Button from "./Button.js";

class Quicklinks extends Component {
  
	render() {
    return (
      <div className={"quicklinks " + ((this.props.items.length > 0) ? 'visible' : 'hidden')}>
          <ul>
            <li className="intro">Quick links</li>
          {
            this.props.items.map(
              function(item) {
                return <li key={item}><Button value={item} clicked={this.props.clicked} variant="tag" label={'#' + item} /></li>
              },
              this
            )
          }
          </ul>
      </div>
    );
  }
}

export default Quicklinks;