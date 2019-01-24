/**
 *
 * AllNgos
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NgoList from './NgoList';
import { fetchNgos, createNgo, deleteNgo } from './actions';
import { makeSelectApprovedNgos } from './selectors';
import { makeSelectStates } from '../../store/constants/selectors';
import DeleteDialog from '../../components/DeleteDialog';

/* eslint-disable*/

const styles = theme => ({
  createNgoBtn: {
    float: 'right',
  },
});

class AllNgos extends React.Component {
  state = {
    selectedState: 'All',
    deleteID: null
  };

  onStateChanged(state) {
    this.setState({ selectedState: state });
    this.props.fetchNgos(state);
  }

  componentDidMount() {
    this.props.fetchNgos();
  }

  createNewNgo() {
    this.props.createNgo();
  }

  render() {
    const { classes, fetchedNgos, states, deleteNgo } = this.props;
    const { selectedState, deleteID } = this.state;

    return (
      <Fragment>
        <Button
          variant="contained"
          className={classes.createNgoBtn}
          color="secondary"
          onClick={() => this.createNewNgo()}
        >
          {' '}
          Create NGO{' '}
        </Button>
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="state">State</InputLabel>
          <Select
            value={selectedState}
            onChange={e => this.onStateChanged(e.target.value)}
            input={<Input id="state" name="state" />}
          >
            {states.concat(['All']).map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <NgoList 
          ngos={fetchedNgos} 
          onNgoClick={() => {
            console.log('On Click Ngo');
          }}
          onDelete={id => {
            this.setState({deleteID: id});
          }} 
        />
        {
          deleteID && (
            <DeleteDialog 
              onCancel={e => {this.setState({deleteID: null})}} 
              onOk={e => {deleteNgo(deleteID); this.setState({deleteID: null})}} 
              title="Delete NGO"
            >
              Are you sure to detete this NGO?
            </DeleteDialog>
          )
        }
      </Fragment>
    );
  }
}

AllNgos.propTypes = {
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  fetchedNgos: makeSelectApprovedNgos(),
  states: makeSelectStates(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchNgos: state => dispatch(fetchNgos(state)),
    createNgo: () => dispatch(createNgo()),
    deleteNgo: ngoId => dispatch(deleteNgo(ngoId))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withStyles(styles),
  withConnect,
)(AllNgos);
