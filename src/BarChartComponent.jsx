import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

class RoundedBar extends BarElement {
    draw(ctx) {
        const { x, y, base, width, options } = this.getProps(['x', 'y', 'base', 'width', 'options']);
        const radius = options.borderRadius;

        // No radius, draw a normal rectangle
        if (!radius) {
            ctx.fillRect(x - width / 2, y, width, base - y);
            return;
        }

        // Draw rectangle with rounded top
        ctx.beginPath();
        ctx.moveTo(x - width / 2, base);
        ctx.lineTo(x - width / 2, y + radius);
        ctx.quadraticCurveTo(x - width / 2, y, x - width / 2 + radius, y);
        ctx.lineTo(x + width / 2 - radius, y);
        ctx.quadraticCurveTo(x + width / 2, y, x + width / 2, y + radius);
        ctx.lineTo(x + width / 2, base);
        ctx.closePath();

        ctx.fill();
    }
}

ChartJS.register(RoundedBar, BarController, CategoryScale, LinearScale);

const BarChartComponent = () => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null); // Used to keep a reference to the chart instance

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            // If there's an existing chart instance, destroy it
            if (chartRef.current) {
                chartRef.current.destroy();
            }

            // Create the new chart instance and store it in the ref
            chartRef.current = new ChartJS(ctx, {
                type: RoundedBar.id,
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Dataset',
                        data: [65, 59, 80, 75, 56, 55, 40, 35, 22, 70, 50, 90], // Your data
                        // backgroundColor: ['rgba(0, 123, 255, 0.5)',
                        //     'rgba(0, 255, 0, 0.5)',
                        //     'rgba(0, 0, 255, 0.5)',
                        //     'rgb(232, 16, 16)',
                        //     'rgb(33, 217, 161)',
                        //     'rgb(36, 247, 181)',
                        //     'rgb(13, 227, 111)',
                        //     'rgb(53, 117, 101)',
                        //     'rgb(22, 201, 171)',
                        //     'rgb(166, 179,27)',
                        //     'rgb(65, 191, 90)',
                        //     'rgb(11, 209, 131)',],
                        backgroundColor:[],
                        borderColor: 'rgba(99, 117, 100, 0.8)',
                        borderWidth: 1,
                        borderRadius: 10, // Specify the radius for the rounded corners
                        barPercentage: 0.5
                    }]
                },
                options: {
                    scales: {
                        y: {
                            display: false,
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            const dataValues = chartRef.current.data.datasets[0].data;
            chartRef.current.data.datasets[0].backgroundColor = dataValues.map(value => {
                return `rgba(${255 - Math.min(255, (value - 30) * 5)}, ${Math.min(255, (value - 30) * 5)}, 0, 0.8)`;


            });
            chartRef.current.update();
        }

        // Return a cleanup function to destroy the chart instance when the component unmounts or dependencies change
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [canvasRef]); // Dependencies for useEffect, re-run when these change

    return <canvas ref={canvasRef} />;
};

export default BarChartComponent;
