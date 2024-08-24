import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import FetchData from '../utilities/FetchData';
import ChartDesign from '../utilities/ChartDesign';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function NewCustomers() {

  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const data = FetchData('new-customers');

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
  const customersData = filteredData.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'New Customers',
        data: customersData,
        backgroundColor: '#ffc266',
        borderColor: '#e68a00',
        borderWidth: 1.5,
        fill: false,
      }
    ]
  };

  const bottomPadding = window.innerWidth < 850 ? 120 : 60;
  const chartOptions = ChartDesign("Time", "No. of New Customers", bottomPadding);

  return (
    <div className='chart'>
      <h2>New Customers Added Over Time</h2>
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
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}

