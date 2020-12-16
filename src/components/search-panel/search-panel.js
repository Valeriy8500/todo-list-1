import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onSearchChange = (evt) => {
    const term = evt.target.value;
    this.setState({ term: term });
    this.props.onSearchChange(term);
  };

  render() {

    return (
      <input
        className="form-control search-panel"
        type='text'
        placeholder='type to search'
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    )
  }

};

