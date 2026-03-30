const tableBody = document.getElementById("tableBody");
const monthFilter = document.getElementById("monthFilter");
let chart;

async function fetchData(month = "") {
    let url = "http://127.0.0.1:8000/api/productivity";

    if (month) {
        url += `?month=${month}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!month) {
        populateDropdown(data);
    }

    updateTable(data);
    updateChart(data);
}

function updateTable(data) {
    tableBody.innerHTML = "";

    data.forEach(item => {
        tableBody.innerHTML += `
            <tr>
                <td>${item.month}</td>
                <td>${item.department}</td>
                <td>${item.tasks_completed}</td>
            </tr>
        `;
    });
}

function populateDropdown(data) {
    const months = [...new Set(data.map(item => item.month))];

    monthFilter.innerHTML = '<option value="">All</option>';

    months.forEach(month => {
        monthFilter.innerHTML += `
            <option value="${month}">${month}</option>
        `;
    });
}

function updateChart(data) {

    const departmentTotals = {};

    data.forEach(item => {
        if (departmentTotals[item.department]) {
            departmentTotals[item.department] += item.tasks_completed;
        } else {
            departmentTotals[item.department] = item.tasks_completed;
        }
    });

    const departments = Object.keys(departmentTotals);
    const tasks = Object.values(departmentTotals);

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");
    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: departments,
            datasets: [{
                label: "Total Tasks Completed",
                data: tasks,
                backgroundColor: "#4e73df",
                borderRadius: 6,
                barThickness: 40
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

monthFilter.addEventListener("change", function () {
    fetchData(this.value);
});

fetchData();