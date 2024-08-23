import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import ChartDesign from '../utilities/ChartDesign';
import FetchData from '../utilities/FetchData';

export default function SalesGrowthRate() {

  const [selectedYear, setSelectedYear] = useState('All');

  const data = FetchData('sales-growth-rate');

  const years = [...new Set(data.map(item => item.year))];

  const filteredData = selectedYear === 'All'
    ? data
    : data.filter(item => item.year === Number(selectedYear));

  const labels = filteredData.map(item => `${item.month}-${item.year}`);
  const growthRates = filteredData.map(item => parseFloat(item.growthRate));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Growth Rate Over Time (%)',
        data: growthRates,

        fill: false,
        backgroundColor: '#66ff66',
        borderColor: '#00b300',
        borderWidth: 1.5,
      }
    ]
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const chartOptions = ChartDesign("Time", "Growth Rate Percentage", 60, ((val) => val + "%"));

  return (
    <div className='chart'>
      <h2>Sales Growth Rate Over Time</h2>
      <div className='filter'>
        <span>Filter By: </span>
        <label>
          Year:
          <select value={selectedYear} onChange={handleYearChange}>
            <option value="All">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>
      <Line
        data={chartData} options={chartOptions} />
    </div>
  );
}
