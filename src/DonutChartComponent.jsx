// DonutChartComponent.js
import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';

const DonutChartComponent = () => {
    const chartRef = useRef(null); // To hold the chart instance
    const canvasRef = useRef(null);

    useEffect(() => {
        // Create chart instance
        const myChart = new Chart(canvasRef.current, {
            type: 'doughnut',
            data: {
                // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    data: [12, 19, 20],
                    backgroundColor: [
                        'red',
                        'purple',
                       'lightgray',
                    ],
                    borderColor: [
                        'red',
                        'purple',
                        'lightgray'
                    ],
                    borderWidth: 1
                }]
            }
        });

        chartRef.current = myChart;

        return () => {
            // Cleanup chart instance on unmount or re-render
            chartRef.current.destroy();
        };
    }, []); // Empty dependency array ensures this runs once on mount and unmount

    return <canvas ref={canvasRef} />;
};

export default DonutChartComponent;
