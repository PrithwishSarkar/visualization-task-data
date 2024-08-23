import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import FetchData from '../utilities/FetchData';

ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

export default function RepeatCustomers() {

    const dataDay = FetchData('repeat-customers-day');
    const dataMonth = FetchData('repeat-customers-month');
    const dataQuarter = FetchData('repeat-customers-quarter');
    const dataYear = FetchData('repeat-customers-year');

    const dayLabels = dataDay.map(item => `${item.day}-${item.month}-${item.year}`);
    const monthLabels = dataMonth.map(item => `${item.month}-${item.year}`);
    const quarterLabels = dataQuarter.map(item => `${item.year} Q${item.quarter}`);
    const yearLabels = dataYear.map(item => item.year);

    const prepareChartData = (data, labels, title) => {
        return {
            labels,
            datasets: [
                {
                    label: `${title} Repeat Customers`,
                    data: data.map(item => item.customerCount),
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#cc99ff', '#66ff66', '#ff9999',
                        '#FF9966', '#FF6699', '#FF66CC', '#99FF66', '#6699FF', '#9966FF',
                        '#66CCFF', '#FFCC66', '#66FF99', '#FF66FF', '#FFFF66', '#99CCFF'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#cc99ff', '#66ff66', '#ff9999',
                        '#FF9966', '#FF6699', '#FF66CC', '#99FF66', '#6699FF', '#9966FF',
                        '#66CCFF', '#FFCC66', '#66FF99', '#FF66FF', '#FFFF66', '#99CCFF'
                    ]
                }
            ]
        };
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
                bottom: 10
            }
        },

    };

    return (
        <div className='chart multichartbox'>
            <h2>Repeat Customers Charts</h2>
            <div className='multichart'>

                <div className='chart small-chart'>
                    <h3>Daily Repeat Customers</h3>
                    <Pie data={prepareChartData(dataDay, dayLabels, 'Daily')} options={chartOptions} />
                </div>
                <div className='chart small-chart'>
                    <h3>Monthly Repeat Customers</h3>
                    <Pie data={prepareChartData(dataMonth, monthLabels, 'Monthly')} options={chartOptions} />
                </div>
                <div className='chart small-chart'>
                    <h3>Quarterly Repeat Customers</h3>
                    <Pie data={prepareChartData(dataQuarter, quarterLabels, 'Quarterly')} options={chartOptions} />
                </div>
                <div className='chart small-chart'>
                    <h3>Yearly Repeat Customers</h3>
                    <Pie data={prepareChartData(dataYear, yearLabels, 'Yearly')} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}
