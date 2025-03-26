
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressChartProps {
  data: {
    date: string;
    wordLearned: number;
    wordReviewed: number;
  }[];
}

export function ProgressChart({ data }: ProgressChartProps) {
  return (
    <Card className="glassmorphism">
      <CardHeader>
        <CardTitle>Tiến trình học tập</CardTitle>
        <CardDescription>Số lượng từ vựng đã học và ôn tập theo thời gian</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(134, 143, 152, 0.1)" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="rgba(134, 143, 152, 0.5)"
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke="rgba(134, 143, 152, 0.5)"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                border: '1px solid rgba(134, 143, 152, 0.2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="wordLearned"
              name="Từ đã học"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="wordReviewed"
              name="Từ đã ôn tập"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
