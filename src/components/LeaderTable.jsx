import React from 'react';
import classNames from 'classnames';

import LeaderTableRow from './LeaderTableRow';

const WINDOW_SIZE = 10;

export default class LeaderTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };

    this.rowCount = null;

    // Bind this for callbacks
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  getRows() {
    let rows = [];

    // Inspired by
    // http://stackoverflow.com/a/25435422
  	rows = this.props.users.filter(function(user, idx) {
  		if(( idx >= (this.state.page - 1) * WINDOW_SIZE)
        && ( idx < this.state.page * WINDOW_SIZE)) {
  			return true;
  		}
  	}, this);

    this.rowCount = rows.length;

    return rows.map(
      user => {
        let { index, username, img, alltime, recent } = user;
        let props = { index, username, img, alltime, recent, key:username };

        return(<LeaderTableRow { ...props } />);
      }
    );
  }

  // The component has already rendered by the time props.users is populated.
  componentWillReceiveProps(nextProps) {
    this.maxPages = Math.ceil(nextProps.users.length / WINDOW_SIZE);

    // The most expedient way is to simply reset our window on new users
    this.setState({ page: 1 });
  }

  isNextPageAllowed() {
    return ((this.state.page + 1) <= this.maxPages) ? true: false;
  }

  nextPage() {
    if(this.isNextPageAllowed())
      this.setState({ page: this.state.page + 1 });
  }

  isPreviousPageAllowed() {
    return ((this.state.page - 1) >= 1) ? true : false;
  }

  previousPage() {
    if(this.isPreviousPageAllowed())
      this.setState({ page: this.state.page - 1 });
  }

  render() {
    const btnClasses = 'ui element button';
    const classesNextBtn = classNames(btnClasses, {disabled: !this.isNextPageAllowed()});
    const classesPreviousBtn = classNames(btnClasses, {disabled: !this.isPreviousPageAllowed()});

    return (
      <table id="data" className="ui very basic striped single line fixed table">

        <thead>
          <tr>
            <th>#</th>
            <th>Camper</th>
            <th>Recent</th>
            <th>All time</th>
          </tr>
        </thead>

        <tbody>
          {this.getRows()}
        </tbody>

      <tfoot>
          <tr>
            <th colSpan="4">
              <div className="ui center aligned container">
                <div className="ui pagination menu">
                  <div className="icon item">
                    <button className={classesPreviousBtn} onClick={this.previousPage}>
                      <i className="left chevron icon"></i>
                    </button>
                  </div>
                  <div className="item">{this.rowCount * this.state.page} of {this.props.users.length}</div>
                  <div className="icon item">
                    <button className={classesNextBtn} onClick={this.nextPage}>
                      <i className="right chevron icon"></i>
                    </button>
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}
