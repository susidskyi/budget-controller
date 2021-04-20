import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#333',
  },
  headerText: {
    color: '#fafafa',
    margin: '10px 0',
  },
  centeredBlock: {
    textAlign: 'center',
  },
  calendar: {
    margin: '20px 50px',
    '& .DateRangePicker_picker': {
      position: 'static ',
    },
    '& .DateRangePickerInput_calendarIcon': {
      display: 'none',
    },
    '& .DateInput': {
      display: 'none',
    },
    '& .DateRangePickerInput_arrow_svg': {
      display: 'none',
    },
    '& .DayPicker__withBorder': {
      boxShadow: 'none',
    },
    '& .SingleDatePickerInput__withBorder': {
      border: 'none',
    },
    '& .DateRangePickerInput__withBorder': {
      border: 'none',
    },
  },
  halfCircleBlock: {
    margin: '50px auto',
    width: '350px',
    height: '170px',
    borderTopLeftRadius: '220px',
    borderTopRightRadius: '220px',
    border: '10px solid #73a9ff',
    borderBottom: 0,
    position: 'relative',
  },
  halfCircleText: {
    position: 'absolute',
    bottom: '30%',
    right: '50%',
    transform: 'translate(50%, 30%)',
    color: '#333',
    fontSize: '25px',
    fontWeight: 'bold',
  },
  itemsListHeaderText: {
    fontSize: '20px',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemBlock: {
    backgroundColor: '#fafafa',
    padding: '20px',
    borderRadius: '10px',
    margin: '10px',
    cursor: 'pointer',
  },
  itemName: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '5px',
  },
  itemValue: {
    textAlign: 'center',
    marginTop: '5px',
    marginBottom: '0px',
  },
  listItem: {
    margin: 0,
  },
});

export default useStyles;
