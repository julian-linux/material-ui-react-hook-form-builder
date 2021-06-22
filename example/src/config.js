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
