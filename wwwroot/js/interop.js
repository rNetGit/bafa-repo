window.cleanupAllCharts = () => {
    try {
        const canvas = document.getElementById('membershipBarChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        return true;
    } catch (error) {
        console.error('Error cleaning up charts:', error);
        return false;
    }
};

window.initializeBlazorInterop = () => {
    return true;
};

window.cleanupBlazorInterop = () => {
    try {
        cleanupAllCharts();
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
        const canvas = document.getElementById('membershipBarChart');
        if (!canvas) {
            console.error('Could not find #membershipBarChart element');
            return false;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get 2D context from canvas');
            return false;
        }

        // Create new chart instance
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Membership Count',
                        data: countsData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true },
                    title: {
                        display: true,
                        text: 'Membership Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Members'
                        }
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

        new Chart(ctx, {
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

        new Chart(ctx, {
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

window.renderMembershipStackedBarChart = (membershipTypes, statuses, labels, datasets) => {
    try {
        const canvas = document.getElementById('membershipBarChart');
        if (!canvas) {
            console.error('Could not find #membershipBarChart element');
            return false;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Could not get 2D context from canvas');
            return false;
        }

        // Create new chart instance
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: membershipTypes,
                datasets: labels.map((label, index) => ({
                    label: label,
                    data: datasets[index],
                    backgroundColor: getColorForStatus(label),
                    borderColor: getColorForStatus(label, 1),
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { 
                        display: true,
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Membership Distribution by Type and Status'
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Membership Type'
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Members'
                        }
                    }
                }
            }
        });

        return true;
    } catch (error) {
        console.error('Error rendering membership stacked bar chart:', error);
        return false;
    }
};

// Helper function to get colors for different statuses
function getColorForStatus(status, alpha = 0.6) {
    const colors = {
        'Active': `rgba(75, 192, 192, ${alpha})`,    // Green
        'Pending': `rgba(255, 159, 64, ${alpha})`,   // Orange
        'Expired': `rgba(255, 99, 132, ${alpha})`,   // Red
        'Unknown': `rgba(201, 203, 207, ${alpha})`   // Gray
    };
    return colors[status] || `rgba(54, 162, 235, ${alpha})`; // Default blue
}