import React from 'react';

function BarChartComponent({ data }) {
  return (
    <section
      className="chart-card"
      aria-label="Bar chart"
    >
      <h3 className="chart-title">Bar Chart (stub)</h3>
      <p className="chart-placeholder">
        Bar chart will render here based on the provided data.
      </p>
    </section>
  );
}

export default React.memo(BarChartComponent);