// Libraries
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { object } from 'yup'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import merge from 'lodash/merge'
import reduce from 'lodash/reduce'

// Material Components
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'

// Components
// Intl

// buildInput
import BuildInput from './buildInput'

const scrollToElement = (name) => {
  let offset = get(
    document.getElementsByName(name),
    '0.parentElement.offsetParent.offsetTop'
  )
  if (!offset) {
    offset = get(
      document.getElementsByName(name),
      '0.parentElement.offsetParent.offsetParent.offsetTop',
      0
    )
  }
  window.scrollTo(0, offset)
}

const handleSubmitErrors = (errors) =>
  reduce(
    errors,
    (prev, error, actualField) => ({
      ...prev,
      [actualField]: { message: onlyText(`SERVER.VALIDATION.ERROR.${error}`) }
    }),
    {}
  )

const BuildForm = ({
  buttonProps,
  backButtonProps,
  columns,
  config,
  loading,
  onSubmit,
  submitErrors,
}) => {
  const [validationSchema] = useState(() =>
    object().shape(
      reduce(
        config,
        (prev, { validation }, name) => ({
          ...prev,
          [name]: validation
        }),
        {}
      )
    )
  )

  const [formErrors, setFormErrors] = useState({})

  const { register, handleSubmit, setValue, errors, getValues } = useForm({
    validationSchema,
    submitFocusError: false
  })

  if (process.env.NODE_ENV === 'development' && !isEmpty(formErrors)) {
    console.log('formErrors', formErrors)
    console.log('getValues', getValues())
  }

  // useEffect(() => {
  //   if (isEmpty(formErrors) && (!isEmpty(submitErrors) || !isEmpty(errors))) {
  //     const newErrors = {
  //       ...handleSubmitErrors(submitErrors),
  //       ...errors
  //     }

  //     if (!isEmpty(newErrors)) {
  //       setFormErrors(newErrors)
  //     }
  //   }
  //   if (!isEmpty(formErrors) && isEmpty(submitErrors) && isEmpty(errors)) {
  //     setFormErrors({})
  //   }
  // }, [submitErrors, errors, formErrors])

  // useEffect(() => {
  //   // if there are errors, this will search the input position
  //   if (!isEmpty(formErrors)) {
  //     scrollToElement(Object.keys(formErrors)[0])
  //   }
  // }, [formErrors])

  const buttonData = useMemo(
    () => merge({ size: 'medium', label: '', position: 'flex-end' }, buttonProps),
    [buttonProps]
  )

  const buildForm = useMemo(() => {
    if (columns === 1) {
      return map(
        config,
        (
          { showInput = true, tooltip = null, parentBox = {}, ...input },
          key
        ) => {
          if (!showInput) {
            return null
          }

          if (tooltip) {
            return (
              <Box mt={1} key={key} {...parentBox}>
                <Tooltip title={tooltip}>
                  <span>
                    <BuildInput
                      {...input}
                      key={key}
                      name={key}
                      setValue={setValue}
                      register={register}
                      errors={formErrors}
                      getValues={getValues}
                    />
                  </span>
                </Tooltip>
              </Box>
            )
          }

          return (
            <Box mt={1} key={key} {...parentBox}>
              <BuildInput
                {...input}
                key={key}
                name={key}
                setValue={setValue}
                register={register}
                errors={formErrors}
                getValues={getValues}
              />
            </Box>
          )
        }
      )
    }

    const formColumns = reduce(
      config,
      (
        prev,
        { column, showInput = true, tooltip = null, parentBox = {}, ...input },
        key
      ) => {
        if (!column) {
          console.error('no column in ---', input, key)
          return { ...prev }
        }
        if (!showInput) {
          return null
        }

        if (tooltip) {
          return {
            ...prev,
            [column]: [
              ...prev[column],
              <Box mt={1} key={key} {...parentBox}>
                <Tooltip title={tooltip}>
                  <span>
                    <BuildInput
                      {...input}
                      key={key}
                      name={key}
                      setValue={setValue}
                      register={register}
                      errors={formErrors}
                      getValues={getValues}
                    />
                  </span>
                </Tooltip>
              </Box>
            ]
          }
        }

        return {
          ...prev,
          [column]: [
            ...prev[column],
            <Box mt={1} key={key}>
              <BuildInput
                {...input}
                key={key}
                name={key}
                setValue={setValue}
                register={register}
                errors={formErrors}
                getValues={getValues}
              />
            </Box>
          ]
        }
      },
      {}
    )

    return (
      <Box display='flex' p={2}>
        {map(formColumns, (column) => (
          <Box flex='1' style={{ maxWidth: columns === 2 ? '50%' : '33.3%' }}>
            {column}
          </Box>
        ))}
      </Box>
    )
  }, [columns, config, formErrors, getValues, register, setValue])

  const backButton = useMemo(
    () =>
      !backButtonProps.show ? (
        ''
      ) : (
        <Box mr={3}>
          <Button
            disabled={loading}
            variant='contained'
            color='secondary'
            size={buttonData.size}
            onClick={backButtonProps.action}
            disableElevation
          >
            {backButtonProps.label}
          </Button>
        </Box>
      ),
    [backButtonProps, buttonData.size, loading]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid='form'
      autoComplete='off'
    >
      <Box>{buildForm}</Box>
      <Box
        display='flex'
        justifyContent={backButtonProps.show ? 'space-between' : buttonData.position}
        pb={4}
        pt={6}
      >
        {backButton}
        <Button
          disabled={loading}
          variant='contained'
          color='primary'
          type='submit'
          size={buttonData.size}
          disableElevation
        >
          {loading && (
            <CircularProgress data-testid='circular-progress' size={20} />
          )}
          <Typography>{buttonData.label}</Typography>
        </Button>
      </Box>
    </form>
  )
}

BuildForm.propTypes = {
  config: PropTypes.shape(
    {}
    //   PropTypes.shape({
    // showInput: PropTypes.bool, --> default: true. Show/Not Show input

    // tooltip: PropTypes.string, --> String for tooltip
    // parentBox: PropTypes.shape  --> props for box parent
    // })
  ).isRequired,
  submitErrors: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  buttonProps: PropTypes.shape({
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    label: PropTypes.string,
    position: PropTypes.oneOf(['center', 'flex-end', 'flex-start'])
  }),
  backButtonProps: PropTypes.shape({
    show: PropTypes.bool,
    label: PropTypes.string,
    action: PropTypes.func
  }),
  columns: PropTypes.oneOf([1, 2, 3]),
  noBackButton: PropTypes.bool,
  backAction: PropTypes.func
}

BuildForm.defaultProps = {
  buttonProps: {},
  backButtonProps: {show: true, label: 'Back', action: () =>{}},
  columns: 1,
  
}

export default React.memo(BuildForm)

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
