// Libraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Material Components
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Icons
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

// Styles
import useStyles from './styles';

const CommonFormCheckbox = ({
  name, register, setValue, errors, label, value, text, onChange, required,
}) => {
  const classes = useStyles();
  const [checkboxChecked, setCheckboxChecked] = useState(!!value);

  useEffect(() => {
    register({ name, required });
  }, [name, register, required]);

  useEffect(() => {
    setCheckboxChecked(value);
    setValue(name, value);
  }, [name, setValue, value]); // If an re-render has a new value

  const handleChecked = (evt) => {
    const checkedValue = evt.target.checked;
    setCheckboxChecked(checkedValue);
    setValue(name, checkedValue);
    onChange(checkedValue);
  };

  return (
    <Box flexDirection="row" display="flex" className={classes.root}>
      <FormControlLabel
        labelPlacement="end"
        control={(
          <Checkbox
            name={name}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={checkboxChecked}
            onChange={handleChecked}
          />
          )}
        label={label}
      />
      {text && (<Typography variant="caption" style={{ marginLeft: '8px' }}>{text}</Typography>)}
      {errors && errors[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}

    </Box>
  );
};

CommonFormCheckbox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errors: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  register: PropTypes.func,
  setValue: PropTypes.func,
  value: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

CommonFormCheckbox.defaultProps = {
  errors: {},
  register: () => {},
  setValue: () => {},
  label: '',
  value: false,
  text: '',
  onChange: () => {},
  required: false,
};

export default CommonFormCheckbox;
