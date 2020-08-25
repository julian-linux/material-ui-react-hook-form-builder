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