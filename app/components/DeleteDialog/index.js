import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  withStyles,
} from '@material-ui/core';

const style = theme => ({
  dialog: {
    maxWidth: 500,
    margin: '0 auto',
  },
  header: {
    backgroundColor: theme.palette.primary.light,
  },
  content: {
    padding: 50,
  },
});

const DeleteDialog = ({ onCancel, onOk, title, children, classes }) => (
  <Dialog open keepMounted className={classes.dialog} onClose={onCancel}>
    <DialogTitle className={classes.header}>
      <Typography>{title} </Typography>
    </DialogTitle>
    <DialogContent className={classes.content}>{children}</DialogContent>
    <DialogActions>
      <Button variant="contained" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" onClick={onOk} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteDialog.propTypes = {
  children: PropTypes.node.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(DeleteDialog);
