import React from 'react';

function LineChartComponent({ data }) {
  return (
    <section
      className="chart-card"
      aria-label="Line chart"
    >
      <h3 className="chart-title">Line Chart (stub)</h3>
      <p className="chart-placeholder">
        Line chart will render here based on the provided data.
      </p>
    </section>
  );
}

export default React.memo(LineChartComponent);