import React from 'react';

function DateRangeFilter() {
  return (
    <div className="filter-group">
      <span className="filter-label">Date range</span>
      <div className="filter-date-range">
        <label className="sr-only" htmlFor="start-date">
          Start date
        </label>
        <input
          id="start-date"
          type="date"
          className="filter-control"
          aria-label="Start date"
        />
        <label className="sr-only" htmlFor="end-date">
          End date
        </label>
        <input
          id="end-date"
          type="date"
          className="filter-control"
          aria-label="End date"
        />
      </div>
    </div>
  );
}

export default DateRangeFilter;