import React from 'react'
import R from 'ramda'
import classnames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { layerWithNeededAtrSelector } from '../../selectors' 

import styles from './dashboard-style.styl'
import ChartComponent from './ChartComponent'
import opt from './chartsdata'

function buildData(config, feature, layer) {
  let dataResult = config
  if (!R.isNil(layer)) {
    const values = R.pickBy((attribute, key) => !R.isNil(R.prop(key, layer)), feature.properties)
    const valueSum = R.reduce(R.add, 0, R.values(values))
  console.log(values, valueSum)
    const newData = R.map(([key, value]) => ({ name: layer[key].label, y: value/valueSum*100 }), R.toPairs(values))
    dataResult.series[0].data = newData
  }
  console.log(dataResult)
  return dataResult
}

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
    const config = buildData(opt, feature, layer)
    // if (!R.isNil(layer)) {
    //   const values = R.pickBy((attribute, key) => !R.isNil(R.prop(key, layer)), feature.properties)
    //   console.log(values, opt)
    //   data.series[0].data = R.values(values)
    //   data.series[0].name = layer[R.head(R.keys(values))].label
    //   data.tooltip.valueSuffix = layer[R.head(R.keys(values))].units
    //   console.log(layer[R.head(R.keys(values))].units)
    //   // data.yAxis.labels.format = layer[R.head(R.keys(values))].units
    // }
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
          { this.renderChart(config) }
        </div>
      </div>)}
      </div>
    )
  }
}

export default connect(layerWithNeededAtrSelector)(Dashboard)
