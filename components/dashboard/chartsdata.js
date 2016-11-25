const opt =
  {
    title: {
      align: 'left',
      text: '<b>Всего отходов</b>'
    },
    xAxis: {
      categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]
    },
    yAxis: {
      title: {
        text: null
      },
      labels: {
        format: '{value}'
      }
    },
    tooltip: {
      valueSuffix: ''
    },
    legend: {
      enabled: true
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'I - класс опасности',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }],
    credits: false
  }

export default opt
