'use client';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const mockData = [
  { date: '2024-03-01', value: 5000 },
  { date: '2024-03-02', value: 5020 },
  { date: '2024-03-03', value: 5150 },
  { date: '2024-03-04', value: 5180 },
  { date: '2024-03-05', value: 5250 },
  { date: '2024-03-06', value: 5300 },
  { date: '2024-03-07', value: 5450 },
];

export function ValueChart() {
  return (
    <div className="rounded-lg border bg-card/80 shadow-sm p-4">
      <h2 className="mb-4 font-medium">Portfolio Value</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#gradient)"
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#E97451" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
