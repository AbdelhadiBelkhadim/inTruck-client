import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Countdev = ({ statusCounts = {} }) => {
  // Convert status counts to chart data format
  const chartData = Object.entries(statusCounts).map(([label, value], index) => ({
    id: index,
    value: value || 0,
    label
  }));

  // Use default data if no status counts are available
  const data = chartData.length > 0 ? chartData : [
    { id: 0, value: 10, label: 'Pending' },
    { id: 1, value: 15, label: 'In Transit' },
    { id: 2, value: 20, label: 'Delivered' },
  ];

  return (
    <div className="h-[200px] md:h-auto flex items-center lg:items-end justify-between md:py-5 lg:py-8 md:px-3 relative bg-white rounded-[28px] border border-solid border-[#d9d9d9] lg:col-start-3 lg:order-last">
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 55,
            outerRadius: 91,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 383,
            cx: 150,
            cy: 150,
          }
        ]}
      />
    </div>
  );
};

export default Countdev;