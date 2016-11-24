import React, { PropTypes } from 'react'
import R from 'ramda'

import { getAttributesFromBuildOptions } from '../../utils'

const FieldsInput = (props) => {
  const { onChange, buildOptions } = props
  const value = props.value === '' ? [] : props.value
  const attributes = getAttributesFromBuildOptions(buildOptions)

  function onCheckboxChange(key) {
    onChange(R.toggle(key, value))
  }

  return (
    <div>
      <div>Отображаемые поля</div>
      <div style={ { marginLeft: '20px', marginBottom: '20px' } }>
        {
          R.values(attributes).map((attribute) => {
            const id = `fields-${attribute.key}`
            return (
              <div 
                key={ attribute.id }
                onClick={ R.partial(onCheckboxChange, [attribute.id]) }
              >
                <input
                  id={ id }
                  type='checkbox'
                  checked={ R.contains(attribute.id, value) }
                />
                <label htmlFor={ id }> {attribute.label} </label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

FieldsInput.propTypes = {
  buildOptions: PropTypes.shape({
    fieldPath: PropTypes.array.isRequired
  }).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired
}

export default FieldsInput
