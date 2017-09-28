import React, { Component } from 'react';
import "./Cards.css";
import Card from './Card.js';

class Cards extends Component {
  render() {
    return (
			<section className="grid">
        <ul className={"items " + this.props.viewMode}>
				{
            this.props.items.map(
              function(item) {
                return <li className="item" key={item.id}><Card fields={item} quickSearch={this.props.quickSearch}/></li>
              },
              this
            )
        }
        </ul>
			</section>
    );
  }
}

export default Cards;