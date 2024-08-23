export default function ChartDesign(xName, yName, bPadding, yTicksCallback) {

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        bottom: bPadding
      }
    },
    plugins: {
      tooltip: {
        position: "average",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xName,
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {

          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },

        },
      },
      y: {
        title: {
          display: true,
          text: yName,
          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {

          font: {
            family: 'Roboto',
            size: 14,
            weight: 'bold',
          },
          callback: yTicksCallback
        },
      }
    }
  };

  return chartOptions;
}