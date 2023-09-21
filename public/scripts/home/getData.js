let cookiee = decodeURIComponent(document.cookie.slice(9))
cookiee = JSON.parse(cookiee)

document.getElementById("chart-1").style.display = 'none'
document.getElementById("chart-2").style.display = 'none'
document.getElementById("chart-3").style.display = 'none'

fetch(`/get_data/${cookiee.nama}`, {
    method: 'GET'
})
    .then((response) => response.json())
    .then((data) => {

        document.querySelector('#my_ticket').textContent = data.num_data[0]
        document.querySelector('#critical_ticket').textContent = data.num_data[1]
        document.querySelector('#open_ticket').textContent = data.num_data[2]
        document.querySelector('#all_ticket').textContent = data.num_data[3]

        document.querySelectorAll('.loader').forEach(x => x.style.display = 'none')

        const ctx1 = document.getElementById('chart-1');
        ctx1.style.display = "inline"
        const chart = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['ATK', 'Consumables', 'Event Support', 'Expedition, Courier, & Mailing', 'Kartu Nama', 'Konsumsi', 'Rumah Tangga Kantor', 'Workstation & Furniture'],
                datasets: [{
                    label: 'Number of Tickets',
                    data: data.type_data,
                }],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Number of Tickets'
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

        const ctx2 = document.getElementById("chart-2").getContext("2d");
        document.getElementById("chart-2").style.display = 'inline'
        const data2 = {
            labels: ["Assigned", "In Progress", "Pending"],
            datasets: [
                {
                    label: "Low",
                    backgroundColor: "green",
                    data: data.status_data[0]
                },
                {
                    label: "Medium",
                    backgroundColor: "yellow",
                    data: data.status_data[1]
                },
                {
                    label: "High",
                    backgroundColor: "orange",
                    data: data.status_data[2]
                },
                {
                    label: "Critical",
                    backgroundColor: "red",
                    data: data.status_data[3]
                }
            ]
        };
        const myBarChart2 = new Chart(ctx2, {
            type: 'bar',
            label: 'Number of Tickets',
            data: data2,
            options: {
                barValueSpacing: 20,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            }
        });

        let chart3 = document.getElementById("chart-3")
        chart3.style.display = 'inline'
        let date = []
        let count = []
        console.log(data.date_data)
        data.date_data.forEach(e => {
            date.push(`${e._id.day}/${e._id.month}/${e._id.year}`)
            count.push(e.count)
        })
        new Chart(chart3, {
            type: 'line', //This is a line chart
            data: {
                labels: date, //x-axes data 
                datasets: [{
                    label: "Line Chart",
                    data: count, //y-axes data 
                    borderColor: 'blue',
                    fill: false,
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                }
            }
        });
    })