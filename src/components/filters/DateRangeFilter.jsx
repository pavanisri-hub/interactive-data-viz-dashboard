import React from 'react';

function DateRangeFilter({ startDate, endDate, onChange }) {
  const handleStartChange = (event) => {
    onChange?.({
      startDate: event.target.value || '',
      endDate
    });
  };

  const handleEndChange = (event) => {
    onChange?.({
      startDate,
      endDate: event.target.value || ''
    });
  };

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
          value={startDate || ''}
          onChange={handleStartChange}
        />
        <label className="sr-only" htmlFor="end-date">
          End date
        </label>
        <input
          id="end-date"
          type="date"
          className="filter-control"
          aria-label="End date"
          value={endDate || ''}
          onChange={handleEndChange}
        />
      </div>
    </div>
  );
}

export default DateRangeFilter;