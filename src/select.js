// Libraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import map from 'lodash/map';

// Material Components
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

// Styles
import { useSelectStyles } from './styles';

const CommonFormSelect = ({
  idx,
  name,
  label,
  setValue,
  register,
  errors,
  className,
  value,
  onChange,
  required,
  loading,
  items,
  icon: Icon,
  tooltip,
  helpText,
  getValues,
  disabled,
  defaultSelect
}) => {
  const [inputValue, setInputValue] = useState('');

  const classes = useSelectStyles();
  const id = `select-${idx}-${label || name}`;

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
    setValue(name, evt.target.value);
    if (onChange) {
      onChange(evt.target.value, getValues);
    }
  };

  useEffect(() => {
    register({ name, required });
  }, [name, register, required]);

  useEffect(() => {
    setInputValue(value);
    setValue(name, value);
  }, [name, setValue, value]); // If an re-render has a new value

  const setItems = () => map(items, (item, itemIdx) => {
    const selected = item.id === value;
    return (
      <MenuItem key={`select-item-${idx}-${itemIdx}`} value={item.id} selected={selected} disabled={item.disabled}>
        {item.name}
      </MenuItem>
    );
  });

  const formControl = (
    <FormControl
      className={clsx(classes.select, className)}
      error={!!errors[name]}
      id={`form-control-${id}`}
    >
      {Icon && <Icon className={classes.icon} />}
      <InputLabel shrink id={`label-${id}`}>
        {label || name}
      </InputLabel>
      <Select
        displayEmpty
        inputRef={register}
        labelId={`label-${id}`}
        disabled={loading || disabled}
        inputProps={{
          name,
          id: `select-${name}-${idx}`,
        }}
        size="small"
        value={inputValue}
        onChange={handleChange}
      >
        {!inputValue && (
          <MenuItem value={inputValue}>
            <em>{defaultSelect}</em>
          </MenuItem>
        )}
        {setItems()}
      </Select>
      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
      {helpText && !errors[name] && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );

  const render = tooltip ? (
    <Tooltip title={tooltip} placement="top">
      {formControl}
    </Tooltip>
  ) : (
    formControl
  );

  return render;
};

CommonFormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  idx: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // must be an array of objects of type [{id: string, name: string}]
  label: PropTypes.string,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  register: PropTypes.func,
  required: PropTypes.bool,
  setValue: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltip: PropTypes.string,
  helpText: PropTypes.string,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  defaultSelect: PropTypes.string
};

CommonFormSelect.defaultProps = {
  idx: 0,
  errors: {},
  className: '',
  items: [],
  label: '',
  loading: false,
  onChange: null,
  register: () => {},
  required: true,
  setValue: () => {},
  value: '',
  tooltip: null,
  helpText: null,
  icon: null,
  disabled: false,
  defaultSelect: '',
};

export default CommonFormSelect;
