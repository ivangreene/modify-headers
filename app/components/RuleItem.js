import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldEditor from './FieldEditor';
import style from '../containers/App.css';
import classnames from 'classnames';

export default class SiteItem extends Component {

  static propTypes = {
    header: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
    rule: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (field) => {
    console.log('out');
    return (text) => {
      console.log('in');
      const { rule, header, site, actions: { editRule } } = this.props;
      const newRule = {
        [field]: text,
      };
      if (text.length !== 0) {
        editRule(site.id, header.id, rule.id, newRule);
      }
      this.setState({ editing: false });
    };

    handleDelete = () => {
      const { rule, site, header, actions: { deleteRule } } = this.props;
      deleteRule(site.id, header.id, rule.id);
    };
  };

  render() {
    const { rule } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <div>
          <FieldEditor
            text={rule.match}
            onSave={this.handleSave('match')}
          />
          <FieldEditor
            text={rule.replacement}
            onSave={this.handleSave('replacement')}
          />
        </div>
      );
    } else {
      element = (
        <div>
          <input
            className={classnames(style.input, style['is-static'])}
            value={rule.match}
            placeholder=".*"
            onDoubleClick={this.handleDoubleClick}
            readOnly />
          <input
            className={classnames(style.input, style['is-static'])}
            value={rule.replacement}
            placeholder="text/plain"
            onDoubleClick={this.handleDoubleClick}
            readOnly />
        </div>
      );
    }

    return (
      <li className={style.box}>
        <div className={classnames(style.field, style['is-grouped'])}>
          {element}
          <a className={style.delete}
             onClick={this.handleDelete}>
          </a>
        </div>
      </li>
    );
  }
}
