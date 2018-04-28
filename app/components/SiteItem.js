import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldEditor from './FieldEditor';
import HeaderItem from './HeaderItem';
import style from '../containers/App.css';
import classnames from 'classnames';

export default class SiteItem extends Component {

  static propTypes = {
    site: PropTypes.object.isRequired,
    headers: PropTypes.array.isRequired,
    rules: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleClick = () => {
    this.setState({ editing: true });
  };

  newHeader = () => {
    const { site, actions: { addHeader } } = this.props;
    addHeader(site.id, '');
  };

  handleSave = (pattern) => {
    const { site, actions: { editSite } } = this.props;
    if (pattern.length !== 0) {
      editSite(site.id, pattern);
    }
    this.setState({ editing: false });
  };

  handleDelete = () => {
    const { site, actions: { deleteSite } } = this.props;
    deleteSite(site.id);
  };

  render() {
    const { site, headers, rules, actions } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <FieldEditor
          text={site.pattern}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <input
          className={classnames(style.input, style['is-static'])}
          value={site.pattern}
          onClick={this.handleClick}
          readOnly />
      );
    }

    return (
      <li className={style.box}>
        <div className={classnames(style.field, style['is-grouped'])}>
          {element}
          <a className={classnames(style.button, style['is-light'])}
            onClick={this.newHeader}>
            New Header
          </a>
          <a className={style.delete}
             onClick={this.handleDelete}>
          </a>
        </div>
        <ul>
          {headers.map(header => (
            <HeaderItem key={header.id} header={header} actions={actions}
              rules={rules.filter(rule => rule.headerId === header.id)} />
          ))}
        </ul>
      </li>
    );
  }
}
