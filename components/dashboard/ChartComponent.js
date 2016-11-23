import Highcharts from 'highcharts'
import React, { PropTypes } from 'react'

class ChartComponent extends React.Component {

  componentDidMount() {
    // Extend Highcharts with modules
    if (this.props.modules) {
      this.props.modules.forEach((module) => {
        module(Highcharts)
      })
    }
    // Set container which the chart should render to.
    this.chart = new Highcharts[this.props.type || 'Chart'](
      this.props.container,
      this.props.options
    )
  }

  // Create the div which the chart will be rendered to.
  render() {
    return React.createElement('div', { id: this.props.container })
  }
}

ChartComponent.propTypes = {
  modules: PropTypes.array,
  type: PropTypes.string,
  container: PropTypes.string,
  options: PropTypes.object
}

export default ChartComponent
