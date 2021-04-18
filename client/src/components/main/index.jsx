import React, { useState } from 'react';
import { Grid, Tabs, Tab, Button } from '@material-ui/core';
import moment from 'moment';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';
import useStyles from './styles';
import Expenses from '../expenses';
import Incomes from '../incomes';

const Main = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState('expenses');
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [startDateValue, setStartDateValue] = useState(moment().subtract(1, 'month'));
  const [endDateValue, setEndDateValue] = useState(moment());
  const [startDateToCalculate, setStartDateToCalculate] = useState(startDateValue);
  const [endDateToCalculate, setEndDateToCalculate] = useState(endDateValue);
  const [total, setTotal] = useState(0);

  const handleCalculate = () => {
    setStartDateToCalculate(startDateValue);
    setEndDateToCalculate(endDateValue);
  };

  return (
    <>
      <Grid container className={classes.header} justify="center">
        <Grid item>
          <p className={classes.headerText}>Учёт семейного бюджета</p>
        </Grid>
      </Grid>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Расходы" value="expenses" />
        <Tab label="Доходы" value="incomes" />
      </Tabs>
      <Grid container>
        <Grid item xs={6} className={classes.centeredBlock}>
          <Grid className={classes.calendar}>
            <DateRangePicker
              startDateId="selected_first_start_date"
              onDatesChange={({ startDate, endDate }) => {
                setStartDateValue(startDate);
                setEndDateValue(endDate);
              }}
              endDateId="selected_first_end_date"
              startDate={startDateValue}
              endDate={endDateValue}
              isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
              showDefaultInputIcon
              hideKeyboardShortcutsPanel
              verticalSpacing={0}
              displayFormat="DD MMM YYYY"
              focusedInput={focusedInput}
              onFocusChange={(value) => {
                if (value) {
                  setFocusedInput(value);
                }
              }}
              noBorder
              keepOpenOnDateSelect
            />
          </Grid>
          <Button
            className={classes.calculateButton}
            color="primary"
            variant="outlined"
            onClick={handleCalculate}
          >
            Расчитать
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.centeredBlock}>
          <div className={classes.halfCircleBlock}>
            <span className={classes.halfCircleText}>{total} грн</span>
          </div>
        </Grid>
      </Grid>
      {tabValue === 'expenses' ? (
        <Expenses
          classes={classes}
          setTotal={setTotal}
          startDate={startDateToCalculate.format('YYYY-MM-DD')}
          endDate={endDateToCalculate.format('YYYY-MM-DD')}
        />
      ) : (
        <Incomes
          classes={classes}
          setTotal={setTotal}
          startDate={startDateToCalculate.format('YYYY-MM-DD')}
          endDate={endDateToCalculate.format('YYYY-MM-DD')}
        />
      )}
    </>
  );
};

export default Main;
