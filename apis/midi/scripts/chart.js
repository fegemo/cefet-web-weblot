let currentChart;

function renderNotesHistogramChart() {

  const labels = Object.keys(notesHistogram);

  const data = {
    labels,
    datasets: [{
      label: 'Tempo da nota (ms)',
      backgroundColor: 'rgb(216, 2, 134)',
      borderColor: 'rgb(216, 2, 134)',
      data: Object.values(notesHistogram)
    }]
  };

  const chartConfig = {
    type: 'bar',
    data,
    options: {}
  };

  if (currentChart) {
    currentChart.destroy()
  }

  currentChart = new Chart(
    document.getElementById('histogramCanvas'),
    chartConfig
  );
  notesPressTimestamp = {};
}

function resetHistogram() {
  notesHistogram = getDefaultNotesHistogram();
  renderNotesHistogramChart();
}