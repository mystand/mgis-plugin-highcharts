import React, { PropTypes } from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import ReactHighcharts from 'react-highcharts'

import styles from './dashboard-style.styl'
import opt from './chartsdata'

function buildData(data, feature, layer, pluginConfig) {
  if (R.isNil(feature.id)) {
    return null
  }

  const layer_key = feature.properties.layer_key
  const neededLayer = R.reduce((r, config) => {
    if (config.sourceLayerKey === layer_key) {
      return ({
        attributes: R.pickAll(config.fields, feature.properties),
        headers: {
          title: config.name,
          partLabel: config.partLabel
        }
      })
    }
    return r
  }, null, R.values(pluginConfig.items))
  if (!R.isNil(neededLayer)) {
    const dataResult = data
    const values = R.map(x => R.isNil(x) ? 0 : JSON.parse(x), neededLayer.attributes)
    const valuesSum = R.reduce(R.add, 0, R.values(values))
    if (valuesSum === 0) {
      return 'not enough data'
    }
    const newTitle = `<b>${neededLayer.headers.title}</b>`
    const newPartLabel = neededLayer.headers.partLabel
    const newData = R.map(([key, value]) => ({
      name: layer.attributes[key].label,
      y: (value / valuesSum) * 100
    }), R.toPairs(values))
    dataResult.series[0].data = newData
    dataResult.title.text = newTitle
    dataResult.series[0].name = newPartLabel
    return dataResult
  }
  return 'config is empty'
}

class Dashboard extends React.Component {
  static propTypes = {
    layer: PropTypes.object,
    feature: PropTypes.object,
    pluginConfig: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  render() {
    const { layer, feature, pluginConfig } = this.props
    const config = buildData(opt, feature, layer, pluginConfig)

    if (!R.isNil(config)) {
      return (
        <div>
          <div
            className={ styles.buttonContainer }
            onClick={ () => { this.setState({ show: R.not(this.state.show) }) } }
          >
            <div className={ styles.showButton }>
              { 'Показать, скрыть графики' }
            </div>
          </div>
          { this.state.show &&
          <div className={ styles.preContainer }>
            <div className={ styles.container }>
              <ReactHighcharts config={ config } />
            </div>
          </div>}
        </div>
      )
    }
    if (R.type(config) === 'String') {
      return (
        <div className={ styles.errorMessage }>
          {'Недостаточно данных для графика'}
        </div>
      )
    }
    return null
  }
}

const configSelector = state => ({
  pluginConfig: state.pluginConfigs.highcharts
})

export default connect(configSelector)(Dashboard)
