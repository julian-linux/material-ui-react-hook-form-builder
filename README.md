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
import { string } from 'yup';

// Icons
import CategoryIcon from '@material-ui/icons/Category';
import DescriptionIcon from '@material-ui/icons/Description';

export default {
  name: {
    type: 'input',
    name: 'name',
    label: 'Name',
    icon: CategoryIcon,
    validation: string(),
  },
  description: {
    type: 'textarea',
    name: 'description',
    label: 'Description',
    validation: string(),
    icon: DescriptionIcon,
    multiline: true,
    rows: 4,
  },
};
```

# App.js
```jsx
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

```

## License

MIT © [julian-linux](https://github.com/julian-linux)
