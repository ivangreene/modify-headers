import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainSection from '../components/MainSection';
import RuleActions from '../actions/rules';
import './App.css';

@connect(
  state => ({
    sites: state.sites
  }),
  dispatch => ({
    actions: bindActionCreators(RuleActions, dispatch)
  })
)

export default class App extends Component {
  static propTypes = {
    sites: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { sites, actions } = this.props;

    return (
      <div>
        <MainSection sites={sites} actions={actions} />
      </div>
    );
  }
}
