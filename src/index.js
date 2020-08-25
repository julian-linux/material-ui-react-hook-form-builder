// Libraries
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { object } from 'yup';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import merge from 'lodash/merge';
import reduce from 'lodash/reduce';

// Material Components
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// Form Inputs
import Checkbox from './checkbox';
import Radio from './radio';
import Select from './select';
import TextField from './textField';
import NumberFormat from './numberFormat';

const buildInput = ({ component = null, ...props }) => {
  switch (props.type) {
    case 'divider':
      return <Box m={1}><Divider idx={props.key} /></Box>;
    case 'numberFormat':
      return <NumberFormat idx={props.key} {...props} />;
    case 'radio':
      return <Radio idx={props.key} {...props} />;
    case 'checkbox':
      return <Checkbox idx={props.key} {...props} />;
    case 'select':
      return <Select idx={props.key} {...props} />;
    case 'component':
      return component ? component(props) : '_____NO_COMPONENT______';
    default:
      return <TextField {...props} />;
  }
};

const scrollToElement = (name) => {
  let offset = get(document.getElementsByName(name), '0.parentElement.offsetParent.offsetTop');
  if (!offset) {
    offset = get(document.getElementsByName(name), '0.parentElement.offsetParent.offsetParent.offsetTop', 0);
  }
  window.scrollTo(0, offset);
};

const handleSubmitErrors = (errors) => reduce(errors, (prev, actual) => {
  if (!isEmpty(actual)) {
    const newErrors = reduce(actual.fields, (prevField, _value, actualField) => ({
      ...prevField,
      [actualField]: { message: actual.code },
    }), {});
    return ({
      ...prev,
      ...newErrors,
    });
  }
}, {});

const BuildForm = ({
  button,
  columns,
  config,
  loading,
  onSubmit,
  submitErrors,
  noBackButton,
  backAction,
  snackBarError,
}) => {
  const [validationSchema] = useState(() => object().shape(reduce(config, (prev, { name, validation }) => ({
    ...prev,
    [name]: validation,
  }), {})));

  const [formErrors, setFormErrors] = useState();

  const {
    register, handleSubmit, setValue, errors, getValues,
  } = useForm({ validationSchema, submitFocusError: false });

  if (process.env.NODE_ENV === 'development' && !isEmpty(formErrors)) {
    console.log('formErrors', formErrors);
    console.log('getValues', getValues());
  }

  const handleBackAction = () => {
    if (backAction) {
      backAction();
    }
  };

  useEffect(() => {
    if (!isEmpty(submitErrors) || !isEmpty(errors)) {
      setFormErrors({
        ...handleSubmitErrors(submitErrors),
        ...errors,
      });
    } else {
      setFormErrors({});
    }
  }, [submitErrors, errors]);

  useEffect(() => { // if there are errors, this will search the input position
    if (!isEmpty(formErrors)) {
      scrollToElement(Object.keys(formErrors)[0]);
    }
  }, [formErrors]);

  button = merge({ size: 'medium', label: 'action', backLabel: 'back', position: 'flex-end' }, button);

  const buildForm = () => {
    if (columns === 1) {
      return map(config, ({ showInput = true, ...input }, key) => (showInput ? (
        <Box mt={1} key={key}>
          {buildInput({
            ...input, key, setValue, register, errors: formErrors, getValues,
          })}
        </Box>
      ) : null));
    }

    const formColumns = reduce(config, (prev, { column, ...input }, key) => {
      if (!column) {
        console.error('no column in ---', input, key);
        return { ...prev };
      }
      return {
        ...prev,
        [column]: [
          ...prev[column],
          (
            <Box mt={1} key={key}>
              {buildInput({
                ...input, key, setValue, register, errors: formErrors,
              })}
            </Box>
          ),
        ],
      };
    }, {});

    return (
      <Box display="flex" p={2}>
        {map(formColumns, (column) => (
          <Box flex="1" style={{ maxWidth: columns === 2 ? '50%' : '33.3%' }}>
            {column}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="form" autoComplete="off">
      <Box>{buildForm()}</Box>
      <Box display="flex" justifyContent={noBackButton ? button.position : 'space-between'} pb={4} pt={6}>
        {noBackButton ? '' : (
          <Box mr={3}>
            <Button
              disabled={loading}
              variant="contained"
              color="secondary"
              size={button.size}
              onClick={handleBackAction}
              disableElevation
            >
              <Typography>
                {button.backLabel}
              </Typography>
            </Button>
          </Box>
        )}
        <Button disabled={loading} variant="contained" color="primary" type="submit" size={button.size} disableElevation>
          {loading && <CircularProgress data-testid="circular-progress" size={20} />}
          <Typography>{button.label}</Typography>
        </Button>
      </Box>
    </form>
  );
};

BuildForm.propTypes = {
  config: PropTypes.object.isRequired,
  submitErrors: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  button: PropTypes.shape({
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    backLabel: PropTypes.string,
    position: PropTypes.oneOf(['center', 'flex-end', 'flex-start']),
  }),
  columns: PropTypes.oneOf([1, 2, 3]),
  noBackButton: PropTypes.bool,
  backAction: PropTypes.func,
  snackBarError: PropTypes.string,
};

BuildForm.defaultProps = {
  button: {},
  columns: 1,
  noBackButton: false,
  snackBarError: '',
};

export default BuildForm;

/**
 *
 * date-fns and datepicker will be removed intead of masked input... too big in sie an performance
 */

/**
  * FORM BUILDER
  * component for easy build forms
  *
  * Is configured in *config* object
  *
  *
  */
