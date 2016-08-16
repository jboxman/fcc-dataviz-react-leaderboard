import React, {PropTypes} from 'react';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
import axios from 'axios';
import classNames from 'classnames';

import Button from '../components/Button';
import LeaderTable from '../components/LeaderTable';

/*

  Project cloned from
  - https://github.com/coryhouse/react-slingshot

  References
  - https://facebook.github.io/react/docs/getting-started.html
  - http://stackoverflow.com/questions/35224113/react-change-class-name-on-state-change

*/

const BUTTON_RECENT = 0;
const BUTTON_ALL_TIME = 1;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: true,
      activeButtonIndex: BUTTON_RECENT
    };

    this.setUsers = this.setUsers.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.getLeaderData = this.getLeaderData.bind(this);

    // Should this happen here or after the component is mounted?
    this.getLeaderData(this.state.activeButtonIndex);
  }

  setUsers(responseData) {

    function addIndexToUsers(user, index) {
      return Object.assign({}, user, { index: index+1 });
    }

    this.setState({
      users: responseData.data.map(addIndexToUsers),
      loading: false
    });
  }

  getLeaderData(buttonIndex) {
    let ApiUrl = null;

    if(buttonIndex == BUTTON_RECENT) {
      ApiUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    }
    else if(buttonIndex == BUTTON_ALL_TIME) {
      ApiUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
    }

    axios.get(ApiUrl).then(this.setUsers);
    //.catch((error) => this.setState({users: []}));
  }

  clickHandler(index) {
    this.setState({
      activeButtonIndex: index,
      loading: true
    });
    this.getLeaderData(index);
  }

  render() {
    const { activeButtonIndex } = this.state;

    const buttonProps = {
      clickHandler: this.clickHandler,
      activeButtonIndex
    };

    const loadingClass = classNames('ui inverted dimmer', {
      active: this.state.loading
    });

    return (
      <div className="ui one column centered grid">
        <div id="main" className="ui compact segment">
          <h1 className="header">
            Leaderboard
          </h1>
          <Button { ...buttonProps } index={0} text="Recent" />
          <Button { ...buttonProps } index={1} text="All time" />
          <div className="dimmable">
            <div className={ loadingClass }>
              <div className="ui loader"></div>
            </div>
            <LeaderTable users={ this.state.users } />
          </div>
        </div>
        <footer className="text-center">
          Crafted by Jason Boxman. Inspired by <a href="https://codepen.io/FreeCodeCamp/full/eZGMjp/">
            FreeCodeCamp : Build a Camper Leaderboard</a>. Styled with <a href="http://semantic-ui.com">Semantic UI</a>.
        </footer>
      </div>
    );
  }
}

// TODO
// Refactor to use Redux instead

/*
export default connect((state, ownProps) => {
  return {
    test: true,
    users: state.users
  }
},
(dispatch, ownProps) => {
  return {
    onClick: function(v) {
      console.log(v);
    }
  }
})(App);
*/

//export default App;
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
