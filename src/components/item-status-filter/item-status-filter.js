import React, { Component } from 'react';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

  render() {
    // btn-info

    const { filtersDone, filtersActive, filtersAll } = this.props;

    let classNameAll = 'btn btn-info';
    let classNamesActive = 'btn btn-outline-secondary';
    let classNamesDone = 'btn btn-outline-secondary';

    return (
      <div className="btn-group">
        <button
          type="button"
          className={classNameAll}
          onClick={filtersAll}>All</button>
        <button
          type="button"
          className={classNamesActive}
          onClick={filtersActive}>Active</button>
        <button
          type="button"
          className={classNamesDone}
          onClick={filtersDone}>Done</button>
      </div>
    );
  }
}



