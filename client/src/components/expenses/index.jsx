import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import { ProgressBar } from 'react-bootstrap';
import ItemPopup from '../itemPopup';
import { getExpenses } from '../../actions';

const Expenses = ({ classes, getExpenses, expenses, setTotal, startDate, endDate }) => {
  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    getExpenses(startDate, endDate);
  }, [getExpenses, startDate, endDate]);

  const expensesTotalData = useMemo(() => {
    const items = { total: 0 };

    expenses.forEach((item) => {
      if (items[item.name]) {
        items[item.name].price += item.price;
      } else {
        items[item.name] = {
          price: item.price,
        };
      }
      items.total += item.price;
    });

    setTotal(items.total);
    return items;
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
          {Object.keys(expensesTotalData)
            ?.filter((item) => item !== 'total')
            .map((key) => {
              const itemPercentage = Math.round(
                (expensesTotalData[key].price * 100) / expensesTotalData.total,
                0,
              );

              return (
                <Grid
                  item
                  xs={2}
                  className={classes.itemBlock}
                  onClick={() => handleSetActiveItem(key)}
                >
                  <p className={classes.itemName}>{key}</p>
                  <ProgressBar now={itemPercentage} label={`${itemPercentage}%`} />
                  <p className={classes.itemValue}>{expensesTotalData[key].price} грн</p>
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
};

const mapStateToProps = (state) => ({
  expenses: state.settings.expenses,
});

export default connect(mapStateToProps, { getExpenses })(Expenses);
