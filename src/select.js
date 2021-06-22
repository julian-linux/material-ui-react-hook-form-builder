// Libraries
import React, {
  useState, useEffect, useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';

// Material Components
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

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
  helpText,
  getValues,
  disabled,
  multiple,
  defaultSelect
}) => {
  const [inputValue, setInputValue] = useState(multiple ? [] : '');

  const classes = useSelectStyles();
  const id = `select-${idx}-${label || name}`;

  const handleChange = useCallback((evt) => {
    setInputValue(evt.target.value);
    setValue(name, evt.target.value);
    if (onChange) {
      onChange(evt.target.value, getValues);
    }
  }, [onChange, getValues, name, setValue]);

  useEffect(() => {
    register({ name, required });
  }, [name, register, required]);

  useEffect(() => {
    let nextValue = value;
    if (multiple && isEmpty(value)) {
      nextValue = [];
    } else if (isEmpty(value)) {
      nextValue = '';
    }
    setInputValue(nextValue);
    setValue(name, nextValue);
  }, [name, setValue, value, multiple]); // If an re-render has a new value

  const renderValue = useCallback((selected) => {
    let selectedItem;
    if (multiple) {
      selectedItem = selected.map((itemSelected) => {
        const item = items.find(({ id }) => id === itemSelected);
        return item.name || null;
      });

      if (!isEmpty(selectedItem)) {
        return selectedItem.join(', ');
      }
      return '';
    }

    selectedItem = items.find(({ id }) => id === selected);

    if (!isEmpty(selectedItem)) {
      return selectedItem.name;
    }

    return '';
  }, [multiple, items]);

  const renderDefaultValue = useMemo(() => !inputValue && (
    <MenuItem value={inputValue}>
      <em>{defaultSelect}</em>
    </MenuItem>
  ), [inputValue]);

  const renderItems = useMemo(() => {
    if (multiple) {
      return items.map((item) => (
        <MenuItem key={`select-item-${idx}-${item.id}`} value={item.id} disabled={item.disabled}>
          <Checkbox checked={inputValue && inputValue.includes(item.id)} />
          <ListItemText primary={item.name} />
        </MenuItem>
      ));
    }

    return items.map((item) => (
      <MenuItem key={`select-item-${idx}-${item.id}`} value={item.id} selected={item.id === value} disabled={item.disabled}>
        {item.name}
      </MenuItem>
    ));
  }, [idx, items, value, inputValue, multiple]);

  return (
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
        input={<Input />}
        size="small"
        multiple={multiple}
        value={inputValue}
        onChange={handleChange}
        renderValue={renderValue}
      >
        {renderDefaultValue}
        {renderItems}
      </Select>
      {errors[name] && <FormHelperText>{errors[name].message}</FormHelperText>}
      {helpText && !errors[name] && <FormHelperText>{helpText}</FormHelperText>}
    </FormControl>
  );
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  helpText: PropTypes.string,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  getValues: PropTypes.func.isRequired,
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
  multiple: false,
  defaultSelect: 'Select an Option'
};

export default React.memo(CommonFormSelect);
