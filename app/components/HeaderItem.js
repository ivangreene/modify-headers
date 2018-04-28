import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldEditor from './FieldEditor';
import RuleItem from './RuleItem';
import style from '../containers/App.css';
import classnames from 'classnames';

export default class HeaderItem extends Component {

  static propTypes = {
    header: PropTypes.object.isRequired,
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

  newRule = () => {
    const { header, actions: { addRule } } = this.props;
    addRule(header.siteId, header.id, { match: '', replacement: '' });
  };

  handleSave = (headerName) => {
    const { header, actions: { editHeader } } = this.props;
    if (headerName.length !== 0) {
      editHeader(header.id, headerName);
    }
    this.setState({ editing: false });
  };

  handleDelete = () => {
    const { header, actions: { deleteHeader } } = this.props;
    deleteHeader(header.id);
  };

  render() {
    const { header, rules, actions } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <FieldEditor
          text={header.header}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <input
          className={classnames(style.input, style['is-static'])}
          value={header.header}
          placeholder="Content-Type"
          onClick={this.handleClick}
          readOnly />
      );
    }

    return (
      <li className={style.box}>
        <div className={classnames(style.field, style['is-grouped'])}>
          {element}
          <a className={classnames(style.button, style['is-light'])}
            onClick={this.newRule}>
            New Rule
          </a>
          <a className={style.delete}
             onClick={this.handleDelete}>
          </a>
        </div>
        <ul>
          {rules.map(rule => (
            <RuleItem key={rule.id} rule={rule} actions={actions} />
          ))}
        </ul>
      </li>
    );
  }
}
