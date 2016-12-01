const opt = {
  chart: {
    style: {
      fontFamily: 'Open Sans, sans-serif'
    },
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  title: {
    align: 'left',
    text: '<b>Название графика</b>',
    type: 'pie'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> <br> колличество: <b>{point.y}</b> <b>{point.units}</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Доля в процентах',
    data: [{
      name: 'Proprietary or Undetectable',
      units: 'т',
      y: 0.2
    }]
  }]
}

export default opt
