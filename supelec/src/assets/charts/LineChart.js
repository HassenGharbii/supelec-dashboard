import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({ title, data }) => {
  // Separate the timestamp (pinged_at) and values
  const categories = data.map(entry => new Date(entry.pinged_at).toLocaleTimeString());
  const seriesData = data.map(entry => parseFloat(entry.value));

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
      height: '100%',
      width: '100%',
    },
    title: {
      text: title,
      align: 'left',
      style: {
        fontSize: '12px', // Reduced title font size
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
    stroke: {
      curve: 'smooth',
      width: 3, // Increase line width to make it more visible
    },
    xaxis: {
      categories: categories, // Set the timestamps as the x-axis categories
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#ffffff',
        },
      },
    },
    grid: {
      borderColor: '#444',
    },
    tooltip: {
      theme: 'dark',
      shared: false,
      intersect: true,
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false, // Disable the legend
    },
  };

  const chartSeries = [
    {
      name: title,
      data: seriesData, // Set the metric values
    },
  ];

  return (
    <div className="w-full h-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height="100%"  // Use 100% height to fit the parent div
        width="100%"   // Ensure it fits the container
      />
    </div>
  );
};

export default LineChart;
