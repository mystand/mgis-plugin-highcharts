import { createSelector } from 'reselect'
import R from 'ramda'


export const layerWithNeededAtrSelector = createSelector(
  state => state.routing,
  state => state.layers,
  state => state.pluginConfigs['highcharts'],
  state => state.features,
  (routing, layers, config, features) => {
    const featureId = routing.params.featureId
    const feature = features[featureId]
    if (R.isNil(feature)) {
      return { layer: undefined }
    }
    const neededLayers = R.reduce((r, layer) => R.assoc(layer.sourceLayerKey, { attributes: layer.fields }, r), {}, R.values(config.items))
    const pickedLayers = R.filter(R.pipe(R.isNil, R.not), R.map(layer => {
      const withinNeeded = R.prop(layer.key, neededLayers)
      if (!R.isNil(withinNeeded)) {
        return R.pickBy(attribute => R.contains(attribute.id, withinNeeded.attributes), layer.attributes)
      }
    }, layers))
    const layer = pickedLayers[feature.properties.layer_key]
  return {
    featureId,
    pickedLayers,
    feature,
    layer
  }
  }
)
