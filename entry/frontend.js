import Dashboard from '../components/dashboard/Dashboard'
import FieldsInput from '../components/fields-input/FieldsInput'

export default {
  name: 'Графики',
  options: [
    {
      key: 'items',
      label: 'Слои для графика',
      type: 'array',
      item: {
        fields: [
          { key: 'sourceLayerKey', label: 'Слой', type: 'select', options: 'layers' },
          { key: 'fields', label: 'Величины для графика', type: FieldsInput },
        ]
      }
    }
  ],
  connects: {
    components: [
      { component: Dashboard, position: 'cardBottom' }
    ]
  }
}
