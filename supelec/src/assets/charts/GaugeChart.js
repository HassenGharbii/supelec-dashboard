import React from 'react';
import Chart from 'react-apexcharts';

const GaugeChart = ({ totalSwitches, connectedSwitches }) => {
  // Calculate the percentage of connected switches
  const connectedPercentage = totalSwitches > 0 
    ? (connectedSwitches / totalSwitches) * 100 
    : 0;

  const chartOptions = {
    chart: {
      type: 'radialBar'
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: '#fff',
            fontSize: '22px',
          },
          value: {
            offsetY: 10,
            color: '#fff',
            fontSize: '16px',
            formatter: function (val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    labels: ['Connected'],
    colors: ['#00E396'], // Green color for connected switches
  };

  const chartSeries = [connectedPercentage]; // Data for the chart (percentage)

  return (
    <div className="gauge-chart">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
        height="350"
      />
      <div style={{ textAlign: 'center', color: 'white', marginTop: '20px' }}>
        <p>{connectedSwitches} out of {totalSwitches} switches connected</p>
      </div>
    </div>
  );
};

export default GaugeChart;
