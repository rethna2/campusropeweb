import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Input from '@material-ui/core/Input';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStructuredSelector } from 'reselect';
import ProfileTabType from './ProfileTabTypeModel';
import { makeSelectLoggedUser } from '../../../store/loggeduser/selectors';

import EditDialog from './EditDialog';

const styles = theme => ({
  aboutPaper: {
    padding: '10px 15px',
  },
  error: {
    color: 'red',
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {},
  cancel: {
    background: '#ffc400',
    marginLeft: '10px',
    color: 'white',

    '&:hover': {
      background: '#ecb809',
    },
  },
  button: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    color: '#1976d2',
    float: 'right',
    fontSize: 12,
  },
  panelDetails: {
    flexDirection: 'column',
  },
  aboutUserBtnWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  multiInputBtn: {
    padding: '5px',
    minWidth: '30px',
    height: '40px',
    width: '40px',
    marginLeft: 10,
  },
  multiInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  editBtn: {
    position: 'absolute',
    top: 15,
    right: 50,
    fontSize: 20,
    cursor:'pointer'
  },
  multiInput: {
    flex: 1,
  },
  deleteBtn: {
    background: '#e63d3d',
    color: 'white',

    '&:hover': {
      background: '#d43a3a',
    },
  },
});

/* eslint react/prop-types: 0 */
class AboutUserComponent extends React.Component {
  state = {
    expanded: null,
    editDialogExpand: null,
  };

  handlePanelChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  handleEditDialogPanel = () => {
    this.setState({
      editDialogExpand : true
    })
  }

  handleClose = () => {
    this.setState({
      editDialogExpand : false
    })
  }

  render() {
    const { classes, values, handleChange,expanded ,handlePanelChange} = this.props;
    const TAB_TYPE_MAP = ProfileTabType.typeTypeMap;
    const {editDialogExpand } = this.state;
    return (
      <ExpansionPanel
      expanded={expanded}
      onChange={handlePanelChange}
      >
      {
        expanded &&    <div className={classes.editBtn}>
        <EditIcon onClick={this.handleEditDialogPanel}/>
        </div>
      }

      <EditDialog
      editDialogExpand = {editDialogExpand}
      handleClose = {this.handleClose}
      />
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body1" className={classes.heading}>
            Stereotypes
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className={classes.panelDetails}>
          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Political View</InputLabel>
            <Input
              id="politicalView"
              name="politicalView"
              value={values.politicalView}
              onChange={handleChange}
              autoFocus="autoFocus"
              multiline="multiline"
            />
          </FormControl>

          <FormControl
            margin="normal"
            required="required"
            fullWidth="fullWidth"
          >
            <InputLabel htmlFor="name">Religious View</InputLabel>
            <Input
              id="religiousView"
              name="religiousView"
              value={values.religiousView}
              onChange={handleChange}
              autoFocus="autoFocus"
              multiline="multiline"
            />
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

AboutUserComponent.propTypes = {
  classes: PropTypes.object,
  isOwner: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const mapStateToProps = createStructuredSelector({
  loggedUserInfo: makeSelectLoggedUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const componentWithStyles = withStyles(styles)(AboutUserComponent);

export default compose(withConnect)(componentWithStyles);
