import React from 'react';

function PieChartComponent({ data }) {
  return (
    <section
      className="chart-card"
      aria-label="Pie chart"
    >
      <h3 className="chart-title">Pie Chart (stub)</h3>
      <p className="chart-placeholder">
        Pie chart will render here based on the provided data.
      </p>
    </section>
  );
}

export default React.memo(PieChartComponent);