import { createSelector } from 'reselect'
import R from 'ramda'


export const layerWithNeededAtrSelector = createSelector(
  state => state.routing,
  state => state.layers,
  state => state.pluginConfigs['highcharts'],
  (routing, layers, config) => {
    const featureId = routing.params.featureId
    const neededLayers = R.reduce((r, layer) => r[`${layer.sourceLayerKey}`]={ attributes: layer.fields }, {}, config.items)
    const pickedLayers = R.map(layer => {
      const withinNeeded = R.prop(layer.key, neededLayers)
      if (!R.isNil(withinNeeded)) {
        return R.updatePath(['attributes'], R.pickAll(withinNeeded), layer)
      }
    }, layers)
  return {
    featureId,
    pickedLayers
  }
  }
)
