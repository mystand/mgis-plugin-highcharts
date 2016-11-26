const opt =
{           
    chart: {
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
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
        y: 0.2
      }]
    }]
  }

export default opt
