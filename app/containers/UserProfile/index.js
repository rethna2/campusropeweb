/**
 *
 * UserProfile
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUserProfileInfo, makeSelectSelectedTab } from './selectors';
import {
  makeSelectLoggedUser,
  makeSelectIsLoggedUser,
} from '../../store/loggeduser/selectors';
import reducer from './reducer';
import saga from './saga';
import UserProfileBrowserView from './BrowserView'

import { tabSelectAction, fetchUserProfile, saveUserProfile } from './actions';

const styles = () => ({
  grid2Container: {
    height: '220px',
  },
  topSectionGrid: {
    minHeight: '185px',
  },
  followsCount: {
    paddingRight: '10px',
    color: '#3f56b5',
  },
  followsLabel: {
    color: '#888484',
  },
  profileTabGrid: {
    paddingBottom: '25px',
  },
  profilePaper: {
    padding: '0 20px 10px',
    width: '100%',
  },
  postWrapper: {
    padding: '20px 0',
  },
  followsTypo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

/* eslint react/prop-types: 0 */
/* eslint prettier/prettier: 0 */
/* eslint-disable react/prefer-stateless-function */
export class UserProfile extends React.Component {
  handleProfileTabChange = selectedTab => {
    this.props.onSelectProfileTab(selectedTab);
  };

  handleProfileSave = (values, actions) => {
    const { userId } = this.props.match.params;
    this.props.saveUserProfile({ ...values, userId }, actions);
  };

  componentDidMount() {
    const { userId } = this.props.match.params;
    this.props.fetchUserProfile(userId);
  }

  isOwner() {
    const { userId } = this.props.match.params;
    const user =
      (this.props.loggedUserInfo && this.props.loggedUserInfo.user) || {};
    return user.id === userId;
  }

  render() {
    const { userprofileInfo} = this.props;


    return (
      <div className="root">
        <Helmet>
          <title>UserProfile</title>

          <meta name="description" content="Description of UserProfile" />
        </Helmet>
       <UserProfileBrowserView userinfo={userprofileInfo}/>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  selectedTab: makeSelectSelectedTab(),
  userprofileInfo: makeSelectUserProfileInfo(),
  loggedUserInfo: makeSelectLoggedUser(),
  isLoggedUser: makeSelectIsLoggedUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchUserProfile: userId => dispatch(fetchUserProfile({ userId })),
    saveUserProfile: (payload, actions) =>
      dispatch(saveUserProfile(payload, actions)),
    onSelectProfileTab: selectedTab => dispatch(tabSelectAction(selectedTab)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'userProfile', reducer });
const withSaga = injectSaga({ key: 'userProfile', saga });
const componentWithStyles = withStyles(styles)(UserProfile);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(componentWithStyles);
