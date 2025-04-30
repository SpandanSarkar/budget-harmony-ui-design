
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data for the bar chart
const barChartData = [
  { name: 'IT Department', proposed: 21000, approved: 20800, actual: 19500 },
  { name: 'Finance Department', proposed: 18000, approved: 18000, actual: 17200 },
  { name: 'Marketing Department', proposed: 20000, approved: 19500, actual: 18900 },
];

// Mock data for the pie chart
const pieChartData = [
  { name: 'Software Licenses', value: 15000 },
  { name: 'Hardware Maintenance', value: 6000 },
  { name: 'Audit Fees', value: 8000 },
  { name: 'Consulting Services', value: 10000 },
  { name: 'Advertising', value: 12000 },
  { name: 'Events', value: 7500 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

const BudgetReportingCharts = () => {
  return (
    <div className="space-y-6">
      <div className="h-80">
        <h3 className="text-lg font-medium mb-4">Budget Comparison by Department</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={barChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="proposed" name="Proposed" fill="#8884d8" />
            <Bar dataKey="approved" name="Approved" fill="#82ca9d" />
            <Bar dataKey="actual" name="Actual" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-80">
          <h3 className="text-lg font-medium mb-4">Budget Allocation by Particular</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <h3 className="text-lg font-medium mb-4">Year over Year Budget Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { year: '2023', budget: 45000 },
                { year: '2024', budget: 52000 },
                { year: '2025', budget: 58500 }
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="budget" name="Total Budget" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BudgetReportingCharts;
