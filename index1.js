let numbersArray = loadFromLocalStorage() || [];

// Create the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: numbersArray.map((_, index) => index + 1),
        datasets: [{
            label: 'Weight',
            data: numbersArray,
            borderWidth: 1,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function addNumber() {
    const numberInput = document.getElementById('numberInput');
    const number = parseFloat(numberInput.value);

    if (!isNaN(number)) {
        numbersArray.push(number);
        numberInput.value = '';
        updateChart();
        saveToLocalStorage(numbersArray);
    } else {
        alert('Please enter a valid number');
    }
}

function updateChart() {
    // Update the chart data
    myChart.data.labels = numbersArray.map((_, index) => index + 1);
    myChart.data.datasets[0].data = numbersArray;
    myChart.update();
}

function saveToLocalStorage(data) {
    localStorage.setItem('numbersArray', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const storedData = localStorage.getItem('numbersArray');
    return storedData ? JSON.parse(storedData) : null;
}

// Initial chart update with data from local storage
updateChart();
