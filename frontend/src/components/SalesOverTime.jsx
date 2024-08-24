import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import FetchData from '../utilities/FetchData';
import ChartDesign from '../utilities/ChartDesign';

Chart.register(CategoryScale);

export default function SalesOverTime() {

  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const data = FetchData('sales-over-time');

  const years = [...new Set(data.map(item => item._id.year))];
  const months = [...new Set(data.map(item => item._id.month))].sort((a, b) => a - b);

  const filteredData = data.filter(item =>
    (selectedYear === 'All' || item._id.year === Number(selectedYear)) &&
    (selectedMonth === 'All' || item._id.month === Number(selectedMonth))
  );

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const labels = filteredData.map(item => `${item._id.day}-${item._id.month}-${item._id.year}`);
  const salesData = filteredData.map(item => item.totalSales);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Total Sales',
        data: salesData,
        fill: false,
        backgroundColor: '#6666ff',
        borderColor: '#0000cc',
        borderWidth: 1.5,
      }
    ],
  };
  const bottomPadding = window.innerWidth < 850 ? 100 : 60;
  const chartOptions = ChartDesign("Time", "Sales", bottomPadding);

  return (
    <div className='chart'>
      <h2>Total Sales Over Time</h2>
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

        <label>
          Month:
          <select value={selectedMonth} onChange={handleMonthChange}>
            <option value="All">All Months</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
      </div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
