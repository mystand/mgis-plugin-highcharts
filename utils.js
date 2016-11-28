import R from 'ramda'

export function getAttributesFromBuildOptions(options) {
  const { values, fieldPath, directories: { layers } } = options
  const sourceLayerKeyFieldPath = [fieldPath[0], fieldPath[1], 'sourceLayerKey']
  const sourceLayerKeyValue = R.path(sourceLayerKeyFieldPath, values)

  if (R.isNil(sourceLayerKeyValue)) return []
  return R.find(x => x.key === sourceLayerKeyValue, layers).attributes
}
