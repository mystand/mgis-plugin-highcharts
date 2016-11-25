import React from 'react'
import R from 'ramda'
import classnames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { layerWithNeededAtrSelector } from '../../selectors' 

import styles from './dashboard-style.styl'
import ChartComponent from './ChartComponent'
import opt from './chartsdata'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: true }  
  }

  renderChart = (opt1) => {
    const lay = styles.left
    return (
      <div
        key={ opt1.title.text }
        className={ classnames(styles.preContainer, lay) }
      >
        <div
          className={ styles.container }
        >
          <ChartComponent
            type={'pie'}
            container={ opt1.title.text }
            options={ opt1 }
          />
        </div>
      </div>
    )
  }

  render() { 
    console.log(this.props)
    const { layer, feature } = this.props
    let data1 = opt
    let data = opt
    if (!R.isNil(layer)) {
      const values = R.pickBy((attribute, key) => !R.isNil(R.prop(key, layer)), feature.properties)
      console.log(values, opt)
      data.series[0].data = R.values(values)
      data.series[0].name = layer[R.head(R.keys(values))].label
      data.tooltip.valueSuffix = layer[R.head(R.keys(values))].units
      console.log(layer[R.head(R.keys(values))].units)
      // data.yAxis.labels.format = layer[R.head(R.keys(values))].units
    }
    console.log(data1, data)
    return (
      <div>
      { !R.isNil(layer) &&
      (this.state.show ?
      <div
        onClick={ () => { this.setState({ show: R.not(this.state.show)}) }}
      >
       { 'Показать, скрыть графики' }
      </div> :
      <div className={ styles.dashboard }>
        <div className={ styles.mainBlock }>
          <div className={ styles.headBlock }>
            <div className={ styles.title }>
              { 'Целевые показатели' }
            </div>
              <div
                title={ 'Close card' }
                className={ styles.close }
              >
              </div>
          </div>
          { this.renderChart(data) }
        </div>
      </div>)}
      </div>
    )
  }
}

export default connect(layerWithNeededAtrSelector)(Dashboard)
