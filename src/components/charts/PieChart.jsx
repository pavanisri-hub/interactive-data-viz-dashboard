import React, { useMemo, useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#22c55e', '#f97316', '#eab308', '#06b6d4'];

function PieChartComponent({ data }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const aggregatedByRegion = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const map = new Map();
    data.forEach((item) => {
      const current = map.get(item.region) ?? 0;
      map.set(item.region, current + (Number(item.value) || 0));
    });
    return Array.from(map.entries()).map(([region, total]) => ({
      name: region,
      value: total
    }));
  }, [data]);

  return (
    <section
      className="chart-card"
      aria-label="Value distribution by region pie chart"
    >
      <h3 className="chart-title">Value Distribution by Region</h3>
      <div style={{ width: '100%', height: 260, minWidth: 0 }}>
        {ready && (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={aggregatedByRegion}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {aggregatedByRegion.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                    stroke="rgba(15,23,42,0.9)"
                    strokeWidth={1.2}
                  />
                ))}
              </Pie>
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
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="chart-placeholder">
        Shows how total value is distributed across regions.
      </p>
    </section>
  );
}

export default React.memo(PieChartComponent);