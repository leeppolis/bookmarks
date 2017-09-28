import React, { Component } from 'react';
import "./Card.css";
import Button from "./Button.js";

class Card extends Component {
	constructor(props) {
    	super(props);
		this.checkImage = this.checkImage.bind(this);
	}

  checkImage() {
      if ( this.props.fields.media && this.props.fields.media !== null && this.props.fields.media !== undefined && this.props.fields.media.length > 0 ) {
          return <a href={this.props.fields.link}><img src={this.props.fields.media} alt={this.props.fields.title} /></a>;
      } else {
          return '';
      }
  }

  checkDescription() {
    if ( this.props.fields.content && this.props.fields.content !== null && this.props.fields.content !== undefined && this.props.fields.content.length > 0 ) {
        return <p><a href={this.props.fields.link}>{this.props.fields.content}</a></p>;
    } else {
        return '';
    }
  }

  render() {
    console.log( this.props );
    return (
		<article className="card">
            <header>
                <h1><a href={this.props.fields.link}>{this.props.fields.title}</a></h1>
            </header>
            <section>
                {this.checkImage()}
                {this.checkDescription()}
            </section>
            <footer>
                <ul>
                    <li>Tags</li>
                {
                    this.props.fields.tags.map(
                        function(tag) {
                            return <li key={tag}><Button value={tag} clicked={this.props.quickSearch} label={'#' + tag} variant="tag" /></li>
                        },
                        this
                    )
                }
                </ul>
            </footer>
        </article>
    );
  }
}

export default Card;