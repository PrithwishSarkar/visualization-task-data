import React from 'react';
import { Line } from 'react-chartjs-2';
import FetchData from '../utilities/FetchData';
import ChartDesign from '../utilities/ChartDesign';

export default function CustomerLifetimeValue() {

    const data = FetchData('customer-lifetime-value');
    const labels = data.map(item => `${item._id.month}-${item._id.year}`);
    const lifetimeValueData = data.map(item => item.totalLifetimeValue);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Customer Lifetime Value',
                data: lifetimeValueData,
                borderColor: 'rgba(75,192,192,1)',
                fill: true,
            }
        ]
    };

    const chartOptions = ChartDesign("Time", "Lifetime Value", 30);

    return (
        <div className='chart'>
            <h2>Customer Lifetime Value by Cohorts</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

