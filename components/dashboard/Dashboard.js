import React from 'react'
import R from 'ramda'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { layerWithNeededAtrSelector } from '../../selectors' 

import styles from './dashboard-style.styl'
import ChartComponent from './ChartComponent'
import opt from './chartsdata'

function buildData(config, feature, layer) {
  let dataResult = config
  if (!R.isNil(layer)) {
    const values = R.pickBy((attribute, key) => !R.isNil(R.prop(key, layer.attributes)), feature.properties)
    const valueSum = R.reduce(R.add, 0, R.values(values))
    const newTitle = `<b>${layer.headers.title}</b>`
    const newPartLabel = layer.headers.partLabel
    const newData = R.map(([key, value]) => ({ name: layer.attributes[key].label, y: value/valueSum*100 }), R.toPairs(values))
    dataResult.series[0].data = newData
    dataResult.title.text = newTitle
    dataResult.series[0].name = newPartLabel
  }
  return dataResult
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }  
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
    const { layer, feature } = this.props
    const config = buildData(opt, feature, layer)
    if (!R.isNil(layer)) {
      return (
        <div>
          <div
            className={ styles.buttonContainer }
            onClick={ () => { this.setState({ show: R.not(this.state.show)}) }}
          >
            <div className={ styles.showButton }>
              { 'Показать, скрыть графики' }
            </div>
          </div> 
        { this.state.show && 
          <div className={ styles.dashboard }>
            <div className={ styles.mainBlock }>
              { this.renderChart(config) }
            </div>
          </div>}
        </div>
      )
    }
    return null
  }
}

export default connect(layerWithNeededAtrSelector)(Dashboard)
