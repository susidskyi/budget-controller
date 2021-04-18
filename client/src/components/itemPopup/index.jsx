import React from 'react';
import { Dialog, DialogTitle, List, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';

const ItemPopup = ({ activeItem, setActiveItem, classes }) => {
  return (
    <Dialog onClose={() => setActiveItem([])} open={activeItem.length}>
      <DialogTitle id="item title">Подробные транзакции</DialogTitle>
      <List>
        {activeItem.map((item) => (
          <ListItem>
            <p className={classes.listItem}>
              {item.date} - <strong>{item.value} грн</strong>
            </p>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

ItemPopup.propTypes = {
  activeItem: PropTypes.bool.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
};

export default ItemPopup;
