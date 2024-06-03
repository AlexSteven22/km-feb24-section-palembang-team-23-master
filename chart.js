document.addEventListener('DOMContentLoaded', function () {
    let dataset;

    fetch('dataset_23.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data;

            // Calculate total pizza sales
            const totalPizzaSales = dataset.reduce((total, item) => total + Number(item.quantity), 0);
            document.querySelector('.sec3 h1').textContent = totalPizzaSales.toLocaleString();

            // Calculate total orders
            const totalOrders = dataset.length;
            document.querySelector('.tot-or h1').textContent = totalOrders.toLocaleString();

            // Calculate total revenue
            const totalRevenue = dataset.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0);
            document.querySelector('.tot-rev h1').textContent = `$${(totalRevenue / 1000).toFixed(2)}k`;

            // Calculate number of pizza types
            const pizzaTypes = new Set(dataset.map(item => item.pizza_type_id)).size;
            document.querySelector('.piz-type h1').textContent = pizzaTypes.toLocaleString();

            // Calculate average revenue per order
            const averageRevenue = totalRevenue / totalOrders;
            document.querySelector('.avg-rev h1').textContent = `$${averageRevenue.toFixed(2)}`;

            // Function to get chart data
            function getChartData(chartType, dataset) {
                switch (chartType) {
                    // Generate data for Chart 1 (Revenue MoM)
                    case 'revenueMoM':
                        const months = [...new Set(dataset.map((item) => item.date.split('/')[0]))];
                        const revenueMoM = months.map((month) => {
                            const monthData = dataset.filter((item) => item.date.split('/')[0] === month);
                            const revenue = monthData.reduce((acc, item) => acc + item.quantity * item.price, 0);
                            return revenue;
                        });
                        return {
                            labels: months.map((month) => {
                                switch (month) {
                                    case '1': return 'Jan';
                                    case '2': return 'Feb';
                                    case '3': return 'Mar';
                                    case '4': return 'Apr';
                                    case '5': return 'May';
                                    case '6': return 'Jun';
                                    case '7': return 'Jul';
                                    case '8': return 'Aug';
                                    case '9': return 'Sep';
                                    case '10': return 'Oct';
                                    case '11': return 'Nov';
                                    case '12': return 'Dec';
                                    default: return month;
                                }
                            }),
                            datasets: [{
                                label: 'Revenue MoM',
                                data: revenueMoM,
                                borderWidth: 1
                            }]
                        };
                    // Generate data for Chart 2 (Sales per Month)
                    case 'salesPerMonth':
                        const salesMonths = [...new Set(dataset.map((item) => item.date.split('/')[0]))];
                        const salesPerMonth = salesMonths.map((month) => {
                            const monthData = dataset.filter((item) => item.date.split('/')[0] === month);
                            return monthData.reduce((acc, item) => acc + Number(item.quantity), 0);
                        });
                        return {
                            labels: salesMonths.map((month) => {
                                switch (month) {
                                    case '1': return 'Jan';
                                    case '2': return 'Feb';
                                    case '3': return 'Mar';
                                    case '4': return 'Apr';
                                    case '5': return 'May';
                                    case '6': return 'Jun';
                                    case '7': return 'Jul';
                                    case '8': return 'Aug';
                                    case '9': return 'Sep';
                                    case '10': return 'Oct';
                                    case '11': return 'Nov';
                                    case '12': return 'Dec';
                                    default: return month;
                                }
                            }),
                            datasets: [{
                                label: 'Sales per Month',
                                data: salesPerMonth,
                                borderWidth: 1
                            }]
                        };
                    // Generate data for Chart 3 (Revenue VS Order)
                    case 'revenueVsOrder':
                        const revormonths = [...new Set(dataset.map((item) => item.date.split('/')[0]))];
                        const revenueVsOrder = revormonths.map((month) => {
                            const monthData = dataset.filter((item) => item.date.split('/')[0] === month);
                            const revenue = monthData.reduce((acc, item) => acc + item.quantity * item.price, 0);
                            return { revenue, orderCount: monthData.length };
                        });
                        return {
                            labels: revormonths.map((month) => {
                                switch (month) {
                                    case '1': return 'Jan';
                                    case '2': return 'Feb';
                                    case '3': return 'Mar';
                                    case '4': return 'Apr';
                                    case '5': return 'May';
                                    case '6': return 'Jun';
                                    case '7': return 'Jul';
                                    case '8': return 'Aug';
                                    case '9': return 'Sep';
                                    case '10': return 'Oct';
                                    case '11': return 'Nov';
                                    case '12': return 'Dec';
                                    default: return month;
                                }
                            }),
                            datasets: [
                                {
                                    label: 'Revenue',
                                    data: revenueVsOrder.map((item) => item.revenue),
                                    borderWidth: 1
                                },
                                {
                                    label: 'Order Count',
                                    data: revenueVsOrder.map((item) => item.orderCount),
                                    borderWidth: 1
                                }
                            ]
                        };
                    // Generate data for Chart 4 (Order By Pizza Size)
                    case 'orderByPizzaSize':
                        const sizes = [...new Set(dataset.map((item) => item.size))];
                        const sizeCounts = sizes.map((size) => {
                            const sizeData = dataset.filter((item) => item.size === size);
                            return sizeData.length;
                        });
                        const totalOrders = dataset.length;
                        const sizePercentages = sizeCounts.map((count) => (count / totalOrders) * 100);
                        return {
                            labels: sizes,
                            datasets: [{
                                label: 'Order by Pizza Size',
                                data: sizePercentages,
                                backgroundColor: [
                                    'rgba(0, 190, 255, 0.4)',
                                    'rgba(0, 150, 255, 0.4)',
                                    'rgba(0, 120, 255, 0.4)',
                                    'rgba(0, 192, 255, 0.2)',
                                    'rgba(0, 102, 255, 0.2)',
                                    'rgba(0, 159, 255, 0.2)'
                                ],
                                borderWidth: 1
                            }]
                        };
                    // Generate data for Chart 5 (Order by Category)
                    case 'orderByCategory':
                        const categories = [...new Set(dataset.map((item) => item.category))];
                        const categoryCounts = categories.map((category) => {
                            const categoryData = dataset.filter((item) => item.category === category);
                            return categoryData.length;
                        });
                        return {
                            labels: categories,
                            datasets: [{
                                label: 'Order by Category',
                                data: categoryCounts,
                                borderWidth: 1
                            }]
                        };
                }
            }

            // Create Chart 1 (Revenue MoM)
            const ctx1 = document.getElementById('myChart1');
            new Chart(ctx1, {
                type: 'line',
                data: getChartData('revenueMoM', dataset),
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
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
                    maintainAspectRatio: false
                }
            });

            // Create Chart 2 (Sales per Month)
            const ctx2 = document.getElementById('myChart2');
            new Chart(ctx2, {
                type: 'bar',
                data: getChartData('salesPerMonth', dataset),
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
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
                    maintainAspectRatio: false
                }
            });

            // Create Chart 3 (Revenue vs Order)
            const ctx3 = document.getElementById('myChart3').getContext('2d');
            const revenueVsOrder = getChartData('revenueVsOrder', dataset);
            new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: revenueVsOrder.labels,
                    datasets: [
                        {
                            label: 'Revenue',
                            type: 'bar',
                            data: revenueVsOrder.datasets[0].data,
                            borderWidth: 1
                        },
                        {
                            label: 'Order Count',
                            type: 'line',
                            data: revenueVsOrder.datasets[1].data,
                            borderWidth: 1,
                            borderColor: 'rgba(0, 0, 0, 0.5)',
                            backgroundColor: 'rgba(0, 0, 0, 0.1)',
                            pointRadius: 0,
                            pointHoverRadius: 4,
                            pointBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                            pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                            pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                            pointHoverBorderColor: 'rgba(0, 0, 0, 0.5)',
                            pointStyle: 'circle'
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
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
                        annotation: {
                            annotations: revenueVsOrder.datasets[0].data.map((value, index) => ({
                                type: 'line',
                                scaleID: 'y',
                                value: value,
                                borderColor: 'rgba(255, 99, 132, 0.5)',
                                borderWidth: 2,
                                label: {
                                    content: `Revenue: ${value}`,
                                    enabled: true,
                                    position: 'right'
                                }
                            }))
                        }
                    },
                    maintainAspectRatio: false
                }
            });

            // Create Chart 4 (Order by Pizza Size)
            const ctx4 = document.getElementById('myChart4');
            new Chart(ctx4, {
                type: 'pie',
                data: getChartData('orderByPizzaSize', dataset),
                options: {
                    maintainAspectRatio: false,
                }
            });

            // Create Chart 5 (Order by Category)
            const ctx5 = document.getElementById('myChart5');
            new Chart(ctx5, {
                type: 'bar',
                data: getChartData('orderByCategory', dataset),
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                display: false
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        });
});
