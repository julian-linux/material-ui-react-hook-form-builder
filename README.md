# material-ui-react-hook-form-builder

> Create easy forms via config file in react using material-ui

[![NPM](https://img.shields.io/npm/v/material-ui-react-hook-form-builder.svg)](https://www.npmjs.com/package/material-ui-react-hook-form-builder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save material-ui-react-hook-form-builder
```

## Usage

Need to install @material-ui/icons in your main app.
Create forms via config file

# config.js

```jsx
// Libraries
import * as yup from 'yup'

// Icons
import CategoryIcon from '@material-ui/icons/Category'
import DescriptionIcon from '@material-ui/icons/Description'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'

export default {
  name: {
    // this is the input name
    type: 'input',
    label: 'Name',
    icon: CategoryIcon,
    validation: yup.string(),
    variant: 'outlined'
    //...otherProps   --> generally other props for input
  },
  description: {
    type: 'textarea',
    label: 'Description',
    validation: yup.string(),
    icon: DescriptionIcon,
    multiline: true,
    rows: 4
    //...otherProps   --> generally other props for input
  },
  check:{
    type: 'checkbox',
    label: 'Checked',
    value: true
  },
  numberFormat: {
    type: 'numberFormat'
  },
  radio: {
    type: 'radio',
    label: 'Radio',
    items: [
      { value: true, label: 'True' },
      { value: false, label: 'False' }
    ],
  },
  options: {
    type: 'select',
    label: 'Options',
    icon: CollectionsBookmarkIcon,
    items: [
      { id: 1, name: 'Yes' },
      { id: 2, name: 'No' }
    ],
    validation: yup.string().required(),
    tooltip: 'Yes/No Option' // --> can be used in any input
  }
}

```

# App.js

```jsx
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


```

## License

MIT © [julian-linux](https://github.com/julian-linux)
