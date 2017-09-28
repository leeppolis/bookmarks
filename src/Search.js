import React, { Component } from 'react';
import "./Search.css";

class Search extends Component {
    render() {
        return (
            <form onSubmit={this.props.submit}>
                <input type="search" value={this.props.term} placeholder="Filter bookmarks" minLength="2" onChange={this.props.change} />
            </form>
        );
    }
}

export default Search;