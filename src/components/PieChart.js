import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ data }) => {
  if (!data || !data.timeline) {
    return <p>No historical data available</p>;
  }

  const { cases, deaths, recovered } = data.timeline;
  const totalCases = Object.values(cases).reduce((acc, curr) => acc + curr, 0);
  const totalDeaths = Object.values(deaths).reduce((acc, curr) => acc + curr, 0);
  const totalRecovered = Object.values(recovered).reduce((acc, curr) => acc + curr, 0);

  const chartData = {
    labels: ['Cases'],
    datasets: [{
      data: [totalCases, totalRecovered, totalDeaths],
      backgroundColor: ['#E6E69E', '#47D928', '#FF4D57'],
    }]
  };

  return <Pie data={chartData} />;
};

export default PieChart;
