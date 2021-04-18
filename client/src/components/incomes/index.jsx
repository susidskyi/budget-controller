import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { ProgressBar } from 'react-bootstrap';
import { connect } from 'react-redux';
import ItemPopup from '../itemPopup';
import { getIncomes } from '../../actions/index';

const Incomes = ({ classes, incomes, getIncomes, setTotal, startDate, endDate }) => {
  const [activeItem, setActiveItem] = useState([]);

  useEffect(() => {
    getIncomes(startDate, endDate);
  }, [getIncomes, startDate, endDate]);

  const incomesTotalData = useMemo(() => {
    const users = { total: 0 };

    incomes.forEach((item) => {
      if (users[item.user.telegram_id]) {
        users[item.user.telegram_id].value += item.value;
      } else {
        users[item.user.telegram_id] = {
          first_name: item.user.first_name,
          value: item.value,
        };
      }
      users.total += item.value;
    });

    setTotal(users.total);

    return users;
  }, [incomes, setTotal]);

  const handleSetActiveItem = (id) => {
    const formatedData = incomes
      .filter((item) => `${item.user.telegram_id}` === id)
      .map((item) => ({
        date: moment(item.created_at).format('DD-MM-YYYY'),
        value: item.value,
      }));

    setActiveItem(formatedData);
  };

  return (
    <>
      <Grid>
        <p className={classes.itemsListHeaderText}>Список доходов</p>
        <Grid container justify="center">
          {Object.keys(incomesTotalData)
            ?.filter((item) => item !== 'total')
            .map((key) => {
              const itemPercentage = Math.round(
                (incomesTotalData[key].value * 100) / incomesTotalData.total,
                0,
              );
              return (
                <Grid
                  item
                  xs={2}
                  className={classes.itemBlock}
                  onClick={() => {
                    handleSetActiveItem(key);
                  }}
                >
                  <p className={classes.itemName}>{incomesTotalData[key].first_name}</p>
                  <ProgressBar
                    now={itemPercentage}
                    variant="success"
                    label={`${itemPercentage}%`}
                  />
                  <p className={classes.itemValue}>{incomesTotalData[key].value} грн</p>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <ItemPopup setActiveItem={setActiveItem} activeItem={activeItem} classes={classes} />
    </>
  );
};

Incomes.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  getIncomes: PropTypes.func.isRequired,
  incomes: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        first_name: PropTypes.string,
        telegram_id: PropTypes.number,
        username: PropTypes.string,
      }),
      value: PropTypes.number,
    }),
  ).isRequired,
  setTotal: PropTypes.func.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  incomes: state.settings.incomes,
});

export default connect(mapStateToProps, { getIncomes })(Incomes);
