document.addEventListener('DOMContentLoaded', function () {
  // Download chart as PNG
  const downloadBtn = document.getElementById('downloadChartBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      const canvas = document.getElementById('bucks2barChart');
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bucks2bar-chart.png';
        link.click();
      }
    });
  }
  let chartInstance = null;
  function renderChart() {
    var ctx = document.getElementById('bucks2barChart');
    if (ctx) {
      const { income, expenses } = getMonthlyValues();
      if (chartInstance) chartInstance.destroy();
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
          ],
          datasets: [
            {
              label: 'Income',
              backgroundColor: 'rgba(54, 162, 235, 0.7)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
              data: income
            },
            {
              label: 'Expenses',
              backgroundColor: 'rgba(255, 99, 132, 0.7)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: expenses
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              min: 0,
              max: 6000,
              ticks: {
                stepSize: 500
              }
            }
          }
        }
      });
    }
  }

  // Listen for Chart tab click
  const chartTabBtn = document.getElementById('chart-tab');
  if (chartTabBtn) {
    chartTabBtn.addEventListener('shown.bs.tab', function () {
      renderChart();
    });
  }

  function getMonthlyValues() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const income = [];
    const expenses = [];
    months.forEach(month => {
      const incomeInput = document.getElementById(`income-${month.toLowerCase()}`);
      const expensesInput = document.getElementById(`expenses-${month.toLowerCase()}`);
      income.push(incomeInput ? Number(incomeInput.value) : 0);
      expenses.push(expensesInput ? Number(expensesInput.value) : 0);
    });
    return { income, expenses };
  }

  function setInputIds() {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach(month => {
      const incomeInputs = document.querySelectorAll(`.card-title:contains('${month}') ~ .row .input-group input[placeholder='Enter income']`);
      const expensesInputs = document.querySelectorAll(`.card-title:contains('${month}') ~ .row .input-group input[placeholder='Enter expenses']`);
      if (incomeInputs.length) incomeInputs[0].id = `income-${month.toLowerCase()}`;
      if (expensesInputs.length) expensesInputs[0].id = `expenses-${month.toLowerCase()}`;
    });
  }
  setInputIds();
});

// Ensure input fields have unique IDs in index.html like id="income-january", id="expenses-january", etc.
// The renderChart function already fetches the latest values from the inputs each time the Chart tab is shown.
// No further code changes needed unless you want to update input IDs in index.html.
