import React, { Component } from 'react';
import Cards from './Cards.js';
import Quicklinks from './Quicklinks.js';
import Search from './Search.js';
import Button from "./Button.js";

class Body extends Component {
	constructor(props) {
		super(props);
		
		this.getUrl = function( resource, param ) {
			let output = null;
			let hostname = window.location.hostname; 
			let resources = {
				'localhost': {
					'cards': process.env.PUBLIC_URL + '/cards.json',
					'quicklinks': process.env.PUBLIC_URL + '/quicklinks.json'
				},
				'online': {
					'cards': '/cards',
					'quicklinks': '/quicklinks'
				}
			};
			if ( hostname === 'localhost') {
				output = resources.localhost[resource] + param;
			} else {
				output = resources.online[resource] + param;
			}
			return output;
		};

		this.checkHash = function(e) {
			var term = '';
			if ( window.location.hash === '#!/' ) {
				this.setState( { term: '' }, this.doSearch );
			} else {
				if ( window.location.hash.indexOf('#!/term/') > -1 ) {
					term = unescape( window.location.hash.replace(/#!\/term\//ig,'') );
				} 
				if (term && term !== '#!/') {
					this.setState( { term: term }, this.doSearch );
				} else {
					this.setState( { term: term }, () => { this.redirect('') } );
				}
			}
		}

		this.redirect = function( term ) {
			window.location.hash = '#!/' + (( term ) ? escape( term ) : '');
		}

		this.searchSubmit = this.searchSubmit.bind(this);
		this.typingSearchTerm = this.typingSearchTerm.bind(this);
		this.quickSearch = this.quickSearch.bind(this);
		this.doSearch = this.doSearch.bind(this);
		this.buttonsListLoaded = this.buttonsListLoaded.bind(this);
		this.cardsListLoaded = this.cardsListLoaded.bind(this);
		this.setViewMode = this.setViewMode.bind(this);
		this.resetSearch = this.resetSearch.bind(this);
		this.state = { term: '', title: 'Bookmarks', quickLinks: [], cards: [], viewMode: 'cards', loading: true };
	}

	resetSearch() {
		// this.setState( { term: '' }, this.doSearch );
		this.redirect('');
	}

	setViewMode() {
		if (this.state.viewMode === 'cards') {
			this.setState( { viewMode: 'list' } );
		} else {
			this.setState( { viewMode: 'cards' } );
		}
	}

	componentDidMount() {
		window.addEventListener(
			"hashchange",
			this.checkHash.bind(this)
		);
		this.checkHash();
		this.doSearch();
		this.doLoad(
			this.getUrl('quicklinks', ''),
			{},
			this.buttonsListLoaded,
			function( error ) {
				console.error( error );
			}
		);
	}

	buttonsListLoaded( data ) {
		this.setState( { quickLinks: data.quicklinks } );
	}

	cardsListLoaded( data ) {
		this.setState(
			{ cards: data.cards },
			function() {
				this.setState( { "loading": false } );
				document.querySelector('body').scrollTop = 0;
			}
		);
	}

	doLoad(url, options, callback, error) {
		fetch(url, options)
			.then( function( response ) {
				if ( response.ok && response.status === 200 ) {
					var contentType = response.headers.get("content-type");
					if ( contentType && contentType.indexOf("application/json") !== -1 ) {	
						return response.json().then(
							function(json) {
								if (typeof callback === 'function') {
									callback(json);
								}
							}
						).catch( function( error ) {
							if (typeof error === 'function') {
									error( error );
							}
						});
					} else {
						if (typeof error === 'function') {
							error( 'Wrong answer' );
						}
					}
				} else {
					if (typeof error === 'function') {
						error( error );
					}
				}
			})
			.catch( function( error ) {
				if (typeof error === 'function') {
						error( error );
				}
			});
	}

	doSearch() {
		this.setState( { "loading": true } );
		if (this.state.term) {
			this.setState( { title: 'Bookmarks filtered for "' + this.state.term + '"' } );
		} else {
			this.setState( { title: 'Bookmarks' } );
		}
		this.doLoad(
			this.getUrl('cards', '?term=' + escape( this.state.term ) ),
			{},
			this.cardsListLoaded,
			function( error ) {
				console.error( error );
			}
		);
	}
  
  quickSearch( e ) {
		// this.setState( { term: e.target.value }, this.doSearch );
		this.redirect( 'term/' + e.target.value );
  }
  
  searchSubmit(e) {
		e.preventDefault();
		// this.doSearch();
		this.redirect( 'term/' + this.state.term );
  }
  
  typingSearchTerm(e) {
	  this.setState( { term: e.target.value } );
	}

  render() {
    return (
			<div className={"body-wrapper " + ((this.state.loading) ? "loading" : "") }>
				<section className="search">
					<Search term={this.state.term} submit={this.searchSubmit} change={this.typingSearchTerm}/>

					<Button variant={"icon resetSearch " + ((this.state.term) ? 'visible' : 'hidden')} clicked={this.resetSearch} label="" />
					
					<Quicklinks items={this.state.quickLinks} clicked={this.quickSearch} />
				</section>

				<section className="title">
					<h2>{this.state.title}</h2>
					<Button variant={"icon changeView " + this.state.viewMode} clicked={this.setViewMode} label="" />
				</section>

				<Cards items={this.state.cards} quickSearch={this.quickSearch} viewMode={this.state.viewMode} />
			</div>
    );
  }
}

export default Body;