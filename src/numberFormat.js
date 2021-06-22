import React from 'react';

// import PropTypes from 'prop-types';
// import MaskedInput from 'react-text-mask';
import NumberFormat from 'react-number-format';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import TextField from './textField';
// import FormControl from '@material-ui/core/FormControl';

const NumberFormatCustom = ({ inputRef, onChange, ...props }) => (
  <NumberFormat
    {...props}
    getInputRef={inputRef}
    onValueChange={({ value }) => {
      onChange({
        target: {
          name: props.name,
          value,
        },
      });
    }}
    thousandSeparator="."
    isNumericString
    allowNegative={false}
    decimalSeparator={props.decimalSeparator || false}
    prefix={props.prefix}
  />
);

const CommonNumberFormat = (props) => (
  <TextField
    {...props}
    InputProps={{
      inputComponent: NumberFormatCustom,
    }}
  />
);

export default React.memo(CommonNumberFormat);
