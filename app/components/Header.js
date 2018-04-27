import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../containers/App.css';
import classnames from 'classnames';
import FieldEditor from './FieldEditor';

export default class Header extends Component {

  static propTypes = {
    addSite: PropTypes.func.isRequired
  };

  handleSave = (site) => {
    if (site.length !== 0) {
      this.props.addSite(site);
    }
  };

  render() {
    return (
      <header className={style.section}>
        <h1 className={classnames(style.title, style['is-3'])}>
          Modify Headers
        </h1>
        <FieldEditor
          newItem
          onSave={this.handleSave}
          placeholder="google\.com"
        />
      </header>
    );
  }
}
