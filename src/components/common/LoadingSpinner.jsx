import React from 'react';

function LoadingSpinner() {
  return (
    <div
      className="spinner"
      role="status"
      aria-live="polite"
      aria-label="Loading data"
    >
      <div className="spinner-circle" />
      <span className="spinner-text">Loading data…</span>
    </div>
  );
}

export default LoadingSpinner;