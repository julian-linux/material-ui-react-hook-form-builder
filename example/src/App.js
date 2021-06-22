import React, { useState, useCallback } from 'react'

import BuildForm from 'material-ui-react-hook-form-builder'

import config from './config'

const buttonProps = { size: 'medium', label: 'Save', position: 'flex-end' }
const backButtonProps = { show: true, label: 'Back', action: () => {} }

const App = () => {
  const [formData] = useState(() => {
    const data = Object.assign({}, config)
    return data
  })

  const handleSubmit = useCallback((formData) => {
    console.log('formData', formData)
  }, [])

  const handleBackAction = useCallback(() => {
    console.log('back btn clicked')
  }, [])

  
  return (
    <BuildForm
      config={formData}
      onSubmit={handleSubmit}
      loading={false} // loading state when post/get
      submitErrors={{}} // errors from server. example {"name":"already exists"}
      noBackButton={false} // true if want to remove back button
      backAction={handleBackAction} // when back btn is pressed
      // columns={2} split the form in 2 columns. Must to configure input position on config file: {name: {column: 1, ...otherProps}, option:{column: 2}}
      buttonProps={buttonProps} // options for saveButton... optionals
      backButtonProps={backButtonProps}
    />
  )
}

export default App
