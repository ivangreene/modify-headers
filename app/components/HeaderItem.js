import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldEditor from './FieldEditor';
import RuleItem from './RuleItem';
import style from '../containers/App.css';
import classnames from 'classnames';

export default class SiteItem extends Component {

  static propTypes = {
    header: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
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

  newRule = () => {
    const { site, header, actions: { addRule } } = this.props;
    addRule(site.id, header.id, { match: '', replacement: '' });
  };

  handleSave = (headerName) => {
    const { header, site, actions: { editHeader } } = this.props;
    if (headerName.length !== 0) {
      editHeader(site.id, header.id, headerName);
    }
    this.setState({ editing: false });
  };

  handleDelete = () => {
    const { site, header, actions: { deleteHeader } } = this.props;
    deleteHeader(site.id, header.id);
  };

  render() {
    const { header, site, actions } = this.props;

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
          onDoubleClick={this.handleDoubleClick}
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
          {header.rules.map(rule => (
            <RuleItem key={rule.id} rule={rule} header={header} site={site}
                actions={actions} />
          ))}
        </ul>
      </li>
    );
  }
}
