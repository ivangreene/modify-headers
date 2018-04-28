import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import RuleActions from '../actions/rules';
import './App.css';

@connect(
  state => ({
    sites: state.sites,
    headers: state.headers,
    rules: state.rules,
  }),
  dispatch => ({
    actions: bindActionCreators(RuleActions, dispatch)
  })
)

export default class App extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired,
    rules: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { sites, headers, rules, actions } = this.props;

    return (
      <div>
        <MainSection rules={rules} headers={headers} sites={sites}
          actions={actions} />
      </div>
    );
  }
}
