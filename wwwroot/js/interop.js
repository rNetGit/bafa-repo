window.cleanupAllCharts = () => {
    try {
        if (window.membershipBarChart) {
            window.membershipBarChart.destroy();
            window.membershipBarChart = null;
        }
        if (window.eventDonutChartInstance) {
            window.eventDonutChartInstance.destroy();
            window.eventDonutChartInstance = null;
        }
        if (window.paymentPieChartInstance) {
            window.paymentPieChartInstance.destroy();
            window.paymentPieChartInstance = null;
        }
        console.log('All charts cleaned up');
        return true;
    } catch (error) {
        console.error('Error cleaning up charts:', error);
        return false;
    }
};

window.initializeBlazorInterop = () => {
    console.log('Blazor interop initialized');
    return true;
};

window.cleanupBlazorInterop = () => {
    try {
        cleanupAllCharts();
        console.log('Blazor interop cleaned up');
        return true;
    } catch (error) {
        console.error('Error in cleanupBlazorInterop:', error);
        return false;
    }
};

if (typeof window.confirm !== 'function') {
    window.confirm = (message) => {
        return window.confirm(message);
    };
}

window.renderMembershipBarChart = (labels, countsData, feesData) => {
    try {
        const ctx = document.getElementById('membershipBarChart')?.getContext('2d');
        if (!ctx) {
            console.error('Could not find membershipBarChart canvas element');
            return false;
        }

        if (window.membershipBarChart) {
            window.membershipBarChart.destroy();
            window.membershipBarChart = null;
        }

        window.membershipBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Membership Count',
                        data: countsData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        yAxisID: 'y-count'
                    },
                    {
                        label: 'Membership Fees Total',
                        data: feesData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        yAxisID: 'y-fee'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    title: { display: false }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Membership Type & Status'
                        }
                    },
                    'y-count': {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: true,
                        precision: 0,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    },
                    'y-fee': {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Fees ($)'
                        },
                        grid: { drawOnChartArea: false }
                    }
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Error rendering membership bar chart:', error);
        return false;
    }
};

window.renderEventDonutChart = (labels, data) => {
    try {
        const ctx = document.getElementById('eventDonutChart')?.getContext('2d');
        if (!ctx) {
            console.error('Could not find eventDonutChart canvas element');
            return false;
        }

        if (window.eventDonutChartInstance) {
            window.eventDonutChartInstance.destroy();
            window.eventDonutChartInstance = null;
        }

        window.eventDonutChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Registrations',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: 'Event Registrations (Current Year)'
                    }
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Error rendering event donut chart:', error);
        return false;
    }
};

window.renderPaymentPieChart = (labels, data) => {
    try {
        const ctx = document.getElementById('paymentPieChart')?.getContext('2d');
        if (!ctx) {
            console.error('Could not find paymentPieChart canvas element');
            return false;
        }

        if (window.paymentPieChartInstance) {
            window.paymentPieChartInstance.destroy();
            window.paymentPieChartInstance = null;
        }

        window.paymentPieChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Amount',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: 'Payments by Purpose (Current Year)'
                    }
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Error rendering payment pie chart:', error);
        return false;
    }
};