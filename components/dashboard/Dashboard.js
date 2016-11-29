import React, { PropTypes } from 'react'
import R from 'ramda'
import classnames from 'classnames'
import { connect } from 'react-redux'

import styles from './dashboard-style.styl'
import ChartComponent from './ChartComponent'
import opt from './chartsdata'

function buildData(data, feature, layer, pluginConfig) {
  if (R.isNil(feature.id)) {
    return { layer: undefined }
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
    return null
  }, null, R.values(pluginConfig.items))
  if (!R.isNil(neededLayer)) {
    const dataResult = data
    const values = R.map(JSON.parse, neededLayer.attributes)
    const valueSum = R.reduce(R.add, 0, R.values(values))
    const newTitle = `<b>${neededLayer.headers.title}</b>`
    const newPartLabel = neededLayer.headers.partLabel
    const newData = R.map(([key, value]) => ({
      name: layer.attributes[key].label,
      y: (value / valueSum) * 100
    }), R.toPairs(values))
    dataResult.series[0].data = newData
    dataResult.title.text = newTitle
    dataResult.series[0].name = newPartLabel
    return dataResult
  }
  return data
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
    const { layer, feature, pluginConfig } = this.props
    const config = buildData(opt, feature, layer, pluginConfig)

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

const configSelector = state => ({
  pluginConfig: state.pluginConfigs.highcharts
})

export default connect(configSelector)(Dashboard)
