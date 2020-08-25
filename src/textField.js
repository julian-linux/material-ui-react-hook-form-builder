// Libraries
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// Material Components
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import Error from '@material-ui/icons/Error';

// Styles
import useStyles from './styles';

const CommonFormTextField = ({
  name,
  label,
  type,
  register,
  errors,
  icon: Icon,
  inputProps,
  className,
  helpText,
  value,
  required,
  setValue,
  disabled,
  onChange,
  getValues,
  tooltip,
  error,
  ...props
}) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
    if (onChange) {
      onChange(evt.target.value, getValues);
    }
  };

  useEffect(() => {
    register && register({ name, required });
  }, [register, name, required]);

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    setValue && setValue(name, inputValue);
  }, [setValue, name, inputValue]);

  const input = (
    <TextField
      {...props}
      value={inputValue}
      onChange={handleChange}
      fullWidth
      className={clsx(classes.textField, className)}
      error={error || !!errors[name]}
      helperText={(errors[name] && errors[name].message) || helpText}
      label={label || name}
      name={name}
      type={type}
      disabled={disabled}
      size="small"
      inputProps={{
        ...inputProps,
        'aria-label': inputProps && inputProps['aria-label'] ? inputProps['aria-label'] : name,
        style: {
          /** TODO: fix this spacing */
          marginLeft: !Icon ? 20 : 0,
        },
      }}
      InputProps={{
        ...props.InputProps,
        startAdornment: Icon && (
          <InputAdornment position="start">
            <Icon color="action" />
          </InputAdornment>
        ),
        endAdornment: errors[name] && (
          <InputAdornment position="end">
            <Error color="secondary" style={{ fontSize: 12 }} />
          </InputAdornment>
        ),
      }}
    />
  );

  return tooltip ? (
    <Tooltip title={tooltip} enterTouchDelay={300}>
      {input}
    </Tooltip>
  ) : (
    input
  );
};

CommonFormTextField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.bool,
};

CommonFormTextField.defaultProps = {
  errors: {},
  register: () => {},
  icon: null,
  disabled: false,
  label: '',
  type: 'text',
  className: '',
  error: false,
};

export default CommonFormTextField;
