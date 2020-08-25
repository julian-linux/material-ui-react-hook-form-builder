import React, { useState } from 'react'

import BuildForm from 'material-ui-react-hook-form-builder'
 
import config from './config'

const App = () => {
  const [formData] = useState(() => {
    const data = Object.assign({}, config);
    return data;
  });

  const handleSubmit = (formData) => {
    console.log('formData',formData)
  }

  return (
  <BuildForm 
    config={formData}
    onSubmit={handleSubmit}
    loading={false}
    submitErrors={{}}
  />
  )
}

export default App
