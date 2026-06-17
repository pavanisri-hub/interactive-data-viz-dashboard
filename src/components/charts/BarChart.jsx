import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function BarChartComponent({ data }) {
  const aggregatedByCategory = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const map = new Map();
    data.forEach((item) => {
      const current = map.get(item.category) ?? 0;
      map.set(item.category, current + (Number(item.value) || 0));
    });
    return Array.from(map.entries()).map(([category, total]) => ({
      category,
      total
    }));
  }, [data]);

  return (
    <section
      className="chart-card"
      aria-label="Total value per category bar chart"
    >
      <h3 className="chart-title">Total Value by Category</h3>
      <div
        style={{ width: '100%', height: 260 }}
        aria-hidden="true"
      >
        <ResponsiveContainer>
          <BarChart data={aggregatedByCategory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              stroke="rgba(148,163,184,0.7)"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              stroke="rgba(148,163,184,0.7)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15,23,42,0.95)',
                borderRadius: '0.75rem',
                border: '1px solid rgba(148,163,184,0.6)',
                fontSize: 12
              }}
              labelStyle={{ color: '#e5e7eb' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              formatter={(value) => <span style={{ color: '#e5e7eb' }}>{value}</span>}
            />
            <Bar
              dataKey="total"
              name="Total value"
              fill="#a855f7"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="chart-placeholder">
        Compares total value across categories in the selected range.
      </p>
    </section>
  );
}

export default React.memo(BarChartComponent);