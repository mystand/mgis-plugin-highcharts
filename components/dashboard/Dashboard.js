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
      const configFromState = {
        attributes: R.pickAll(config.fields, feature.properties),
        headers: {
          title: config.name,
          partLabel: config.partLabel
        }
      }
      return (r.concat(configFromState))
    }
    return r
  }, [], R.values(pluginConfig.items))
  if (!R.isEmpty(neededLayer)) {
    const newConfig = neededLayer.map((cfg) => {
      const dataResult = R.clone(data)
      const values = R.map(x => R.isNil(x) ? 0 : JSON.parse(x), cfg.attributes)
      const valuesSum = R.reduce(R.add, 0, R.values(values))
      if (valuesSum === 0) {
        return cfg.headers.title
      }
      const newTitle = `<b>${cfg.headers.title}</b>`
      const newPartLabel = cfg.headers.partLabel
      const newData = R.map(([key, value]) => ({
        name: layer.attributes[key].label,
        units: layer.attributes[key].units,
        y: value
      }), R.toPairs(values))
      dataResult.series[0].data = newData
      dataResult.title.text = newTitle
      dataResult.series[0].name = newPartLabel
      return dataResult
    })
    return newConfig
  }
  return null
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

  renderHighChart(cfg, index) {
    if (R.type(cfg) === 'String') {
      return (
        <div
          key={ index }
          className={ styles.preContainer }
        >
          <div className={ styles.errorMessage }>
            <div className={ styles.messageTitle }>{ cfg }</div>
            <div>{'Недостаточно данных для графика'}</div>
          </div>
        </div>
      )
    }
    return (
      <div
        key={ index }
        className={ styles.preContainer }
      >
        <div className={ styles.container }>
          <ReactHighcharts config={ cfg } />
        </div>
      </div>
    )
  }

  render() {
    const { layer, feature, pluginConfig } = this.props
    const configList = buildData(opt, feature, layer, pluginConfig)

    if (R.isNil(configList)) {
      return null
    }
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
        configList.map((cfg, index) => this.renderHighChart(cfg, index))}
      </div>
    )
  }
}

const configSelector = state => ({
  pluginConfig: state.pluginConfigs.highcharts
})

export default connect(configSelector)(Dashboard)
