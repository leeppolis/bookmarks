import React, { Component } from 'react';
import "./Card.css";
import Button from "./Button.js";

class Card extends Component {
    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        this.state = { showAllTags: false };
    }
    
  showMore() {
    this.setState( { showAllTags: !this.state.showAllTags } );
  }

  render() {
    let i = 0;
    return (
		<article className="card">
            <header>
                <h1><a href={this.props.fields.link}>{this.props.fields.title}</a></h1>
            </header>
            <section>
                {this.props.fields.media && <a href={this.props.fields.link}><img src={this.props.fields.media} alt={this.props.fields.title} /></a>}
                {this.props.fields.content && <p><a href={this.props.fields.link}>{this.props.fields.content}</a></p>}
            </section>
            <footer>
                <ul className={ this.state.showAllTags ? 'show-all' : 'show-default'}>
                    <li>Tags</li>
                {   
                    this.props.fields.tags.map(
                        function(tag) {
                            if (i < 4) {
                                i++;
                                return <li key={tag.trim()}><Button value={tag.trim()} clicked={this.props.quickSearch} label={'#' + tag.trim()} variant="tag" /></li>;
                            } else if (i === 4 && this.props.fields.tags.length <= 5) {
                                i++;
                                return <li key={tag.trim()}><Button value={tag.trim()} clicked={this.props.quickSearch} label={'#' + tag.trim()} variant="tag" /></li>;
                            } else if ( i === 4 ) {
                                i++;
                                let remaining = (this.props.fields.tags.length - 5);
                                remaining = ( remaining < 11 ) ? remaining : '10+';
                                return <li className="with-switch" key={tag.trim()}><Button value={tag.trim()} clicked={this.props.quickSearch} label={'#' + tag.trim()} variant="tag" /> <Button clicked={this.showMore} label={remaining} variant="more" /></li>;
                            } else if ( i === this.props.fields.tags.length - 1 ) {
                                return <li className="additional with-switch" key={tag}><Button value={tag.trim()} clicked={this.props.quickSearch} label={'#' + tag.trim()} variant="tag" /> <Button clicked={this.showMore} label="collapse" variant="more" /></li>;
                            } else {
                                i++;
                                return <li className="additional" key={tag.trim()}><Button value={tag.trim()} clicked={this.props.quickSearch} label={'#' + tag.trim()} variant="tag" /></li>;
                            }
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