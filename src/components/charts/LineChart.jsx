import React, { useMemo, useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function LineChartComponent({ data }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  return (
    <section
      className="chart-card"
      aria-label="Sales trend over time line chart"
    >
      <h3 className="chart-title">Sales Trend Over Time</h3>
      <div style={{ width: '100%', height: 260, minWidth: 0 }}>
        {ready && sortedData.length > 0 &&(
          <ResponsiveContainer>
            <LineChart
              data={sortedData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.3)" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#9ca3af' }}
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
              <Line
                type="monotone"
                dataKey="value"
                name="Value"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={{ r: 2 }}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="chart-placeholder">
        Shows how total value changes over time across all categories.
      </p>
    </section>
  );
}

export default React.memo(LineChartComponent);