import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Title, Ticks } from 'chart.js/auto';

import { Line } from "react-chartjs-2";

const LineChart = ({ data}) => {
  console.log('data',data)

  if (!data || !data.timeline) {
    return <p>No historical data available</p>;
  }
  const formatNumber = num => {
    // Divide the number by 1 million and round to 1 decimal place
    const formattedNumber = (num / 1000000).toFixed(1);
    return `${formattedNumber}m`; // Append "m" for million
  };
  // Extract dates and corresponding cases, recoveries, and deaths from the historicalData.timeline object
  const { cases, deaths, recovered } = data.timeline;
  const dates = Object.keys(cases).map((date)=>new Date(date).getFullYear());
  const casesValues = Object.values(cases);
  const recoveredValues = Object.values(recovered);
  const deathsValues = Object.values(deaths);


  // Prepare data for the chart
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Cases',
        data: casesValues,
        fill: false,
        borderColor: '#9CA8FF',
        tension: 0.1,
      },
      {
        label: 'Recoveries',
        data: recoveredValues,
        fill: false,
        borderColor: '#47D928',
        tension: 0.1,
      },
      {
        label: 'Deaths',
        data: deathsValues,
        fill: false,
        borderColor: '#FF4D57',
        tension: 0.1,
      },
    ],
  };

  // Chart options
const options = {
  scales: {
    x: {
      
      type: 'category', // Change the type of x-axis scale to category
      labels: dates, // Provide an array of years as x-axis labels
      title: {
        display: true,
        text: 'Year',
      },
    },
    y: {
      min: 0,
      max: 1,
      title: {
        display: true,
        text: 'Value',
      },
      ticks: {
        stepSize: 0.2, // Step size for the y-axis
        // callback: value => formatNumber(value), // Format tick labels using the formatNumber function

      },
    },
  },
};



  return <Line data={chartData} options={options} />;
};

export default LineChart;


