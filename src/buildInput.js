import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import NumberFormat from './numberFormat';
import Radio from './radio';
import Checkbox from './checkbox';
import Select from './select';
import TextField from './textField';

const BuildInput = ({ component, ...props }) => {
  switch (props.type) {
    case 'divider':
      return <Box m={1}><Divider idx={props.name} /></Box>;
    case 'numberFormat':
      return <NumberFormat idx={props.name} {...props} />;
    case 'radio':
      return <Radio idx={props.name} {...props} />;
    case 'checkbox':
      return <Checkbox idx={props.name} {...props} />;
    case 'select':
      return <Select idx={props.name} {...props} />;
    case 'component':
      return component ? component(props) : '_____NO_COMPONENT______';
    case 'text':
    default:
      return <TextField {...props} />;
  }
};

BuildInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired, // type: PropTypes.oneOf(['divider', 'numberFormat', 'radio', 'checkbox', 'select', 'component', 'text']),
  component: PropTypes.func,
};

BuildInput.defaultProps = {
  component: null,
};

export default BuildInput;
