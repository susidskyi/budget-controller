import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';
import ItemPopup from '../itemPopup';
import { getExpenses } from '../../actions';

const Expenses = ({ classes, getExpenses, expenses, setTotal, total, startDate, endDate }) => {
  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    getExpenses(startDate, endDate);
  }, [getExpenses, startDate, endDate]);

  const expensesTotalData = useMemo(() => {
    const items = [];
    var total = 0;

    expenses.forEach((item) => {
      const obj = items.find((i) => i.name === item.name);
      if (obj) {
        obj.price += item.price;
      } else {
        items.push({ name: item.name, price: item.price });
      }
      total += item.price;
    });

    const sortedItems = items.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });

    setTotal(Math.round(total));
    return sortedItems;
  }, [expenses, setTotal]);

  const handleSetActiveItem = (name) => {
    const formatedData = expenses
      .filter((item) => `${item.name}` === name)
      .map((item) => ({
        date: moment(item.created_at).format('DD-MM-YYYY'),
        value: item.price,
      }));

    setActiveItem(formatedData);
  };
  return (
    <>
      <Grid>
        <p className={classes.itemsListHeaderText}>Список товаров</p>
        <Grid container justify="center">
          {expensesTotalData.map((item) => {
            const itemPercentage = Math.round((item.price * 100) / total, 0);

            return (
              <Grid
                item
                xs={2}
                className={classes.itemBlock}
                onClick={() => handleSetActiveItem(item.name)}
              >
                <p className={classes.itemName}>{item.name}</p>
                <ProgressBar now={itemPercentage} label={`${itemPercentage}%`} />
                <p className={classes.itemValue}>{item.price} грн</p>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <ItemPopup setActiveItem={setActiveItem} activeItem={activeItem} classes={classes} />
    </>
  );
};

Expenses.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  expenses: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    created_at: PropTypes.string,
  }).isRequired,
  getExpenses: PropTypes.func.isRequired,
  setTotal: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.settings.expenses,
});

export default connect(mapStateToProps, { getExpenses })(Expenses);
