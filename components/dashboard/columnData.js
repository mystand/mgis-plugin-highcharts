const column = {
  chart: {
    style: {
      fontFamily: 'Open Sans, sans-serif'
    },
    type: 'column'
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    title: {
      text: ''
    }
  },
  legend: {
    enabled: false
  },
  title: {
    align: 'left',
    text: '<b>Название графика</b>',
    type: 'column'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.persentage:.1f}%</b> <br> значение: <b>{point.y}</b> <b>{point.units}</b>'
  },
  plotOptions: {
    borderWidth: 0,
    dataLabels: {
      enabled: true,
      format: '{point.y}'
    }
  },
  series: [{
    data: [{
      name: 'Proprietary or Undetectable',
      units: 'т',
      y: 0.2
    }]
  }]
}

export default column
