import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
    '& label': {
      // marginLeft: theme.spacing(3),
      textTransform: 'capitalize',
    },
  },
}));

export const useSelectStyles = makeStyles((theme) => ({
  select: {
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing(2),
    '& .MuiInputLabel-filled': {
      marginLeft: theme.spacing(3),
    },
    '& .MuiSelect-root.MuiSelect-select': {
      marginLeft: theme.spacing(4),
    },
    '& .MuiSelect-select em': {
      fontSize: '14px',
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      marginLeft: theme.spacing(3),
    },
    '& .MuiFilledInput-input': {
      fontSize: '14px',
      marginLeft: theme.spacing(4),
      padding: '20px 12px 10px',
    },
  },
  icon: {
    position: 'absolute',
    zIndex: 3,
    top: '20px',
  },
}));

export const useDatePickerStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '& .MuiInputLabel-root': {
      marginLeft: theme.spacing(3),
      position: 'absolute',
    },
  },
  icon: {
    position: 'absolute',
    zIndex: 3,
    top: '19px',
    '&:before': {
      left: 0,
      right: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: 'absolute',
      transition: ' border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      pointerEvents: 'none',
    },
  },
  dateInputs: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    display: 'flex',
    '& .MuiInput-root': {
      marginRight: theme.spacing(2),
    },
  },
  dateYear: {
    '& input': {
      paddingLeft: '4px',
    },
  },
}));
