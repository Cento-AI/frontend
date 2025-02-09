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
    <div className="rounded-lg border p-4">
      <h2 className="font-medium mb-4">Portfolio Value</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
