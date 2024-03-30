import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ chartLabels, chartData,label }) => {
  useEffect(() => {
    // Chart data
    const data = {
      labels: chartLabels,
      datasets: [{
        label: label,
        backgroundColor: 'rgba(8, 65, 92, 0.3)',
        borderColor: 'rgba(8, 65, 92, 0.7)',
        borderWidth: 1,
        data: chartData
      }]
    };

    // Chart options
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Get the chart canvas
    const ctx = document.getElementById('myChart');

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, [chartLabels, chartData,label]); 

  return (
    <div className="col-md-8">
      <div className="card p-3 mt-3">
        <div className="container chart-container mt-5">
          <canvas id="myChart" width="400" height="155"></canvas>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
